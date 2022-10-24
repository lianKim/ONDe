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
		log.info("장소 생성 시작!");
		Place place = request.toEntity();
		Journey journey = journeyRepository.findById(request.getJourneyId())
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));
		place.setJourney(journey);
		Place savePlace = placeRepository.save(place);

		List<String> imageUrls = imageUploadToS3(images);
		savePlaceImage(savePlace, imageUrls);
		log.info("장소 저장 완료! (장소 아이디 : " + savePlace.getId() + ")");

		return savePlace;
	}

	public PlaceDto.Response getPlace(Long placeId) {
		log.info("장소 조회 시작! (장소 아이디 : " + placeId + ")");
		Response response = Response.toResponse(placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE)));

		log.info("장소에 포함된 이미지 url 조회 시작! (장소 아이디 : " + placeId + ")");
		response.setImageUrls(awsS3Service.findImageUrls(placeId));
		log.info("장소에 포함된 이미지 url 조회 완료! (장소 아이디 : " + placeId + ")");

		log.info("장소 조회 완료! (장소 아이디 : " + placeId + ")");
		return response;
	}

	public List<Response> list(Long journeyId) {
		log.info("여정에 포함된 장소 조회 시작! (여정 아이디 : " + journeyId + ")");
		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));

		List<Response> responses = Response.toResponse(
			placeRepository.findAllByJourneyOrderByPlaceTimeAsc(journey));

		for (Response r : responses) {
			log.info("장소에 포함된 이미지 url 조회 시작! (장소 아이디 : " + r.getPlaceId() + ")");
			r.setImageUrls(awsS3Service.findImageUrls(r.getPlaceId()));
			log.info("장소에 포함된 이미지 url 조회 완료! (장소 아이디 : " + r.getPlaceId() + ")");
		}

		log.info("여정에 포함된 장소 조회 완료! (여정 아이디 : " + journeyId + ")");
		return responses;
	}

	@Transactional
	public boolean delete(Long placeId) {
		log.info("장소 삭제 시작! (장소 아이디 : " + placeId + ")");
		Place place = placeRepository.findById(placeId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));

		deletePlaceImages(placeId);

		placeRepository.delete(place);
		log.info("장소 삭제 완료! (장소 아이디 : " + placeId + ")");
		return true;
	}

	@Transactional
	public boolean deleteAll(Long journeyId) {
		log.info("여정에 포함된 장소 삭제 시작! (여정 아이디 : " + journeyId + ")");
		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));

		List<Place> places = placeRepository.findAllByJourneyOrderByPlaceTimeAsc(journey);

		if (places.size() == 0) {
			throw new PlaceException(ErrorCode.DELETED_NOTING);
		}

		for (Place place : places) {
			deletePlaceImages(place.getId());
		}

		placeRepository.deleteAll(places);
		log.info("여정에 포함된 장소 삭제 완료! (여정 아이디 : " + journeyId + ")");
		return true;
	}


	private void deletePlaceImages(Long placeId) {
		log.info("장소에 포함된 이미지 삭제 시작! (장소 아이디 : " + placeId + ")");
		List<PlaceImage> placeImages = placeImageRepository.findAllByPlaceId(placeId);
		for (PlaceImage placeImage : placeImages) {
			awsS3Service.deleteFile(placeImage.getUrl());
			log.info("장소 이미지 삭제 시작! (장소 이미지 아이디 : " + placeImage.getId() + ")");
			placeImageRepository.delete(placeImage);
			log.info("장소 이미지 삭제 완료! (장소 이미지 아이디 : " + placeImage.getId() + ")");
		}
		log.info("장소에 포함된 이미지 삭제 완료! (장소 아이디 : " + placeId + ")");
	}


	@Transactional
	public PlaceDto.Response updatePlace(List<MultipartFile> multipartFile, UpdateRequest request) {
		log.info("장소 업데이트 시작! (장소 아이디 : " + request.getPlaceId() + ")");
		Place savedPlace = placeRepository.findById(request.getPlaceId())
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_PLACE));

		log.info("장소에 이미지 제외한 값 업데이트 시작! (장소 아이디 : " + request.getPlaceId() + ")");
		Place updatePlace = setUpdateRequest(savedPlace, request);
		placeRepository.save(updatePlace);
		log.info("장소에 이미지 제외한 값 업데이트 완료! (장소 아이디 : " + request.getPlaceId() + ")");

		List<PlaceImage> savedImages = placeImageRepository.findAllByPlaceId(savedPlace.getId());
		for (PlaceImage placeImage : savedImages) {
			awsS3Service.deleteFile(placeImage.getUrl());
			log.info("장소 이미지 삭제 삭제 시작! (장소 이미지 아이디 : " + placeImage.getId() + ")");
			placeImageRepository.delete(placeImage);
			log.info("장소 이미지 삭제 삭제 완료! (장소 이미지 아이디 : " + placeImage.getId() + ")");
		}

		List<String> updateUrls = imageUploadToS3(multipartFile);
		savePlaceImage(updatePlace, updateUrls);

		Response response = Response.toResponse(savedPlace);
		response.setImageUrls(updateUrls);

		log.info("장소 업데이트 완료! (장소 아이디 : " + request.getPlaceId() + ")");
		return response;
	}

	private List<String> imageUploadToS3(List<MultipartFile> images) {
		return awsS3Service.uploadFiles(images);
	}

	private void savePlaceImage(Place savePlace, List<String> imageUrls) {
		for (String imageUrl : imageUrls) {
			log.info("장소 이미지 저장 시작! (장소 이미지 URL : " + imageUrl + ")");
			placeImageRepository.save(new PlaceImage(savePlace, imageUrl));
			log.info("장소 이미지 저장 완료! (장소 이미지 URL : " + imageUrl + ")");
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
