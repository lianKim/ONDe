package onde.there.journey.service;

import static onde.there.domain.type.RegionType.findByRegion;
import static onde.there.journey.exception.JourneyErrorCode.DATE_ERROR;
import static onde.there.journey.exception.JourneyErrorCode.NOT_FOUND_JOURNEY;
import static onde.there.journey.exception.JourneyErrorCode.NOT_FOUND_MEMBER;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.JourneyTheme;
import onde.there.domain.Member;
import onde.there.domain.type.JourneyThemeType;
import onde.there.dto.journy.JourneyDto;
import onde.there.dto.journy.JourneyDto.DetailResponse;
import onde.there.dto.journy.JourneyDto.JourneyListResponse;
import onde.there.dto.journy.JourneySearchTheme;
import onde.there.image.service.AwsS3Service;
import onde.there.journey.exception.JourneyException;
import onde.there.journey.repository.JourneyRepository;
import onde.there.journey.repository.JourneyRepositoryImpl;
import onde.there.journey.repository.JourneyThemeRepository;
import onde.there.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class JourneyService {

	private final JourneyRepository journeyRepository;
	private final JourneyThemeRepository journeyThemeRepository;
	private final MemberRepository memberRepository;
	private final JourneyRepositoryImpl journeyRepositoryImpl;
	private final AwsS3Service awsS3Service;

	@Transactional
	public JourneyDto.CreateResponse createJourney(
		JourneyDto.CreateRequest request,
		MultipartFile thumbnail) {

		Member member = new Member("test", "test", "1", "1");
		memberRepository.save(member);

//		Member member = memberRepository.findByEmail(request.getMemberEmail())
//			.orElseThrow(() -> new JourneyException(NOT_FOUND_MEMBER));

		if (request.getEndDate().isBefore(request.getStartDate())) {
			throw new JourneyException(DATE_ERROR);
		}

		List<String> imageUrls = awsS3Service.uploadFiles(
			Collections.singletonList(thumbnail));

		log.info("여정 thumbnail 업로드 완료 "
			+ "(여정 thumbnail URL : " + imageUrls.get(0) + ")");

		Journey journey = Journey.builder()
			.member(member)
			.title(request.getTitle())
			.startDate(request.getStartDate())
			.endDate(request.getEndDate())
			.journeyThumbnailUrl(imageUrls.get(0))
			.disclosure(request.getDisclosure())
			.introductionText(request.getIntroductionText())
			.numberOfPeople(request.getNumberOfPeople())
			.region(findByRegion(request.getRegion()))
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

		return JourneyDto.CreateResponse.fromEntity(journey,
			inputJourneyThemes);
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

	public List<Journey> filteredList(
		JourneySearchTheme journeySearchTheme) {

		return journeyRepositoryImpl.searchAll(journeySearchTheme);
	}

	private List<JourneyListResponse> getList(List<JourneyListResponse> list,
		List<Journey> journeyList) {

		for (Journey journey : journeyList) {
			List<String> journeyThemeTypeList = journeyThemeRepository
				.findAllByJourneyId(journey.getId())
				.stream().map(journeyTheme -> journeyTheme
					.getJourneyThemeName()
					.getThemeName())
				.collect(Collectors.toList());

			list.add(
				JourneyListResponse.fromEntity(journey, journeyThemeTypeList));
		}

		return list;
	}

	public DetailResponse journeyDetail(Long journeyId) {

		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new JourneyException(NOT_FOUND_JOURNEY));

		List<String> journeyThemeTypeList = journeyThemeRepository
			.findAllByJourneyId(journey.getId())
			.stream().map(journeyTheme -> journeyTheme
				.getJourneyThemeName()
				.getThemeName())
			.collect(Collectors.toList());

		return DetailResponse.fromEntity(journey, journeyThemeTypeList);
	}

	@Transactional
	public void deleteJourney(Long journeyId) {

		Journey journey = journeyRepository.findById(journeyId)
			.orElseThrow(() -> new JourneyException(NOT_FOUND_JOURNEY));

		List<JourneyTheme> journeyThemeTypeList = journeyThemeRepository
			.findAllByJourneyId(journey.getId());

		awsS3Service.deleteFile(journey.getJourneyThumbnailUrl());
		journeyThemeRepository.deleteAll(journeyThemeTypeList);
		journeyRepository.delete(journey);

		log.info("여정 삭제 완료 journeyId : " + journey.getId());

	}
}
