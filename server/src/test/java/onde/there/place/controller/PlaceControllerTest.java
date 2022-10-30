package onde.there.place.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.FileInputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import onde.there.member.security.SecurityConfig;
import onde.there.domain.Journey;
import onde.there.domain.Place;
import onde.there.domain.type.PlaceCategoryType;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.UpdateRequest;
import onde.there.exception.type.ErrorCode;
import onde.there.image.exception.ImageErrorCode;
import onde.there.image.exception.ImageException;
import onde.there.place.exception.PlaceErrorCode;
import onde.there.place.exception.PlaceException;
import onde.there.place.service.PlaceService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.HttpMethod;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(controllers = PlaceController.class
	, includeFilters = @ComponentScan.Filter(
	type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class))
@WithMockUser
class PlaceControllerTest {

	@MockBean
	private PlaceService placeService;

	@MockBean
	private PlaceDto.Response response;

	@InjectMocks
	private PlaceController placeController;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MockMvc mvc;

	@Autowired
	private WebApplicationContext webApplicationContext;


	@DisplayName("01_00. /place?placeId=1 장소 조회  success")
	@Test
	public void test_01_00() throws Exception {
		//given
		given(placeService.getPlace(any())).willReturn(testPlace(1L));

		//when
		mvc.perform(get("/place?placeId=1"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.placeId").value(1L))
			.andExpect(jsonPath("$.title").value("장소 테스트 제목"))
			.andExpect(jsonPath("$.text").value("장소 테스트 본문"))
			.andExpect(jsonPath("$.addressName").value("장소 테스르 전체 주소"))
			.andExpect(jsonPath("$.placeHeartSum").value(0))
			.andExpect(jsonPath("$.placeCategory").value("기타"))
			.andExpect(jsonPath("$.imageUrls[0]").value("url1"))
			.andExpect(jsonPath("$.imageUrls[1]").value("url2"))
			.andDo(print());
		//then
	}

	@DisplayName("01_01. /place?placeId=1 장소 조회  fail not found place")
	@Test
	public void test_01_01() throws Exception {
		//given
		given(placeService.getPlace(any())).willThrow(
			new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE));

		//when
		mvc.perform(get("/place?placeId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_PLACE.toString()))
			.andExpect(jsonPath("$.errorMessage").value(ErrorCode.NOT_FOUND_PLACE.getDescription()))
			.andDo(print());
		//then
	}


	@DisplayName("02_00. /place/list 장소 list 조회 success")
	@Test
	public void test_02_00() throws Exception {
		//given
		given(placeService.list(any())).willReturn(List.of(
			testPlace(1L),
			testPlace(2L),
			testPlace(3L)
		));

		//when
		mvc.perform(get("/place/list?journeyId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.length()").value(3))
			.andDo(print());

		//then
	}

	@DisplayName("02_01. /place/list 장소 list 조회 fail not found journey")
	@Test
	public void test_02_01() throws Exception {
		//given
		given(placeService.list(any())).willThrow(new PlaceException(PlaceErrorCode.NOT_FOUND_JOURNEY));

		//when
		mvc.perform(get("/place/list?journeyId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_JOURNEY.toString()))
			.andExpect(
				jsonPath("$.errorMessage").value(ErrorCode.NOT_FOUND_JOURNEY.getDescription()))
			.andDo(print());
		//then
	}

	@DisplayName("03_00. /place 장소 삭제 success ")
	@Test
	public void test_03_00() throws Exception {
		//given
		given(placeService.delete(any())).willReturn(true);

		//when
		mvc.perform(delete("/place?placeId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$").value(true))
			.andDo(print())
		;
		//then
	}

	@DisplayName("03_01. /place 장소 삭제 fail not deleted ")
	@Test
	public void test_03_01() throws Exception {
		//given
		given(placeService.delete(any())).willThrow(new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE));

		//when
		mvc.perform(delete("/place?placeId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_PLACE.toString()))
			.andDo(print())
		;
	}

	@DisplayName("04_00. /place/delete-all 장소 list 삭제 success")
	@Test
	public void test_04_00() throws Exception {
		//given
		given(placeService.deleteAll(any())).willReturn(true);

		//when
		mvc.perform(delete("/place/delete-all?journeyId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$").value(true))
			.andDo(print());

		//then
	}

	@DisplayName("04_01. /place/delete-all 장소 list 삭제 fail not found journey id")
	@Test
	public void test_04_01() throws Exception {
		//given
		given(placeService.deleteAll(any())).willThrow(
			new PlaceException(PlaceErrorCode.NOT_FOUND_JOURNEY));

		//when
		mvc.perform(delete("/place/delete-all?journeyId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_JOURNEY.toString()))
			.andDo(print());

		//then
	}

	@DisplayName("04_02. /place/delete-all 장소 list 삭제 fail deleted nothing")
	@Test
	public void test_04_02() throws Exception {
		//given
		given(placeService.deleteAll(any())).willThrow(
			new PlaceException(PlaceErrorCode.DELETED_NOTING));

		//when
		mvc.perform(delete("/place/delete-all?journeyId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.DELETED_NOTING.toString()))
			.andDo(print());

		//then
	}

	@DisplayName("05_00. /place 장소 업데이트 success")
	@Test
	public void test_05_00() throws Exception {
		//given
		given(placeService.updatePlace(any(), any())).willReturn(Response.builder()
			.placeId(1L)
			.latitude(1.0)
			.longitude(1.0)
			.title("title test update")
			.text("text test update")
			.addressName("total address update")
			.region1("place name1 update")
			.region2("place name2 update")
			.region3("place name3 update")
			.region4("place name4 update")
			.placeName("place name update")
			.placeTime(LocalDateTime.now().minusDays(1))
			.placeCategory("자연")
			.journeyId(1L)
			.placeHeartSum(100L)
			.imageUrls(List.of("url1", "url1", "url1"))
			.build());

		//when

		List<MockMultipartFile> multipartFiles = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String file = String.format("%d.png", i);
			FileInputStream fis = new FileInputStream("src/main/resources/testImages/" + file);
			multipartFiles.add(new MockMultipartFile("multipartFile", file, "png", fis));
		}

		UpdateRequest updateRequest = UpdateRequest.builder()
			.placeId(1L)
			.latitude(1.0)
			.longitude(1.0)
			.title("title test update")
			.text("text test update")
			.addressName("total address update")
			.region1("place name1 update")
			.region2("place name2 update")
			.region3("place name3 update")
			.region4("place name4 update")
			.placeName("place name update")
			.placeTime(LocalDateTime.now().minusDays(1))
			.placeCategory("자연")
			.journeyId(1L)
			.build();
		MockMultipartFile json = new MockMultipartFile("request", "", "application/json",
			objectMapper.writeValueAsString(updateRequest).getBytes());

		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		mvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT, "/place")
				.file(multipartFiles.get(0))
				.file(multipartFiles.get(1))
				.file(multipartFiles.get(2))
				.file(json)
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isOk())
			.andDo(print());

		//then

	}

	@DisplayName("05_01. /place 장소 업데이트 fail ")
	@Test
	public void test_05_01() throws Exception {
		//given
		given(placeService.updatePlace(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE));

		//when

		List<MockMultipartFile> multipartFiles = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String file = String.format("%d.png", i);
			FileInputStream fis = new FileInputStream("src/main/resources/testImages/" + file);
			multipartFiles.add(new MockMultipartFile("multipartFile", file, "png", fis));
		}

		UpdateRequest updateRequest = UpdateRequest.builder()
			.placeId(1L)
			.latitude(1.0)
			.longitude(1.0)
			.title("title test update")
			.text("text test update")
			.addressName("total address update")
			.region1("place name1 update")
			.region2("place name2 update")
			.region3("place name3 update")
			.region4("place name4 update")
			.placeName("place name update")
			.placeTime(LocalDateTime.now().minusDays(1))
			.placeCategory("자연")
			.journeyId(1L)
			.build();
		MockMultipartFile json = new MockMultipartFile("request", "", "application/json",
			objectMapper.writeValueAsString(updateRequest).getBytes());

		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		mvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT, "/place")
				.file(multipartFiles.get(0))
				.file(multipartFiles.get(1))
				.file(multipartFiles.get(2))
				.file(json)
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_PLACE.toString()))
			.andDo(print());
		//then
	}

	@DisplayName("05_02. /place 장소 업데이트 fail mismatch place category type")
	@Test
	public void test_05_02() throws Exception {
		//given
		given(placeService.updatePlace(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.MISMATCH_PLACE_CATEGORY_TYPE));

		//when

		List<MockMultipartFile> multipartFiles = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String file = String.format("%d.png", i);
			FileInputStream fis = new FileInputStream("src/main/resources/testImages/" + file);
			multipartFiles.add(new MockMultipartFile("multipartFile", file, "png", fis));
		}

		UpdateRequest updateRequest = UpdateRequest.builder()
			.placeId(1L)
			.latitude(1.0)
			.longitude(1.0)
			.title("title test update")
			.text("text test update")
			.addressName("total address update")
			.region1("place name1 update")
			.region2("place name2 update")
			.region3("place name3 update")
			.region4("place name4 update")
			.placeName("place name update")
			.placeTime(LocalDateTime.now().minusDays(1))
			.placeCategory("자연")
			.journeyId(1L)
			.build();
		MockMultipartFile json = new MockMultipartFile("request", "", "application/json",
			objectMapper.writeValueAsString(updateRequest).getBytes());

		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		mvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT, "/place")
				.file(multipartFiles.get(0))
				.file(multipartFiles.get(1))
				.file(multipartFiles.get(2))
				.file(json)
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.MISMATCH_PLACE_CATEGORY_TYPE.toString()))
			.andDo(print());
		//then
	}

	@DisplayName("05_03. /place 장소 업데이트 fail FAILED_UPLOAD")
	@Test
	public void test_05_03() throws Exception {
		//given
		given(placeService.updatePlace(any(), any())).willThrow(
			new ImageException(ImageErrorCode.FAILED_UPLOAD));

		//when

		List<MockMultipartFile> multipartFiles = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String file = String.format("%d.png", i);
			FileInputStream fis = new FileInputStream("src/main/resources/testImages/" + file);
			multipartFiles.add(new MockMultipartFile("multipartFile", file, "png", fis));
		}

		UpdateRequest updateRequest = UpdateRequest.builder()
			.placeId(1L)
			.latitude(1.0)
			.longitude(1.0)
			.title("title test update")
			.text("text test update")
			.addressName("total address update")
			.region1("place name1 update")
			.region2("place name2 update")
			.region3("place name3 update")
			.region4("place name4 update")
			.placeName("place name update")
			.placeTime(LocalDateTime.now().minusDays(1))
			.placeCategory("자연")
			.journeyId(1L)
			.build();
		MockMultipartFile json = new MockMultipartFile("request", "", "application/json",
			objectMapper.writeValueAsString(updateRequest).getBytes());

		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		mvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT, "/place")
				.file(multipartFiles.get(0))
				.file(multipartFiles.get(1))
				.file(multipartFiles.get(2))
				.file(json)
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ImageErrorCode.FAILED_UPLOAD.toString()))
			.andDo(print());
		//then
	}


	private static PlaceDto.Response testPlace(Long id) {
		Response response = Response.toResponse(Place.builder()

			.id(id)
			.title("장소 테스트 제목")
			.text("장소 테스트 본문")
			.addressName("장소 테스르 전체 주소")
			.placeHeartCount(0L)
			.journey(Journey.builder().build())
			.placeCategory(PlaceCategoryType.ECT)
			.build());

		response.setImageUrls(List.of("url1", "url2", "url3", "url4"));
		return response;
	}
}