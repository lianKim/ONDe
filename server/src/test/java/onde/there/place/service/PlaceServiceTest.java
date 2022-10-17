package onde.there.place.service;

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

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

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