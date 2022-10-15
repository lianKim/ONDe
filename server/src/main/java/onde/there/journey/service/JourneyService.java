package onde.there.journey.service;

import static onde.there.exception.type.ErrorCode.DATE_ERROR;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.JourneyTheme;
import onde.there.domain.Member;
import onde.there.domain.type.JourneyThemeType;
import onde.there.dto.journy.JourneyDto;
import onde.there.exception.JourneyException;
import onde.there.journey.repository.JourneyRepository;
import onde.there.journey.repository.JourneyThemeRepository;
import onde.there.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class JourneyService {

	private final JourneyRepository journeyRepository;
	private final JourneyThemeRepository journeyThemeRepository;
	private final MemberRepository memberRepository;

	public JourneyDto.CreateResponse createJourney(
		JourneyDto.CreateRequest request) {

		Member member = memberRepository.findByEmail(request.getMemberEmail())
			.get();

		if (request.getStartDay().isBefore(request.getEndDay())) {
			throw new JourneyException(DATE_ERROR);
		}

		Journey journey = Journey.builder()
			.member(member)
			.title(request.getTitle())
			.startDay(request.getStartDay())
			.endDay(request.getEndDay())
			.placeThumbnailUrl(request.getPlaceThumbnailUrl())
			.disclosure(request.getDisclosure())
			.introductionText(request.getIntroductionText())
			.build();

		journeyRepository.save(journey);

		List<String> inputJourneyThemes = request.getJourneyThemes();
		for (String inputJourneyTheme : inputJourneyThemes) {
			JourneyTheme journeyTheme = JourneyTheme.builder()
				.journey(journey)
				.journeyThemeName(
					JourneyThemeType.findByTheme(inputJourneyTheme))
				.build();
			journeyThemeRepository.save(journeyTheme);
		}

		return JourneyDto.CreateResponse.fromEntity(journey,
			inputJourneyThemes);
	}
}
