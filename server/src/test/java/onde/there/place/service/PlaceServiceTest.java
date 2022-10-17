package onde.there.place.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.Member;
import onde.there.domain.Place;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@ExtendWith(MockitoExtension.class)
@Transactional
@Slf4j
class PlaceServiceTest {
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
			.placeCategory(String.valueOf(PlaceCategoryType.ACCOMMODATION))
			.build();

		Journey journey = Journey.builder()
			.id(1L).build();
		Place savePlace = request.toEntity();
		savePlace.setId(1L);
		savePlace.setJourney(journey);

		given(journeyRepository.findById(anyLong())).willReturn(Optional.ofNullable(journey));
		given(placeRepository.save(any(Place.class))).willReturn(savePlace);
	    //when

		Place place = placeService.createPlace(imageUrls, request);
		placeImageRepository.findAll().forEach(p -> log.info(""+ p.getId()));

	    //then
		assertEquals(savePlace.getId(), place.getId());
		assertEquals(savePlace.getJourney(), place.getJourney());
	}


@SpringBootTest
@Transactional
class PlaceServiceTest {

	@Autowired
	private PlaceService placeService;

	@Autowired
	private PlaceRepository placeRepository;

	@Autowired
	private JourneyRepository journeyRepository;

	@DisplayName("01_00. getPlace success")
	@Test
	public void test_01_00() {
		//given
		Place place = Place.builder()
			.id(1L)
			.text("테스트 장소 본문")
			.title("테스트 장소 제목")
			.build();

		placeRepository.save(place);

		//when
		Place place1 = placeService.getPlace(1L);

		//then
		assertEquals(place1.getId(), 1L);
		assertEquals(place1.getText(), "테스트 장소 본문");
		assertEquals(place1.getTitle(), "테스트 장소 제목");
	}

	@DisplayName("01_01. getPlace fail not found place")
	@Test
	public void test_01_01() {
		//given
		//when
		PlaceException exception = assertThrows(PlaceException.class,
			() -> placeService.getPlace(1L));
		//then
		assertEquals(exception.getErrorCode(), ErrorCode.NOT_FOUND_PLACE);
	}


	@DisplayName("02_00. list success")
	@Test
	public void test_02_00() {
		//given
		Journey journey = journeyRepository.save(Journey.builder().build());

		for (int i = 0; i < 3; i++) {
			placeRepository.save(Place.builder()
				.journey(journey)
				.placeTime(LocalDateTime.now().plusSeconds(i))
				.build());
		}

		//when
		List<Place> list = placeService.list(1L);

		//then
		assertEquals(list.size(), 3);
		assertEquals(list.get(0).getJourney().getId(), list.get(1).getJourney().getId());
	}

	@DisplayName("02_01. list fail not found journey")
	@Test
	public void test_02_01() {
		//given

		//when
		PlaceException placeException = assertThrows(PlaceException.class,
			() -> placeService.list(1L));

		//then
		assertEquals(placeException.getErrorCode(), ErrorCode.NOT_FOUND_JOURNEY);
		assertEquals(placeException.getErrorMessage(),
			ErrorCode.NOT_FOUND_JOURNEY.getDescription());

	}
}