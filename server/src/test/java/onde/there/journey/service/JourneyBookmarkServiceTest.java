package onde.there.journey.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import onde.there.domain.Journey;
import onde.there.domain.JourneyBookmark;
import onde.there.domain.Member;
import onde.there.domain.type.RegionType;
import onde.there.dto.journy.JourneyBookmarkDto;
import onde.there.dto.journy.JourneyBookmarkDto.JourneyBookmarkListResponse;
import onde.there.journey.exception.JourneyErrorCode;
import onde.there.journey.exception.JourneyException;
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
		Long id = journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
			.journeyId(journey.getId())
			.memberId(member.getId())
			.build());
		//then
		JourneyBookmark journeyBookmark = journeyBookmarkRepository.findById(id).orElseThrow();
		assertEquals(member.getId(), journeyBookmark.getMember().getId());
		assertEquals(journey.getId(), journeyBookmark.getJourney().getId());

	}

	@Test
	void 북마크_저장_에러_멤버아이디() {
		//given
		Member member = memberRepository.save(new Member("1", "", "", ""));
		Journey journey = journeyRepository.save(new Journey());
		//when
		JourneyException journeyException = assertThrows(JourneyException.class,
			() -> journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
				.memberId("2")
				.journeyId(journey.getId())
				.build()));
		//then
		assertEquals(JourneyErrorCode.NOT_FOUND_MEMBER, journeyException.getErrorCode());
	}

	@Test
	void 북마크_저장_에러_여정아이디() {
		//given
		Member member = memberRepository.save(new Member("1", "", "", ""));
		Journey journey = journeyRepository.save(new Journey());
		//when
		JourneyException journeyException = assertThrows(JourneyException.class,
			() -> journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
				.memberId(member.getId())
				.journeyId(123L)
				.build()));
		//then
		assertEquals(JourneyErrorCode.NOT_FOUND_JOURNEY, journeyException.getErrorCode());
	}

	@Test
	void 북마크_삭제() {
		//given
		JourneyBookmark journeyBookmark = journeyBookmarkRepository.save(JourneyBookmark.builder()
			.member(new Member("1", "", "", ""))
			.journey(new Journey())
			.build());
		//when
		journeyBookmarkService.deleteBookmark(journeyBookmark.getId());
		//then
		assertEquals(0, journeyBookmarkRepository.count());
	}
	@Test
	void 북마크_삭제_에러_북마크아이디() {
		//given
		JourneyBookmark journeyBookmark = journeyBookmarkRepository.save(JourneyBookmark.builder()
			.member(new Member("1", "", "", ""))
			.journey(new Journey())
			.build());
		//when
		JourneyException journeyException = assertThrows(JourneyException.class , () ->journeyBookmarkService.deleteBookmark(123L));
		//then
		assertEquals(JourneyErrorCode.NOT_FOUND_BOOKMARK, journeyException.getErrorCode());
	}
	@Test
	void 북마크_조회() {
		//given
		Member member = memberRepository.save(new Member("1", "", "", ""));
		Journey journey = journeyRepository.save(Journey.builder()
				.member(member)
				.title("TitleTest")
				.region(RegionType.BUSAN)
			.build());
		journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
			.journeyId(journey.getId())
			.memberId(member.getId())
			.build());
		Journey journey2 = journeyRepository.save(Journey.builder()
			.member(member)
			.title("TitleTest2")
			.region(RegionType.CHUNGBUK)
			.build());
		journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
			.journeyId(journey2.getId())
			.memberId(member.getId())
			.build());
		//when
		List<JourneyBookmarkDto.JourneyBookmarkListResponse> responses =
			journeyBookmarkService.getBookmarkList(member.getId());
		//then
		for (JourneyBookmarkListResponse response : responses) {
			assertEquals(member.getId(), response.getMemberId());
		}
		assertEquals(2, responses.size());
	}

	@Test
	void 북마크_조회_에러_멤버아이디() {
	    //given
		Member member = memberRepository.save(new Member("1", "", "", ""));
		Journey journey = journeyRepository.save(Journey.builder()
			.member(member)
			.title("TitleTest")
			.region(RegionType.BUSAN)
			.build());
		journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
			.journeyId(journey.getId())
			.memberId(member.getId())
			.build());
		Journey journey2 = journeyRepository.save(Journey.builder()
			.member(member)
			.title("TitleTest2")
			.region(RegionType.CHUNGBUK)
			.build());
		journeyBookmarkService.createBookmark(JourneyBookmarkDto.CreateRequest.builder()
			.journeyId(journey2.getId())
			.memberId(member.getId())
			.build());
		//when
		JourneyException journeyException = assertThrows(JourneyException.class, () -> journeyBookmarkService.getBookmarkList("123"));
	    //then
		assertEquals(JourneyErrorCode.NOT_FOUND_MEMBER, journeyException.getErrorCode());
	}
}