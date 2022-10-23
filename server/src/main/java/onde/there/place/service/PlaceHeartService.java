package onde.there.place.service;

import lombok.RequiredArgsConstructor;
import onde.there.domain.Member;
import onde.there.domain.Place;
import onde.there.domain.PlaceHeart;
import onde.there.domain.PlaceHeartScheduling;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.member.repository.MemberRepository;
import onde.there.place.repository.PlaceHeartRepository;
import onde.there.place.repository.PlaceHeartSchedulingRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlaceHeartService {

	private final PlaceHeartRepository placeHeartRepository;
	private final PlaceRepository placeRepository;
	private final MemberRepository memberRepository;
	private final PlaceHeartSchedulingRepository placeHeartSchedulingRepository;

	@Transactional
	public boolean heart(Long placeId, String memberId) {
		Place place = placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_MEMBER));

		if (placeHeartRepository.existsByPlaceIdAndMemberId(placeId, memberId)) {
			throw new PlaceException(ErrorCode.ALREADY_HEARTED);
		}

		placeHeartRepository.save(PlaceHeart.builder()
			.place(place)
			.member(member)
			.build());

		placeHeartUpdateRole(placeId, place, true);

		return true;
	}
	@Transactional
	public boolean unHeart(Long placeId, String memberId) {
		Place place = placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_MEMBER));

		PlaceHeart placeHeart = placeHeartRepository.findByPlaceAndMember(place, member)
			.orElseThrow(() -> new PlaceException(ErrorCode.ALREADY_UN_HEARTED));

		placeHeartRepository.delete(placeHeart);

		placeHeartUpdateRole(placeId, place, false);
		return true;
	}

	private void addSchedule(Long placeId) {
		if (!placeHeartSchedulingRepository.existsByPlaceId(placeId)) {
			placeHeartSchedulingRepository.save(PlaceHeartScheduling
				.builder().place(placeRepository.findById(placeId)
					.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE))).build());
		}
	}


	private void placeHeartUpdateRole(Long placeId, Place place, boolean plusOrMinus) {
		if (place.getPlaceHeartSum() >= 1000) {
			addSchedule(placeId);
		} else {
			place.setPlaceHeartSum(place.getPlaceHeartSum() + (plusOrMinus ? 1 : -1));
			placeRepository.save(place);
		}
	}

}
