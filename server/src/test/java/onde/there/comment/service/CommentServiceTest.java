package onde.there.comment.service;

import static org.junit.jupiter.api.Assertions.*;

import onde.there.comment.exception.CommentErrorCode;
import onde.there.comment.exception.CommentException;
import onde.there.comment.repository.CommentRepository;
import onde.there.domain.Comment;
import onde.there.domain.Member;
import onde.there.domain.Place;
import onde.there.dto.comment.CommentDto;
import onde.there.member.repository.MemberRepository;
import onde.there.place.repository.PlaceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class CommentServiceTest {

	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private PlaceRepository placeRepository;
	@Autowired
	private CommentService commentService;

	@Test
	void 댓글_생성() {
	    //given
		Member member = memberRepository.save(new Member("asd", "", "",""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(place.getId())
				.comment("댓글입니다.")
				.build();
	    //when
		Comment comment = commentService.createComment(request);
	    //then
		assertEquals(member.getId(), comment.getMember().getId());
		assertEquals(place.getId(), comment.getPlace().getId());
		assertEquals(request.getComment(), comment.getComment());
	}

	@Test
	void 댓글_생성_에러_멤버아이디() {
		//given
		Member member = memberRepository.save(new Member("1", "", "",""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId("2")
				.placeId(place.getId())
				.comment("댓글입니다.")
				.build();
		//when
		CommentException commentException = assertThrows(CommentException.class, () -> commentService.createComment(request));
		//then
		assertEquals(CommentErrorCode.NOT_FOUND_MEMBER, commentException.getErrorCode());
	}

	@Test
	void 댓글_생성_에러_장소아이디() {
		//given
		Member member = memberRepository.save(new Member("1", "", "",""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(2L)
				.comment("댓글입니다.")
				.build();
		//when
		CommentException commentException = assertThrows(CommentException.class, () -> commentService.createComment(request));
		//then
		assertEquals(CommentErrorCode.NOT_FOUND_PLACE, commentException.getErrorCode());
	}
}