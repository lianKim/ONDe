package onde.there.comment.service;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.comment.exception.CommentErrorCode;
import onde.there.comment.exception.CommentException;
import onde.there.comment.repository.CommentRepository;
import onde.there.domain.Comment;
import onde.there.dto.comment.CommentDto;
import onde.there.dto.comment.CommentDto.CreateRequest;
import onde.there.member.repository.MemberRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final MemberRepository memberRepository;
	private final PlaceRepository placeRepository;

	@Transactional
	public Comment createComment(CreateRequest request) {
		Comment comment = commentRepository.save(Comment.builder()
			.member(memberRepository.findById(request.getMemberId())
				.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_MEMBER)))
			.place(placeRepository.findById(request.getPlaceId())
				.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_PLACE)))
			.comment(request.getComment())
			.build());
		log.info(comment.getMember().getName() + "님이 \"" + comment.getPlace().getTitle() + "\"에 댓글을 남겼습니다.");
		return comment;
	}

	@Transactional(readOnly = true)
	public List<CommentDto.Response> getComments(Long placeId) {
		List<CommentDto.Response> responses = new ArrayList<>();
		if(!placeRepository.existsById(placeId)) {
			throw new CommentException(CommentErrorCode.NOT_FOUND_PLACE);
		}
		if (!commentRepository.existsById(placeId)) {
			log.info("장소에 댓글이 없습니다.");
			return responses;
		}
		List<Comment> comments = commentRepository.findAllByPlaceId(placeId);
		for (Comment comment : comments) {
			String memberName = memberRepository.findById(comment.getMember().getId())
				.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_MEMBER))
				.getName();
			responses.add(CommentDto.Response.builder()
				.commentId(comment.getId())
				.memberId(comment.getMember().getId())
				.memberName(memberName)
				.placeId(comment.getPlace().getId())
				.comment(comment.getComment())
				.build());
			log.info("장소 아이디 : " + comment.getPlace().getId() + "의 댓글 \"" + comment.getComment() + "\" 조회 성공");
		}
		return responses;
	}

	@Transactional
	public Long updateComment(CommentDto.UpdateRequest request) {
		Comment comment = commentRepository.findById(request.getCommentId())
			.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_COMMENT));
		String preComment = comment.getComment();
		comment.updateComment(request.getComment());
		log.info("댓글 아이디 : " + comment.getId() + "의 댓글 \"" + preComment + "\"에서 \"" + comment.getComment() + "\"로 업데이트 되었습니다.");
		return commentRepository.save(comment).getId();
	}

	@Transactional
	public void deleteComment(Long commentId) {
		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_COMMENT));
		commentRepository.delete(comment);
		log.info("댓글 아이디 : " + comment.getId() + " 삭제 완료");
	}
}
