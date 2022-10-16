package onde.there.place.service;

import lombok.RequiredArgsConstructor;
import onde.there.domain.Place;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {

	private final PlaceRepository placeRepository;


	public Place getPlace(Long placeId) {
		return placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));
	}

	public boolean delete(Long placeId) {
		placeRepository.deleteById(placeId);

		//TODO: image 제거 로직 -> 이미지 추가 삭제 부분 머지후 구현 예정

		return !placeRepository.existsById(placeId);
	}
}
