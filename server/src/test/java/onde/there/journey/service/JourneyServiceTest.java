package onde.there.journey.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;
import onde.there.domain.Journey;
import onde.there.domain.JourneyTheme;
import onde.there.domain.Member;
import onde.there.domain.type.JourneyThemeType;
import onde.there.dto.journy.JourneyDto;
import onde.there.journey.repository.JourneyRepository;
import onde.there.journey.repository.JourneyThemeRepository;
import onde.there.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class JourneyServiceTest {

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private JourneyRepository journeyRepository;

	@Mock
	private JourneyThemeRepository journeyThemeRepository;

	@InjectMocks
	private JourneyService journeyService;

	@Test
	void createJourneySuccess() {

		Member member = new Member("tHereId", "tHereEmail", "tHerePassword",
			"온데");

		given(memberRepository.findByEmail(anyString()))
			.willReturn(Optional.of(member));

		ArgumentCaptor<Journey> journeyCaptor = ArgumentCaptor.forClass(
			Journey.class);
		ArgumentCaptor<JourneyTheme> JourneyThemeCaptor = ArgumentCaptor.forClass(
			JourneyTheme.class);

		JourneyDto.CreateResponse journeyDto = journeyService.createJourney(
			JourneyDto.CreateRequest.builder()
				.memberEmail("tHereEmail")
				.title("TitleTest")
				.startDay(LocalDate.ofEpochDay(2020 - 10 - 16))
				.endDay(LocalDate.ofEpochDay(2020 - 10 - 17))
				.disclosure("public")
				.placeThumbnailUrl("testPlaceThumbnailUrl")
				.journeyThemes(Arrays.asList("힐링", "식도락"))
				.introductionText("테스트 소개 글").build());

		verify(journeyRepository, times(1)).save(journeyCaptor.capture());
		verify(journeyThemeRepository, times(2)).save(
			JourneyThemeCaptor.capture());
		assertEquals("tHereId", journeyDto.getMemberId());
		assertEquals(0, journeyDto.getJourneyId());
		assertEquals("TitleTest", journeyDto.getTitle());
		assertEquals(LocalDate.ofEpochDay(2020 - 10 - 16),
			journeyDto.getStartDay());
		assertEquals(LocalDate.ofEpochDay(2020 - 10 - 17),
			journeyDto.getEndDay());
		assertEquals("testPlaceThumbnailUrl",
			journeyDto.getPlaceThumbnailUrl());
		assertEquals(JourneyThemeType.HEALING,
			JourneyThemeCaptor.getAllValues().get(0).getJourneyThemeName());
		assertEquals(JourneyThemeType.RESTAURANT,
			JourneyThemeCaptor.getAllValues().get(1).getJourneyThemeName());


	}
}
