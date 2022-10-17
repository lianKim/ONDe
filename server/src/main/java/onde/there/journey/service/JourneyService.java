package onde.there.journey.service;

import static onde.there.journey.exception.JourneyErrorCode.DATE_ERROR;
import static onde.there.journey.exception.JourneyErrorCode.NEED_A_DETAILED_REGION;
import static onde.there.journey.exception.JourneyErrorCode.NOT_FOUND_MEMBER;

import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.JourneyTheme;
import onde.there.domain.Member;
import onde.there.domain.RegionalCategory;
import onde.there.domain.type.JourneyThemeType;
import onde.there.dto.journy.JourneyDto;
import onde.there.dto.journy.JourneyDto.RegionGroup;
import onde.there.journey.exception.JourneyException;
import onde.there.journey.repository.JourneyRepository;
import onde.there.journey.repository.JourneyThemeRepository;
import onde.there.journey.repository.RegionalCategoryRepository;
import onde.there.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JourneyService {

	private final JourneyRepository journeyRepository;
	private final JourneyThemeRepository journeyThemeRepository;
	private final MemberRepository memberRepository;
	private final RegionalCategoryRepository regionalCategoryRepository;

	@Transactional
	public JourneyDto.CreateResponse createJourney(
		JourneyDto.CreateRequest request) {

		Member member = memberRepository.findByEmail(request.getMemberEmail())
			.orElseThrow(() -> new JourneyException(NOT_FOUND_MEMBER));

		if (request.getEndDate().isBefore(request.getStartDate())) {
			throw new JourneyException(DATE_ERROR);
		}

		Journey journey = Journey.builder()
			.member(member)
			.title(request.getTitle())
			.startDate(request.getStartDate())
			.endDate(request.getEndDate())
			.placeThumbnailUrl(request.getPlaceThumbnailUrl())
			.disclosure(request.getDisclosure())
			.introductionText(request.getIntroductionText())
			.numberOfPeople(request.getNumberOfPeople())
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

		List<RegionGroup> regionGroups = request.getRegionGroups();
		for (RegionGroup regionGroup : regionGroups) {
			if (areaCheck(regionGroup)) {
				RegionalCategory regionalCategory = RegionalCategory.builder()
					.journey(journey)
					.area(regionGroup.getArea())
					.build();
				regionalCategoryRepository.save(regionalCategory);
			}
			for (int j = 0; j < regionGroup.getRegions().size(); j++) {
				RegionalCategory regionalCategory = RegionalCategory.builder()
					.journey(journey)
					.area(regionGroup.getArea())
					.region(regionGroup.getRegions().get(j))
					.build();
				regionalCategoryRepository.save(regionalCategory);
			}
		}

		return JourneyDto.CreateResponse.fromEntity(journey,
			inputJourneyThemes, regionGroups);
	}

	public boolean areaCheck(RegionGroup regionGroup) {
		if (!Objects.equals(regionGroup.getArea(), "제주특별자치도") &&
			regionGroup.getArea().charAt(regionGroup.getArea().length() - 1)
				== '도' && regionGroup.getRegions().size() == 0) {
			throw new JourneyException(NEED_A_DETAILED_REGION);
		} else {
			return regionGroup.getArea().length() >= 5;
		}
	}
}
