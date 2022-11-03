package onde.there.place.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import onde.there.exception.type.ErrorCode;
import onde.there.member.repository.MemberRepository;
import onde.there.member.security.SecurityConfig;
import onde.there.member.security.jwt.JwtService;
import onde.there.member.security.oauth2.OAuth2AuthenticationSuccessHandler;
import onde.there.member.security.oauth2.Oauth2MemberService;
import onde.there.member.utils.RandomUtil;
import onde.there.member.security.SecurityConfig;
import onde.there.place.exception.PlaceErrorCode;
import onde.there.place.exception.PlaceException;
import onde.there.place.service.PlaceHeartService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PlaceHeartController.class
	, includeFilters = @ComponentScan.Filter(
	type = FilterType.ASSIGNABLE_TYPE, classes = {SecurityConfig.class, Oauth2MemberService.class,
	OAuth2AuthenticationSuccessHandler.class, JwtService.class, RandomUtil.class}))
@WithMockUser
class PlaceHeartControllerTest {

	@MockBean
	private PlaceHeartService placeHeartService;

	@MockBean
	private MemberRepository memberRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MockMvc mvc;

	@DisplayName("01_00. /place/heart success")
	@Test
	public void test_01_00() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willReturn(true);

		//when
		mvc.perform(post("/place/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$").value(true))
			.andDo(print());
		//then
	}

	@DisplayName("01_01. /place/heart fail not found member")
	@Test
	public void test_01_01() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.NOT_FOUND_MEMBER));
		//when
		mvc.perform(post("/place/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_MEMBER.toString()))
			.andDo(print());

		//then
	}

	@DisplayName("01_02. /place/heart fail not found place")
	@Test
	public void test_01_02() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE));
		//when
		mvc.perform(post("/place/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_PLACE.toString()))
			.andDo(print());

		//then
	}

	@DisplayName("01_03. /place/heart fail already hearted")
	@Test
	public void test_01_03() throws Exception {
		//given
		given(placeHeartService.heart(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.ALREADY_HEARTED));
		//when
		mvc.perform(post("/place/heart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.ALREADY_HEARTED.toString()))
			.andDo(print());

		//then
	}

	@DisplayName("02_00. /place/unheart success")
	@Test
	public void test_02_00() throws Exception {
		//given
		given(placeHeartService.unHeart(any(), any())).willReturn(true);

		//when
		mvc.perform(post("/place/unheart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$").value(true))
			.andDo(print());
		//then
	}

	@DisplayName("02_01. /place/unheart fail not found member")
	@Test
	public void test_02_01() throws Exception {
		//given
		given(placeHeartService.unHeart(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.NOT_FOUND_MEMBER));

		//when
		mvc.perform(post("/place/unheart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_MEMBER.toString()))
			.andDo(print());
		//then
	}
	@DisplayName("02_02. /place/unheart fail not found place")
	@Test
	public void test_02_02() throws Exception {
		//given
		given(placeHeartService.unHeart(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.NOT_FOUND_PLACE));

		//when
		mvc.perform(post("/place/unheart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.NOT_FOUND_PLACE.toString()))
			.andDo(print());
		//then
	}

	@DisplayName("02_03. /place/unheart fail already hearted")
	@Test
	public void test_02_03() throws Exception {
		//given
		given(placeHeartService.unHeart(any(), any())).willThrow(
			new PlaceException(PlaceErrorCode.ALREADY_UN_HEARTED));

		//when
		mvc.perform(post("/place/unheart?placeId=1&memberId=1")
				.with(SecurityMockMvcRequestPostProcessors.csrf()))
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.errorCode").value(ErrorCode.ALREADY_UN_HEARTED.toString()))
			.andDo(print());
		//then
	}
}