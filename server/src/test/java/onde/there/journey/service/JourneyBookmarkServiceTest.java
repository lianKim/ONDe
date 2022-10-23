package onde.there.journey.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import onde.there.domain.Journey;
import onde.there.domain.JourneyBookmark;
import onde.there.domain.Member;
import onde.there.dto.journy.JourneyBookmarkDto;
import onde.there.journey.repository.JourneyBookmarkRepository;
import onde.there.journey.repository.JourneyRepository;
import onde.there.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class JourneyBookmarkServiceTest {

	@Autowired
	private JourneyBookmarkService journeyBookmarkService;
	@Autowired
	private JourneyRepository journeyRepository;
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private JourneyBookmarkRepository journeyBookmarkRepository;

	@Test
	void 북마크_저장() {
		//given
		Member member = memberRepository.save(new Member("1", "", "", ""));
		Journey journey = journeyRepository.save(new Journey());
		//when
		journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
			.journeyId(journey.getId())
			.memberId(member.getId())
			.build());
		//then
		JourneyBookmark journeyBookmark = journeyBookmarkRepository.findById(1L).orElseThrow();
		assertEquals(member.getId(), journeyBookmark.getMember().getId());
		assertEquals(journey.getId(), journeyBookmark.getJourney().getId());

	}
}