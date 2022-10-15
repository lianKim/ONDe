package onde.there.place.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.domain.PlaceImage;
import onde.there.domain.type.PlaceCategoryType;
import onde.there.dto.place.PlaceDto;
import onde.there.exception.type.ErrorCode;
import onde.there.journey.repository.JourneyRepository;
import onde.there.place.exception.PlaceException;
import onde.there.place.repository.PlaceImageRepository;
import onde.there.place.repository.PlaceRepository;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceService {

	private final JourneyRepository journeyRepository;
	private final PlaceRepository placeRepository;
	private final PlaceImageRepository placeImageRepository;

	public Place createPlace(List<String> imageUrls, PlaceDto.CreateRequest request) {
		log.info("장소 저장");
		if(!EnumUtils.isValidEnum(PlaceCategoryType.class , request.getPlaceCategory())){
			throw new PlaceException(ErrorCode.CATEGORY_NOT_FOUND);
		}
		Place place = request.toEntity();
		Journey journey = journeyRepository.findById(request.getJourneyId()).orElseThrow();
		place.setJourney(journey);
		placeRepository.save(place);

		for (String imageUrl : imageUrls) {
			PlaceImage placeImage = new PlaceImage(place, imageUrl);
			placeImageRepository.save(placeImage);
		}
		return place;
	}

}
