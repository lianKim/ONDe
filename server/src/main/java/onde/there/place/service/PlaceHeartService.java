package onde.there.place.service;

import lombok.RequiredArgsConstructor;
import onde.there.domain.Member;
import onde.there.domain.Place;
import onde.there.domain.PlaceHeart;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.member.repository.MemberRepository;
import onde.there.place.repository.PlaceHeartRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlaceHeartService {

	private final PlaceHeartRepository placeHeartRepository;
	private final PlaceRepository placeRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public boolean heart(Long placeId, String memberId) {
		Place place = placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_MEMBER));

		if (place.getPlaceHeartSum() >= 1000) {
			//TODO 1000 개 넘었을 떄 스케쥴링
		} else {
			place.setPlaceHeartSum(place.getPlaceHeartSum() + 1);
		}

		if (placeHeartRepository.existsByPlaceIdAndMemberId(placeId, memberId)) {
			throw new PlaceException(ErrorCode.ALREADY_HEARTED);
		}

		placeHeartRepository.save(PlaceHeart.builder()
			.place(place)
			.member(member)
			.build());

		return true;
	}
}
