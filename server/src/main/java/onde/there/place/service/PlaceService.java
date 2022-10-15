package onde.there.place.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import onde.there.domain.Journey;
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

	public List<Place> list(Long journeyId) {
		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));

		List<Place> list = placeRepository.findAllByJourney(journey);
		list.sort(new Comparator<Place>() {
			@Override
			public int compare(Place o1, Place o2) {
				return o1.getPlaceTime().compareTo(o2.getPlaceTime());
			}
		});

		return list;
	}
}
