package onde.there.place.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import onde.there.domain.Place;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.journey.repository.JourneyRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {

	private final PlaceRepository placeRepository;

	private final JourneyRepository journeyRepository;

	public Place getPlace(Long placeId) {
		return placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));
	}

	@Transactional
	public boolean deleteAll(Long journeyId) {
		journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));
		//TODO : 장소에 포함된 모든 댓글 좋아요 이미지 삭제 구현 필요

		Integer result = placeRepository.deleteAllByJourneyId(journeyId);
		if (result == 0) {
			throw new PlaceException(ErrorCode.DELETED_NOTING);
		}

		return true;
	}
}
