package onde.there.comment.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;
import onde.there.comment.exception.CommentErrorCode;
import onde.there.comment.exception.CommentException;
import onde.there.comment.repository.CommentRepository;
import onde.there.domain.Comment;
import onde.there.domain.Member;
import onde.there.domain.Place;
import onde.there.dto.comment.CommentDto;
import onde.there.dto.comment.CommentDto.Response;
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
		Member member = memberRepository.save(new Member("asd", "", "", ""));
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
		Member member = memberRepository.save(new Member("1", "", "", ""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId("2")
				.placeId(place.getId())
				.comment("댓글입니다.")
				.build();
		//when
		CommentException commentException = assertThrows(CommentException.class,
			() -> commentService.createComment(request));
		//then
		assertEquals(CommentErrorCode.NOT_FOUND_MEMBER, commentException.getErrorCode());
	}

	@Test
	void 댓글_생성_에러_장소아이디() {
		//given
		Member member = memberRepository.save(new Member("1", "", "", ""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(123L)
				.comment("댓글입니다.")
				.build();
		//when
		CommentException commentException = assertThrows(CommentException.class,
			() -> commentService.createComment(request));
		//then
		assertEquals(CommentErrorCode.NOT_FOUND_PLACE, commentException.getErrorCode());
	}

	@Test
	void 댓글_조회() {
		//given
		Member member = memberRepository.save(new Member("asd", "", "", ""));
		Place place = placeRepository.save(new Place());
		List<Comment> comments = new ArrayList<>();
		for (int i = 0; i < 3; i++) {
			String commentText = String.format("%d번째 댓글", i);
			comments.add(commentService.createComment(CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(place.getId())
				.comment(commentText)
				.build()));
		}
		//when
		List<CommentDto.Response> responses = commentService.getComments(place.getId());
		//then
		for (Response response : responses) {
			System.out.println(response.getComment());
			assertFalse(comments.contains(response.getComment()));
		}
	}

	@Test
	void 댓글_조회_에러_장소아이디() {
		//given
		Member member = memberRepository.save(new Member("asd", "", "", ""));
		Place place = placeRepository.save(new Place());
		List<Comment> comments = new ArrayList<>();
		for (int i = 0; i < 3; i++) {
			String commentText = String.format("%d번째 댓글", i);
			comments.add(commentService.createComment(CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(place.getId())
				.comment(commentText)
				.build()));
		}
		//when
		CommentException commentException = assertThrows(CommentException.class,
			() -> commentService.getComments(123L));
		//then
		assertEquals(CommentErrorCode.NOT_FOUND_PLACE, commentException.getErrorCode());
	}

	@Test
	void 댓글_수정() {
		//given
		Member member = memberRepository.save(new Member("asd", "", "", ""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(place.getId())
				.comment("댓글입니다.")
				.build();
		Comment comment = commentService.createComment(request);

		CommentDto.UpdateRequest updateRequest =
			CommentDto.UpdateRequest.builder()
				.commentId(comment.getId())
				.comment("수정된 댓글입니다.")
				.build();
		//when
		Long id = commentService.updateComment(updateRequest);
		//then
		assertEquals(comment.getId(), id);
		assertEquals(updateRequest.getComment(),
			commentRepository.findById(id).orElseThrow().getComment());
	}

	@Test
	void 댓글_수정_에러_댓글아이디() {
		//given
		Member member = memberRepository.save(new Member("asd", "", "", ""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(place.getId())
				.comment("댓글입니다.")
				.build();
		Comment comment = commentService.createComment(request);

		CommentDto.UpdateRequest updateRequest =
			CommentDto.UpdateRequest.builder()
				.commentId(123L)
				.comment("수정된 댓글입니다.")
				.build();
		//when
		CommentException commentException = assertThrows(CommentException.class,
			() -> commentService.updateComment(updateRequest));
		//then
		assertEquals(CommentErrorCode.NOT_FOUND_COMMENT, commentException.getErrorCode());
	}

	@Test
	void 댓글_삭제() {
		//given
		Member member = memberRepository.save(new Member("asd", "", "", ""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(place.getId())
				.comment("댓글입니다.")
				.build();
		Comment comment = commentService.createComment(request);
		//when
		commentService.deleteComment(comment.getId());
		//then
		assertEquals(0, commentRepository.count());
	}

	@Test
	void 댓글_삭제_에러_댓글아이디() {
		//given
		Member member = memberRepository.save(new Member("asd", "", "", ""));
		Place place = placeRepository.save(new Place());
		CommentDto.CreateRequest request =
			CommentDto.CreateRequest.builder()
				.memberId(member.getId())
				.placeId(place.getId())
				.comment("댓글입니다.")
				.build();
		Comment comment = commentService.createComment(request);
		//when
		CommentException commentException = assertThrows(CommentException.class, () -> commentService.deleteComment(123L));
		//then
		assertEquals(CommentErrorCode.NOT_FOUND_COMMENT, commentException.getErrorCode());
	}
}