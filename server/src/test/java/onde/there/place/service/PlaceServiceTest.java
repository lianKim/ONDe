package onde.there.place.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.domain.type.PlaceCategoryType;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.CreateRequest;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.journey.repository.JourneyRepository;
import onde.there.place.repository.PlaceImageRepository;
import onde.there.place.repository.PlaceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;



@SpringBootTest
@Transactional
class PlaceServiceTest {

	@Autowired
	private PlaceService placeService;

	@Autowired
	private PlaceRepository placeRepository;

	@Autowired
	private JourneyRepository journeyRepository;

	@Autowired
	private PlaceImageRepository placeImageRepository;

	@Test
	void 장소_저장() throws IOException {
	    //given
	    List<MultipartFile> multipartFile = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String file = String.format("%d.png", i);
			FileInputStream fis = new FileInputStream("src/main/resources/testImages/"+ file);
			multipartFile.add(new MockMultipartFile(String.format("%d", i), file, "png", fis));
		}
		Journey journey = journeyRepository.save(new Journey());
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
			.journeyId(journey.getId())
			.placeCategory(PlaceCategoryType.NATURE.getDescription())
			.placeName("어딘가")
			.build();
	    //when
		Place place = placeService.createPlace(multipartFile, request);
		//then
		assertEquals(place.getJourney().getId(), journey.getId());
		assertEquals(3, placeImageRepository.count());
	}

	@Test
	void 장소_저장_에러_여행아이디() throws IOException {
		//given
		List<MultipartFile> multipartFile = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String file = String.format("%d.png", i);
			FileInputStream fis = new FileInputStream("src/main/resources/testImages/"+ file);
			multipartFile.add(new MockMultipartFile(String.format("%d", i), file, "png", fis));
		}
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
		//when
		//then
		PlaceException placeException = assertThrows(PlaceException.class, () -> placeService.createPlace(multipartFile, request));
		assertEquals(ErrorCode.NOT_FOUND_JOURNEY.getDescription(), placeException.getErrorMessage());
	}

	@Test
	void 장소_저장_에러_카테고리() throws IOException {
		//given
		List<MultipartFile> multipartFile = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String file = String.format("%d.png", i);
			FileInputStream fis = new FileInputStream("src/main/resources/testImages/"+ file);
			multipartFile.add(new MockMultipartFile(String.format("%d", i), file, "png", fis));
		}
		Journey journey = journeyRepository.save(new Journey());
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
			.journeyId(journey.getId())
			.placeCategory("내츄럴")
			.placeName("어딘가")
			.build();
		//when
		//then

		PlaceException placeException = assertThrows(PlaceException.class,
			() -> placeService.createPlace(multipartFile, request));

		assertEquals(ErrorCode.MISMATCH_PLACE_CATEGORY_TYPE.getDescription(), placeException.getErrorMessage());
	}
	/*@DisplayName("01_00. getPlace success")
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

	@DisplayName("03_00. delete success")
	@Test
	public void test_03_00() {
		//given
		Place save = placeRepository.save(Place.builder().build());

		//when
		boolean delete = placeService.delete(save.getId());

		//then
		assertTrue(delete);
	}

	@DisplayName("03_01. delete fail not found place")
	@Test
	public void test_03_01() {
		//given

		//when
		PlaceException placeException = assertThrows(PlaceException.class,
			() -> placeService.delete(100011L));

		//then
		assertEquals(placeException.getErrorCode(), ErrorCode.NOT_FOUND_PLACE);
	}

	@DisplayName("04_00. deleteAll success")
	@Test
	public void test_04_00() {
		//given
		Journey save = journeyRepository.save(Journey.builder().build());
		journeyRepository.save(save);

		placeRepository.save(Place.builder().journey(save).build());
		placeRepository.save(Place.builder().journey(save).build());
		placeRepository.save(Place.builder().journey(save).build());

		//when
		boolean result = placeService.deleteAll(save.getId());

		//then
		assertTrue(result);
	}

	@DisplayName("04_01. deleteAll fail not deleted")
	@Test
	public void test_04_01() {
		//given
		Journey save = journeyRepository.save(Journey.builder().build());
		journeyRepository.save(save);

		//when
		PlaceException placeException = assertThrows(PlaceException.class,
			() -> placeService.deleteAll(save.getId()));

		//then
		assertEquals(placeException.getErrorCode(), ErrorCode.DELETED_NOTING);
	}

	@DisplayName("04_02. deleteAll fail not found journeyId")
	@Test
	public void test_04_02() {
		//given
		//when
		PlaceException placeException = assertThrows(PlaceException.class,
			() -> placeService.deleteAll(1L));

		//then
		assertEquals(placeException.getErrorCode(), ErrorCode.NOT_FOUND_JOURNEY);
	}
}
