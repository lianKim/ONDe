package onde.there.place.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.domain.PlaceImage;
import onde.there.dto.place.PlaceDto;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.place.repository.PlaceImageRepository;
import onde.there.place.repository.PlaceRepository;
import onde.there.image.service.AwsS3Service;
import onde.there.journey.repository.JourneyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceService {

	private final JourneyRepository journeyRepository;
	private final PlaceRepository placeRepository;
	private final PlaceImageRepository placeImageRepository;
	private final AwsS3Service awsS3Service;

	@Transactional
	public Place createPlace(List<MultipartFile> images, PlaceDto.CreateRequest request) {
		Place place = request.toEntity();
		Journey journey = journeyRepository.findById(request.getJourneyId()).orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));
		place.setJourney(journey);
		Place savePlace = placeRepository.save(place);
		log.info("장소 저장 완료! (장소 아이디 : " + savePlace.getId()+")");
		List<String> imageUrls = awsS3Service.uploadFiles(images);
		for (String imageUrl : imageUrls) {
			PlaceImage placeImage = new PlaceImage(savePlace, imageUrl);
			PlaceImage saveImage = placeImageRepository.save(placeImage);
			log.info("장소 이미지 저장 완료! (장소 이미지 URL : " + saveImage.getUrl() + ")");
		}
		return savePlace;
	}

	public Place getPlace(Long placeId) {
		return placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));
	}
}
