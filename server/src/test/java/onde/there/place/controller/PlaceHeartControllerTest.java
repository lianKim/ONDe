package onde.there.place.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import onde.there.config.SecurityConfig;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;
import onde.there.place.service.PlaceHeartService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = PlaceHeartController.class
	, includeFilters = @ComponentScan.Filter(
	type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class))
@WithMockUser
class PlaceHeartControllerTest {

	@MockBean
	private PlaceHeartService placeHeartService;

	@InjectMocks
	private PlaceHeartController placeHeartController;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MockMvc mvc;

	@DisplayName("01_00. /place-heart/heart success")
	@Test
	public void test_01_00() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willReturn(true);

		//when
		mvc.perform(post("/place-heart/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$").value(true))
			.andDo(print());
		//then
	}

	@DisplayName("01_01. /place-heart/heart fail not found member")
	@Test
	public void test_01_01() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willThrow(
			new PlaceException(ErrorCode.NOT_FOUND_MEMBER));
		//when
		mvc.perform(post("/place-heart/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_MEMBER.toString()))
			.andDo(print());

		//then
	}

	@DisplayName("01_02. /place-heart/heart fail not found place")
	@Test
	public void test_01_02() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willThrow(
			new PlaceException(ErrorCode.NOT_FOUND_PLACE));
		//when
		mvc.perform(post("/place-heart/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_PLACE.toString()))
			.andDo(print());

		//then
	}

	@DisplayName("01_03. /place-heart/heart fail already hearted")
	@Test
	public void test_01_03() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willThrow(
			new PlaceException(ErrorCode.ALREADY_HEARTED));
		//when
		mvc.perform(post("/place-heart/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.ALREADY_HEARTED.toString()))
			.andDo(print());

		//then
	}
}