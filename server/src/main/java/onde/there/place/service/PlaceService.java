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
import onde.there.journey.repository.JourneyRepository;
import onde.there.place.repository.PlaceRepository;
import onde.there.image.service.AwsS3Service;
import onde.there.journey.repository.JourneyRepository;
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

	public List<Place> list(Long journeyId) {
		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new PlaceException(ErrorCode.NOT_FOUND_JOURNEY));

		return placeRepository.findAllByJourneyOrderByPlaceTimeAsc(journey);
	}

	@Transactional
	public boolean delete(Long placeId) {
		boolean exists = placeRepository.existsById(placeId);
		if (!exists) {
			throw new PlaceException(ErrorCode.NOT_FOUND_PLACE);
		}

		placeRepository.deleteById(placeId);

		//TODO: image 제거 로직 -> 이미지 추가 삭제 부분 머지후 구현 예정

		return true;
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
