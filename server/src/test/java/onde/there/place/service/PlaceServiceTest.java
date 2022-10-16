package onde.there.place.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.journey.repository.JourneyRepository;
import onde.there.place.repository.PlaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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