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

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final MemberRepository memberRepository;
	private final PlaceRepository placeRepository;

	public Comment createComment(CreateRequest request) {
		return commentRepository.save(Comment.builder()
			.member(memberRepository.findById(request.getMemberId())
				.orElseThrow(() -> new CommentException(
					CommentErrorCode.NOT_FOUND_MEMBER)))
			.place(placeRepository.findById(request.getPlaceId())
				.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_PLACE)))
			.comment(request.getComment())
			.build());
	}

	public List<CommentDto.Response> getComments(Long placeId) {
		List<Comment> comments = commentRepository.findAllByPlaceId(placeId);
		List<CommentDto.Response> responses = new ArrayList<>();
		for (Comment comment : comments) {
			String memberName = memberRepository.findById(comment.getMember().getId())
				.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_MEMBER))
				.getName();
			responses.add(CommentDto.Response.builder()
				.memberName(memberName)
				.placeId(comment.getPlace().getId())
				.comment(comment.getComment())
				.build());
		}
		return responses;
	}

	public Long updateComment(CommentDto.UpdateRequest request) {
		Comment comment = commentRepository.findById(request.getCommentId())
			.orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_COMMENT));
		comment.updateComment(request.getComment());
		return commentRepository.save(comment).getId();
	}

	public void deleteComment(Long commentId) {
		Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new CommentException(CommentErrorCode.NOT_FOUND_COMMENT));
        commentRepository.deleteById(commentId);
	}
}
