//package onde.there.journey.service;
//
//import static onde.there.journey.exception.JourneyErrorCode.NEED_A_DETAILED_REGION;
//import static onde.there.journey.exception.JourneyErrorCode.NO_AREA_MATCHES;
//import static onde.there.journey.exception.JourneyErrorCode.THERE_IS_NO_MATCHING_THEME;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNull;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//import onde.there.domain.Journey;
//import onde.there.domain.JourneyTheme;
//import onde.there.domain.Member;
//import onde.there.domain.type.JourneyThemeType;
//import onde.there.dto.journy.JourneyDto;
//import onde.there.dto.journy.JourneyDto.JourneyListResponse;
//import onde.there.dto.journy.JourneyDto.RegionGroup;
//import onde.there.journey.exception.JourneyErrorCode;
//import onde.there.journey.exception.JourneyException;
//import onde.there.journey.repository.JourneyRepository;
//import onde.there.journey.repository.JourneyThemeRepository;
//import onde.there.member.repository.MemberRepository;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.ArgumentCaptor;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//@ExtendWith(MockitoExtension.class)
//public class JourneyServiceTest {
//
//	@Mock
//	private MemberRepository memberRepository;
//
//	@Mock
//	private JourneyRepository journeyRepository;
//
//	@Mock
//	private RegionalCategoryRepository regionalCategoryRepository;
//
//	@Mock
//	private JourneyThemeRepository journeyThemeRepository;
//
//	@InjectMocks
//	private JourneyService journeyService;
//
//	@Test
//	void createJourneySuccess() {
//
//		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
//			"온데");
//
//		List<RegionGroup> regionGroups = new ArrayList<>();
//		regionGroups.add(new RegionGroup("서울특별시", new ArrayList<>()));
//		regionGroups.add(new RegionGroup("강원도", Arrays.asList("속초시", "영월군")));
//		given(memberRepository.findByEmail(anyString()))
//			.willReturn(Optional.of(member));
//
//		ArgumentCaptor<Journey> journeyCaptor = ArgumentCaptor.forClass(
//			Journey.class);
//		ArgumentCaptor<JourneyTheme> journeyThemeCaptor = ArgumentCaptor.forClass(
//			JourneyTheme.class);
//		ArgumentCaptor<RegionalCategory> regionalCategoryCaptor = ArgumentCaptor.forClass(
//			RegionalCategory.class);
//
//		JourneyDto.CreateResponse journeyDto = journeyService.createJourney(
//			JourneyDto.CreateRequest.builder()
//				.memberEmail("tHereEmail")
//				.title("TitleTest")
//				.startDate(LocalDate.parse("2022-10-16"))
//				.endDate(LocalDate.parse("2022-10-17"))
//				.disclosure("public")
//				.placeThumbnailUrl("testPlaceThumbnailUrl")
//				.journeyThemes(Arrays.asList("힐링", "식도락"))
//				.introductionText("테스트 소개 글")
//				.numberOfPeople(7)
//				.regionGroups(regionGroups).build());
//
//		verify(journeyRepository, times(1)).save(journeyCaptor.capture());
//		verify(journeyThemeRepository, times(2)).save(
//			journeyThemeCaptor.capture());
//		verify(regionalCategoryRepository, times(3)).save(
//			regionalCategoryCaptor.capture());
//
//		assertEquals("tHereId", journeyDto.getMemberId());
//		assertEquals("TitleTest", journeyDto.getTitle());
//		assertEquals(LocalDate.parse("2022-10-16"),
//			journeyDto.getStartDate());
//		assertEquals(LocalDate.parse("2022-10-17"),
//			journeyDto.getEndDate());
//		assertEquals("testPlaceThumbnailUrl",
//			journeyDto.getPlaceThumbnailUrl());
//		assertEquals(JourneyThemeType.HEALING,
//			journeyThemeCaptor.getAllValues().get(0).getJourneyThemeName());
//		assertEquals(JourneyThemeType.RESTAURANT,
//			journeyThemeCaptor.getAllValues().get(1).getJourneyThemeName());
//		assertEquals("서울특별시",
//			regionalCategoryCaptor.getAllValues().get(0).getArea());
//		assertNull(regionalCategoryCaptor.getAllValues().get(0).getRegion());
//		assertEquals("강원도",
//			regionalCategoryCaptor.getAllValues().get(1).getArea());
//		assertEquals("속초시",
//			regionalCategoryCaptor.getAllValues().get(1).getRegion());
//		assertEquals("강원도",
//			regionalCategoryCaptor.getAllValues().get(2).getArea());
//		assertEquals("영월군",
//			regionalCategoryCaptor.getAllValues().get(2).getRegion());
//
//	}
//
//	@Test
//	@DisplayName("종료 날짜가 시작 날짜보다 과거 - 여정 생성 실패")
//	void createJourney_DateError() {
//
//		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
//			"온데");
//
//		given(memberRepository.findByEmail(anyString()))
//			.willReturn(Optional.of(member));
//
//		List<RegionGroup> regionGroups = new ArrayList<>();
//		regionGroups.add(new RegionGroup("서울특별시", new ArrayList<>()));
//		regionGroups.add(new RegionGroup("강원도", Arrays.asList("속초시", "영월군")));
//
//		JourneyException exception = assertThrows(JourneyException.class,
//			() -> journeyService.createJourney(
//				JourneyDto.CreateRequest.builder()
//					.memberEmail("tHereEmail")
//					.title("TitleTest")
//					.startDate(LocalDate.parse("2022-10-16"))
//					.endDate(LocalDate.parse("2022-10-15"))
//					.disclosure("public")
//					.placeThumbnailUrl("testPlaceThumbnailUrl")
//					.journeyThemes(Arrays.asList("힐링", "식도락"))
//					.introductionText("테스트 소개 글")
//					.numberOfPeople(7)
//					.regionGroups(regionGroups).build()));
//
//		assertEquals(JourneyErrorCode.DATE_ERROR, exception.getErrorCode());
//	}
//
//	@Test
//	@DisplayName("일치하는 테마가 없을 때 - 여정 생성 실패")
//	void createJourney_THERE_IS_NO_MATCHING_THEME() {
//
//		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
//			"온데");
//
//		given(memberRepository.findByEmail(anyString()))
//			.willReturn(Optional.of(member));
//
//		List<RegionGroup> regionGroups = new ArrayList<>();
//		regionGroups.add(new RegionGroup("서울특별시", new ArrayList<>()));
//		regionGroups.add(new RegionGroup("강원도", Arrays.asList("속초시", "영월군")));
//
//		JourneyException exception = assertThrows(JourneyException.class,
//			() -> journeyService.createJourney(
//				JourneyDto.CreateRequest.builder()
//					.memberEmail("tHereEmail")
//					.title("TitleTest")
//					.startDate(LocalDate.parse("2022-10-16"))
//					.endDate(LocalDate.parse("2022-10-17"))
//					.disclosure("public")
//					.placeThumbnailUrl("testPlaceThumbnailUrl")
//					.journeyThemes(Arrays.asList("testTheme1", "testTheme2"))
//					.introductionText("테스트 소개 글")
//					.numberOfPeople(7)
//					.regionGroups(regionGroups).build()));
//
//		assertEquals(THERE_IS_NO_MATCHING_THEME, exception.getErrorCode());
//	}
//
//	@Test
//	@DisplayName("특정 도에서 추가적인 지역 정보가 없을 때 - 여정 생성 실패")
//	void createJourney_NEED_A_DETAILED_REGION() {
//
//		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
//			"온데");
//
//		given(memberRepository.findByEmail(anyString()))
//			.willReturn(Optional.of(member));
//
//		List<RegionGroup> regionGroups = new ArrayList<>();
//		regionGroups.add(new RegionGroup("서울특별시", new ArrayList<>()));
//		regionGroups.add(new RegionGroup("강원도", new ArrayList<>()));
//
//		JourneyException exception = assertThrows(JourneyException.class,
//			() -> journeyService.createJourney(
//				JourneyDto.CreateRequest.builder()
//					.memberEmail("tHereEmail")
//					.title("TitleTest")
//					.startDate(LocalDate.parse("2022-10-16"))
//					.endDate(LocalDate.parse("2022-10-17"))
//					.disclosure("public")
//					.placeThumbnailUrl("testPlaceThumbnailUrl")
//					.journeyThemes(Arrays.asList("힐링", "식도락"))
//					.introductionText("테스트 소개 글")
//					.numberOfPeople(7)
//					.regionGroups(regionGroups).build()));
//
//		assertEquals(NEED_A_DETAILED_REGION, exception.getErrorCode());
//	}
//
//	@Test
//	@DisplayName("일치하는 area가 없을 때 - 여정 생성 실패")
//	void createJourney_NO_AREA_MATCHES() {
//
//		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
//			"온데");
//
//		given(memberRepository.findByEmail(anyString()))
//			.willReturn(Optional.of(member));
//
//		List<RegionGroup> regionGroups = new ArrayList<>();
//		regionGroups.add(new RegionGroup("서울특별시", new ArrayList<>()));
//		regionGroups.add(new RegionGroup("없는 Area", new ArrayList<>()));
//
//		JourneyException exception = assertThrows(JourneyException.class,
//			() -> journeyService.createJourney(
//				JourneyDto.CreateRequest.builder()
//					.memberEmail("tHereEmail")
//					.title("TitleTest")
//					.startDate(LocalDate.parse("2022-10-16"))
//					.endDate(LocalDate.parse("2022-10-17"))
//					.disclosure("public")
//					.placeThumbnailUrl("testPlaceThumbnailUrl")
//					.journeyThemes(Arrays.asList("힐링", "식도락"))
//					.introductionText("테스트 소개 글")
//					.numberOfPeople(7)
//					.regionGroups(regionGroups).build()));
//
//		assertEquals(NO_AREA_MATCHES, exception.getErrorCode());
//	}
//
//	@Test
//	void JourneyListSuccess() {
//		//given
//		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
//			"온데");
//
//		List<Journey> journeyList = Arrays.asList(
//			Journey.builder()
//				.id(1L)
//				.member(member)
//				.title("TitleTest")
//				.startDate(LocalDate.parse("2022-10-16"))
//				.endDate(LocalDate.parse("2022-10-17"))
//				.disclosure("public")
//				.placeThumbnailUrl("testPlaceThumbnailUrl")
//				.introductionText("테스트 소개 글")
//				.numberOfPeople(7)
//				.build(),
//			Journey.builder()
//				.id(2L)
//				.member(member)
//				.title("TitleTest2")
//				.startDate(LocalDate.parse("2022-10-16"))
//				.endDate(LocalDate.parse("2022-10-17"))
//				.disclosure("public")
//				.placeThumbnailUrl("testPlaceThumbnailUrl")
//				.introductionText("테스트 소개 글")
//				.numberOfPeople(7)
//				.build()
//		);
//
//		List<JourneyTheme> journeyTheme = Arrays.asList(
//			JourneyTheme.builder()
//				.id(1L)
//				.journey(journeyList.get(0))
//				.journeyThemeName(JourneyThemeType.HEALING)
//				.build(),
//			JourneyTheme.builder()
//				.id(1L)
//				.journey(journeyList.get(0))
//				.journeyThemeName(JourneyThemeType.RESTAURANT)
//				.build()
//		);
//
//		List<RegionalCategory> regionalCategoryList = Arrays.asList(
//			RegionalCategory.builder()
//				.id(1L)
//				.area("강원도")
//				.region("속초시")
//				.build(),
//			RegionalCategory.builder()
//				.id(1L)
//				.area("강원도")
//				.region("영월군")
//				.build(),
//			RegionalCategory.builder()
//				.id(1L)
//				.area("경기도")
//				.region(null)
//				.build()
//		);
//
//		given(journeyRepository.findAllByDisclosure(anyString()))
//			.willReturn(journeyList);
//		given(journeyThemeRepository.findAllByJourneyId(any()))
//			.willReturn(journeyTheme);
//		given(regionalCategoryRepository.findAllByJourneyId(any()))
//			.willReturn(regionalCategoryList);
//
//		//when
//		List<JourneyListResponse> list = journeyService.list();
//
//		//then
//		assertEquals(2, list.size());
//		assertEquals(1L, list.get(0).getJourneyId());
//		assertEquals(2L, list.get(1).getJourneyId());
//		assertEquals("TitleTest", list.get(0).getTitle());
//		assertEquals("TitleTest2", list.get(1).getTitle());
//		assertEquals(Arrays.asList("힐링", "식도락"),
//			list.get(0).getJourneyThemes());
//		assertEquals(Arrays.asList("힐링", "식도락"),
//			list.get(1).getJourneyThemes());
//		assertEquals("강원도", list.get(0).getRegionGroups().get(0).getArea());
//		assertEquals(List.of("속초시", "영월군"),
//			list.get(0).getRegionGroups().get(0).getRegions());
//
//	}
//
//	@Test
//	void MyJourneyListSuccess() {
//		//given
//		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
//			"온데");
//
//		List<Journey> journeyList = Arrays.asList(
//			Journey.builder()
//				.id(1L)
//				.member(member)
//				.title("TitleTest")
//				.startDate(LocalDate.parse("2022-10-16"))
//				.endDate(LocalDate.parse("2022-10-17"))
//				.disclosure("public")
//				.placeThumbnailUrl("testPlaceThumbnailUrl")
//				.introductionText("테스트 소개 글")
//				.numberOfPeople(7)
//				.build(),
//			Journey.builder()
//				.id(2L)
//				.member(member)
//				.title("TitleTest2")
//				.startDate(LocalDate.parse("2022-10-16"))
//				.endDate(LocalDate.parse("2022-10-17"))
//				.disclosure("public")
//				.placeThumbnailUrl("testPlaceThumbnailUrl")
//				.introductionText("테스트 소개 글")
//				.numberOfPeople(7)
//				.build()
//		);
//
//		List<JourneyTheme> journeyTheme = Arrays.asList(
//			JourneyTheme.builder()
//				.id(1L)
//				.journey(journeyList.get(0))
//				.journeyThemeName(JourneyThemeType.HEALING)
//				.build(),
//			JourneyTheme.builder()
//				.id(1L)
//				.journey(journeyList.get(0))
//				.journeyThemeName(JourneyThemeType.RESTAURANT)
//				.build()
//		);
//
//		List<RegionalCategory> regionalCategoryList = Arrays.asList(
//			RegionalCategory.builder()
//				.id(1L)
//				.area("강원도")
//				.region("속초시")
//				.build(),
//			RegionalCategory.builder()
//				.id(1L)
//				.area("강원도")
//				.region("영월군")
//				.build(),
//			RegionalCategory.builder()
//				.id(1L)
//				.area("경기도")
//				.region(null)
//				.build()
//		);
//
//		given(memberRepository.findById(anyString()))
//			.willReturn(Optional.of(member));
//		given(journeyRepository.findAllByMember(any()))
//			.willReturn(journeyList);
//		given(journeyThemeRepository.findAllByJourneyId(any()))
//			.willReturn(journeyTheme);
//		given(regionalCategoryRepository.findAllByJourneyId(any()))
//			.willReturn(regionalCategoryList);
//
//		//when
//		List<JourneyListResponse> list = journeyService.myList("testId");
//
//		//then
//		assertEquals(2, list.size());
//		assertEquals("tHereId", list.get(0).getMemberId());
//		assertEquals("tHereId", list.get(1).getMemberId());
//		assertEquals(1L, list.get(0).getJourneyId());
//		assertEquals(2L, list.get(1).getJourneyId());
//		assertEquals("TitleTest", list.get(0).getTitle());
//		assertEquals("TitleTest2", list.get(1).getTitle());
//		assertEquals(Arrays.asList("힐링", "식도락"),
//			list.get(0).getJourneyThemes());
//		assertEquals(Arrays.asList("힐링", "식도락"),
//			list.get(1).getJourneyThemes());
//		assertEquals("강원도", list.get(0).getRegionGroups().get(0).getArea());
//		assertEquals(List.of("속초시", "영월군"),
//			list.get(0).getRegionGroups().get(0).getRegions());
//
//	}
//
//	@Test
//	@DisplayName("존재하는 유저가 아닐 때 - 내 여정 조회 실패")
//	void MyJourneyList_NOT_FOUND_MEMBER() {
//		//given
//		given(memberRepository.findById(anyString()))
//			.willReturn(Optional.empty());
//
//		//when
//		JourneyException exception = assertThrows(JourneyException.class,
//			() -> journeyService.myList("test"));
//
//		//then
//		assertEquals(JourneyErrorCode.NOT_FOUND_MEMBER,
//			exception.getErrorCode());
//
//	}
//
//
//}
