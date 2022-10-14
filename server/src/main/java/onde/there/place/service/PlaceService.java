package onde.there.place.service;

import lombok.RequiredArgsConstructor;
import onde.there.domain.Place;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {

	private final PlaceRepository placeRepository;


	public Place getPlace(Long placeId) {
//		TODO: exception 처리 정하기
		return placeRepository.findById(placeId).orElseThrow();
	}
}
