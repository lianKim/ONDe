package onde.there.journey.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Journey;
import onde.there.domain.JourneyBookmark;
import onde.there.domain.Member;
import onde.there.dto.journy.JourneyBookmarkDto;
import onde.there.journey.exception.JourneyErrorCode;
import onde.there.journey.exception.JourneyException;
import onde.there.journey.repository.JourneyBookmarkRepository;
import onde.there.journey.repository.JourneyRepository;
import onde.there.journey.repository.JourneyThemeRepository;
import onde.there.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JourneyBookmarkService {

	private final JourneyBookmarkRepository journeyBookmarkRepository;
	private final MemberRepository memberRepository;
	private final JourneyRepository journeyRepository;
	private final JourneyThemeRepository journeyThemeRepository;

	@Transactional
	public Long createBookmark(JourneyBookmarkDto.CreateRequest request) {
		Member member = memberRepository.findById(request.getMemberId())
			.orElseThrow(() -> new JourneyException(
				JourneyErrorCode.NOT_FOUND_MEMBER));
		Journey journey = journeyRepository.findById(request.getJourneyId())
			.orElseThrow(() -> new JourneyException(JourneyErrorCode.NOT_FOUND_JOURNEY));
		JourneyBookmark journeyBookmark = journeyBookmarkRepository.save(JourneyBookmark.builder()
			.member(member)
			.journey(journey)
			.build());
		log.info(member.getId() + "님이 " + journey.getTitle() + " 여정을 북마크에 추가했습니다.");
		return journeyBookmark.getId();
	}

	@Transactional
	public void deleteBookmark(Long id) {
		journeyBookmarkRepository.deleteById(id);
		log.info("북마크 아이디 : " + id + "가 삭제 되었습니다.");
	}

	@Transactional(readOnly = true)
	public List<JourneyBookmarkDto.JourneyBookmarkListResponse> getBookmarkList(String id) {
		List<JourneyBookmarkDto.JourneyBookmarkListResponse> responses = new ArrayList<>();
		if(!journeyBookmarkRepository.existsByMemberId(id)){
			throw new JourneyException(JourneyErrorCode.NOT_FOUND_MEMBER);
		}
		List<JourneyBookmark> bookmarks = journeyBookmarkRepository.findAllByMemberId(id);

		for (JourneyBookmark bookmark : bookmarks) {
			Journey journey = bookmark.getJourney();
			List<String> themes = journeyThemeRepository.findAllByJourneyId(journey.getId())
				.stream().map(journeyTheme -> journeyTheme.getJourneyThemeName().getThemeName())
				.collect(Collectors.toList());
			responses.add(JourneyBookmarkDto.JourneyBookmarkListResponse.fromEntity(journey, themes,
				bookmark.getId()));
		}
		return responses;
	}
}
