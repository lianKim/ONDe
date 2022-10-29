package onde.there.place.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Member;
import onde.there.domain.Place;
import onde.there.domain.PlaceHeart;
import onde.there.domain.PlaceHeartScheduling;
import onde.there.member.repository.MemberRepository;
import onde.there.place.exception.PlaceErrorCode;
import onde.there.place.exception.PlaceException;
import onde.there.place.repository.PlaceHeartRepository;
import onde.there.place.repository.PlaceHeartSchedulingRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaceHeartService {

	private final PlaceHeartRepository placeHeartRepository;
	private final PlaceRepository placeRepository;
	private final MemberRepository memberRepository;
	private final PlaceHeartSchedulingRepository placeHeartSchedulingRepository;

	@Transactional
	public boolean heart(Long placeId, String memberId) {
		log.info("heart : 장소 좋아요 메소드 시작 (장소 아이디 : " + placeId + ") (맴버 아이디 : " + memberId + ")");
		Place place = placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE));

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new PlaceException(PlaceErrorCode.NOT_FOUND_MEMBER));

		if (placeHeartRepository.existsByPlaceIdAndMemberId(placeId, memberId)) {
			throw new PlaceException(PlaceErrorCode.ALREADY_HEARTED);
		}

		placeHeartRepository.save(PlaceHeart.builder()
			.place(place)
			.member(member)
			.build());

		placeHeartUpdateRole(placeId, place, true);

		log.info("heart : 장소 좋아요 메소드 완료 (장소 아이디 : " + placeId + ") (맴버 아이디 : " + memberId + ")");
		return true;
	}

	@Transactional
	public boolean unHeart(Long placeId, String memberId) {
		log.info("unHeart : 장소 좋아요 취소 메소드 시작 (장소 아이디 : " + placeId + ") (맴버 아이디 : " + memberId + ")");
		Place place = placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE));

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new PlaceException(PlaceErrorCode.NOT_FOUND_MEMBER));

		PlaceHeart placeHeart = placeHeartRepository.findByPlaceAndMember(place, member)
			.orElseThrow(() -> new PlaceException(PlaceErrorCode.ALREADY_UN_HEARTED));

		placeHeartRepository.delete(placeHeart);

		placeHeartUpdateRole(placeId, place, false);

		log.info("unHeart : 장소 좋아요 취소 메소드 완료 (장소 아이디 : " + placeId + ") (맴버 아이디 : " + memberId + ")");
		return true;
	}

	private void addSchedule(Long placeId) {
		log.info("addSchedule : 장소 좋아요 스케쥴링 저장 시작(장소 아이디 : " + placeId + ")");
		if (!placeHeartSchedulingRepository.existsByPlaceId(placeId)) {
			placeHeartSchedulingRepository.save(PlaceHeartScheduling
				.builder().place(placeRepository.findById(placeId)
					.orElseThrow(() -> new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE))).build());
			log.info("addSchedule : 장소 좋아요 스케쥴링 저장 완료(장소 아이디 : " + placeId + ")");
		} else {
			log.info("addSchedule : 장소 좋아요 스케쥴링 저장 되어 있음 저장 할 필요 x (장소 아이디 : " + placeId + ")");
		}
	}


	private void placeHeartUpdateRole(Long placeId, Place place, boolean plusOrMinus) {
		log.info("placeHeartUpdateRole : 장소 좋아요 갯수 업데이트 메소드 시작! (장소 아이디 : " + placeId + ")");
		if (place.getPlaceHeartCount() >= 1000) {
			addSchedule(placeId);
			log.info(
				"좋아요 갯수 1000개 이상 -> placeHeartUpdateRole : 장소 좋아요 갯수 업데이트 메소드 취소 -> 스케줄링으로 저장 완료! (장소 아이디 : "
					+ placeId + ")");
		} else {
			place.setPlaceHeartCount(place.getPlaceHeartCount() + (plusOrMinus ? 1 : -1));
			placeRepository.save(place);
			log.info("좋아요 갯수 1000개 미만 -> placeHeartUpdateRole : 장소 좋아요 갯수 업데이트 메소드 완료! (장소 아이디 : "
				+ placeId + ")");
		}
	}
}