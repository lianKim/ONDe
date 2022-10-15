package onde.there.place.service;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
class PlaceServiceTest {
	@Spy
	private JourneyRepository journeyRepository;
	@Spy
	private PlaceRepository placeRepository;
	@Mock
	private PlaceImageRepository placeImageRepository;

	@InjectMocks
	private PlaceService placeService;

	@Test
	void 장소_생성() {
	    //given


	    //when
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
		Place place = placeService.createPlace(imageUrls, request);

	    //then
		placeRepository.findAll().forEach(a -> System.out.println(a.getId()));
	}

}