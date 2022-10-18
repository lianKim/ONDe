package onde.there.place.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.domain.PlaceImage;
import onde.there.domain.type.PlaceCategoryType;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.CreateRequest;
import onde.there.journey.repository.JourneyRepository;
import onde.there.place.repository.PlaceImageRepository;
import onde.there.place.repository.PlaceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;

@ExtendWith(MockitoExtension.class)
@Transactional
@Slf4j
class PlaceServiceMockTest {

	@Mock
	private JourneyRepository journeyRepository;
	@Mock
	private PlaceRepository placeRepository;
	@Spy
	private PlaceImageRepository placeImageRepository;

	@InjectMocks
	private PlaceService placeService;

	@Test
	void 장소_생성() {
		//given
		List<String> imageUrls = new ArrayList<>();
		imageUrls.add("1.png");
		imageUrls.add("2.png");
		imageUrls.add("3.png");
		imageUrls.add("4.png");

		PlaceDto.CreateRequest request = CreateRequest.builder()
			.latitude(123.0)
			.longitude(234.0)
			.title("test")
			.text("테스트 중 입니다.")
			.addressName("경기도 김포시 고촌읍 어쩌구 저쩌구")
			.region1("경기도")
			.region2("김포시")
			.region3("고촌읍")
			.region4("어쩌구 저쩌구")
			.placeTime(LocalDateTime.now())
			.journeyId(1L)
			.placeCategory(PlaceCategoryType.NATURE.getDescription())
			.placeName("어딘가")
			.build();

		Journey journey = Journey.builder()
			.id(1L).build();
		Place place = request.toEntity();
		place.setId(1L);
		place.setJourney(journey);

		given(journeyRepository.findById(anyLong())).willReturn(Optional.ofNullable(journey));
		given(placeRepository.save(any(Place.class))).willReturn(place);
		given(placeImageRepository.save(any(PlaceImage.class))).willReturn(any(PlaceImage.class));
		//when

//		Place savePlace = placeService.createPlace(imageUrls, request);
//
//		//then
//		assertEquals(place.getId(), savePlace.getId());
//		assertEquals(place.getJourney(), savePlace.getJourney());
	}
}
