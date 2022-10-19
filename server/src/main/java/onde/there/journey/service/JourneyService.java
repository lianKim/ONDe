package onde.there.journey.service;

import static onde.there.domain.type.AreaType.findByAreaType;
import static onde.there.journey.exception.JourneyErrorCode.DATE_ERROR;
import static onde.there.journey.exception.JourneyErrorCode.NEED_A_DETAILED_REGION;
import static onde.there.journey.exception.JourneyErrorCode.NOT_FOUND_MEMBER;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.JourneyTheme;
import onde.there.domain.Member;
import onde.there.domain.RegionalCategory;
import onde.there.domain.type.AreaType;
import onde.there.domain.type.JourneyThemeType;
import onde.there.dto.journy.JourneyDto;
import onde.there.dto.journy.JourneyDto.JourneyListResponse;
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
		log.info("journey 생성 완료");

		List<String> inputJourneyThemes = request.getJourneyThemes();
		for (String inputJourneyTheme : inputJourneyThemes) {
			JourneyTheme journeyTheme = JourneyTheme.builder()
				.journey(journey)
				.journeyThemeName(
					JourneyThemeType.findByTheme(inputJourneyTheme))
				.build();
			journeyThemeRepository.save(journeyTheme);
			log.info("journeyTheme 생성 완료");
		}

		List<RegionGroup> regionGroups = request.getRegionGroups();
		for (RegionGroup regionGroup : regionGroups) {
			if (areaCheck(regionGroup)) {
				RegionalCategory regionalCategory = RegionalCategory.builder()
					.journey(journey)
					.area(regionGroup.getArea())
					.build();
				regionalCategoryRepository.save(regionalCategory);
				log.info("RegionalCategory 생성 완료");
			}
			for (int j = 0; j < regionGroup.getRegions().size(); j++) {
				RegionalCategory regionalCategory = RegionalCategory.builder()
					.journey(journey)
					.area(regionGroup.getArea())
					.region(regionGroup.getRegions().get(j))
					.build();
				regionalCategoryRepository.save(regionalCategory);
				log.info("RegionalCategory 생성 완료");
			}
		}

		return JourneyDto.CreateResponse.fromEntity(journey,
			inputJourneyThemes, regionGroups);
	}

	public List<JourneyDto.JourneyListResponse> list() {

		List<JourneyDto.JourneyListResponse> list = new ArrayList<>();
		List<Journey> journeyList = journeyRepository
			.findAllByDisclosure("public");
		log.info("JourneyList 조회 완료");

		return getList(list, journeyList);
	}

	public List<JourneyDto.JourneyListResponse> myList(String memberId) {

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new JourneyException(NOT_FOUND_MEMBER));

		List<JourneyDto.JourneyListResponse> list = new ArrayList<>();
		List<Journey> journeyList = journeyRepository
			.findAllByMember(member);
		log.info("MyJourneyList 조회 완료");

		return getList(list, journeyList);
	}

	private List<JourneyListResponse> getList(List<JourneyListResponse> list,
		List<Journey> journeyList) {

		for (Journey journey : journeyList) {
			List<String> journeyThemeTypeList = journeyThemeRepository
				.findAllByJourneyId(journey.getId())
				.stream().map(journeyTheme -> journeyTheme.getJourneyThemeName()
					.getThemeName())
				.collect(Collectors.toList());

			Map<String, List<String>> map = new HashMap<>();
			for (RegionalCategory regionalCategory : regionalCategoryRepository
				.findAllByJourneyId(journey.getId())) {
				if (findByAreaType(regionalCategory.getArea())
					== AreaType.METROPOLITAN_CITY) {
					map.put(regionalCategory.getArea(), new ArrayList<>());
				} else {
					if (map.containsKey(regionalCategory.getArea())) {
						map.get(regionalCategory.getArea())
							.add(regionalCategory.getRegion());
					} else {
						map.put(regionalCategory.getArea(), new ArrayList<>());
						map.get(regionalCategory.getArea())
							.add(regionalCategory.getRegion());
					}
				}
			}
			List<RegionGroup> regionGroupList = map.entrySet().stream()
				.map(entry -> new RegionGroup(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());

			list.add(JourneyListResponse.fromEntity(journey,
				journeyThemeTypeList, regionGroupList));
		}

		return list;
	}

	public boolean areaCheck(RegionGroup regionGroup) {
		if (findByAreaType(regionGroup.getArea()) == AreaType.DO
			&& regionGroup.getRegions().size() == 0) {
			throw new JourneyException(NEED_A_DETAILED_REGION);
		} else {
			return findByAreaType(regionGroup.getArea())
				== AreaType.METROPOLITAN_CITY;
		}
	}
}
