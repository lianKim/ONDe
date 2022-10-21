package onde.there.place.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.domain.PlaceImage;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.Response;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.image.service.AwsS3Service;
import onde.there.journey.repository.JourneyRepository;
import onde.there.place.repository.PlaceImageRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceService {

	private final JourneyRepository journeyRepository;
	private final PlaceRepository placeRepository;
	private final PlaceImageRepository placeImageRepository;
	private final AwsS3Service awsS3Service;

	@Transactional
	public Place createPlace(List<MultipartFile> images, PlaceDto.CreateRequest request) {
		Place place = request.toEntity();
		Journey journey = journeyRepository.findById(request.getJourneyId())
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));
		place.setJourney(journey);
		Place savePlace = placeRepository.save(place);

		log.info("장소 저장 완료! (장소 아이디 : " + savePlace.getId() + ")");
		List<String> imageUrls = awsS3Service.uploadFiles(images);
		for (String imageUrl : imageUrls) {
			PlaceImage placeImage = new PlaceImage(savePlace, imageUrl);
			PlaceImage saveImage = placeImageRepository.save(placeImage);
			log.info("장소 이미지 저장 완료! (장소 이미지 URL : " + saveImage.getUrl() + ")");
		}

		return savePlace;
	}

	public PlaceDto.Response getPlace(Long placeId) {
		Response response = Response.toResponse(placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE)));

		response.setImageUrls(awsS3Service.findFile(placeId));
		return response;
	}

	public List<Response> list(Long journeyId) {
		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));

		List<Response> responses = Response.toResponse(
			placeRepository.findAllByJourneyOrderByPlaceTimeAsc(journey));

		for (Response r : responses) {
			r.setImageUrls(awsS3Service.findFile(r.getPlaceId()));
		}
		return responses;
	}

	@Transactional
	public boolean delete(Long placeId) {
		Place place = placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));

		deletePlaceImages(placeId);

		placeRepository.delete(place);
		return true;
	}

	@Transactional
	public boolean deleteAll(Long journeyId) {
		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));

		List<Place> places = placeRepository.findAllByJourneyOrderByPlaceTimeAsc(journey);

		for (Place place : places) {
			deletePlaceImages(place.getId());
		}
		if (places.size() == 0) {
			throw new PlaceException(ErrorCode.DELETED_NOTING);
		}

		placeRepository.deleteAll(places);

		return true;
	}

	private void deletePlaceImages(Long placeId) {
		List<PlaceImage> placeImages = placeImageRepository.findAllByPlaceId(placeId);
		for (PlaceImage placeImage : placeImages) {
			awsS3Service.deleteFile(placeImage.getUrl());
			placeImageRepository.delete(placeImage);
		}
	}
}
