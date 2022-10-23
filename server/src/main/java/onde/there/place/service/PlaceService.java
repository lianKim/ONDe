package onde.there.place.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.domain.PlaceImage;
import onde.there.domain.type.PlaceCategoryType;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.Response;

import onde.there.dto.place.PlaceDto.UpdateRequest;
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

    savePlaceImage(savePlace, imageUrls);
    log.info("장소 저장 완료! (장소 아이디 : " + savePlace.getId() + ")");

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

		placeRepository.delete(place);
		//TODO: image 제거 로직 -> 이미지 추가 삭제 부분 머지후 구현 예정

		return true;
	}

	@Transactional
	public boolean deleteAll(Long journeyId) {
		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));

		//TODO : 장소에 포함된 모든 댓글 좋아요 이미지 삭제 구현 필요

		List<Place> list = placeRepository.findAllByJourneyOrderByPlaceTimeAsc(journey);

		if (list.size() == 0) {
			throw new PlaceException(ErrorCode.DELETED_NOTING);
		}

		placeRepository.deleteAll(list);

		return true;
	}

	@Transactional
	public PlaceDto.Response updatePlace(List<MultipartFile> multipartFile, UpdateRequest request) {
		Place savedPlace = placeRepository.findById(request.getPlaceId())
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));

		Place updatePlace = setUpdateRequest(savedPlace, request);
		placeRepository.save(updatePlace);

		List<PlaceImage> savedImages = placeImageRepository.findAllByPlaceId(savedPlace.getId());
		for (PlaceImage placeImage : savedImages) {
			awsS3Service.deleteFile(placeImage.getUrl());
			placeImageRepository.delete(placeImage);
		}

		List<String> updateUrls = imageUploadToS3(multipartFile);
		savePlaceImage(updatePlace, updateUrls);



		Response response = Response.toResponse(savedPlace);
		response.setImageUrls(updateUrls);

		return response;
	}

	private List<String> imageUploadToS3(List<MultipartFile> images) {
		return awsS3Service.uploadFiles(images);
	}

	private void savePlaceImage(Place savePlace, List<String> imageUrls) {
		for (String imageUrl : imageUrls) {
			PlaceImage placeImage = new PlaceImage(savePlace, imageUrl);
			PlaceImage saveImage = placeImageRepository.save(placeImage);
			log.info("장소 이미지 저장 완료! (장소 이미지 URL : " + saveImage.getUrl() + ")");
		}
	}

	private Place setUpdateRequest(Place savePlace, PlaceDto.UpdateRequest updateRequest) {
		savePlace.setLatitude(updateRequest.getLatitude());
		savePlace.setLongitude(updateRequest.getLongitude());
		savePlace.setTitle(updateRequest.getTitle());
		savePlace.setText(updateRequest.getText());
		savePlace.setAddressName(updateRequest.getAddressName());
		savePlace.setRegion1(updateRequest.getRegion1());
		savePlace.setRegion2(updateRequest.getRegion2());
		savePlace.setRegion3(updateRequest.getRegion3());
		savePlace.setRegion4(updateRequest.getRegion4());
		savePlace.setPlaceName(updateRequest.getPlaceName());
		savePlace.setPlaceTime(updateRequest.getPlaceTime());
		savePlace.setPlaceCategory(
			PlaceCategoryType.toPlaceCategoryType(updateRequest.getPlaceCategory()));
		return savePlace;
	}
}