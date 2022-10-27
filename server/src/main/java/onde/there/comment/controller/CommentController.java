package onde.there.comment.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import onde.there.comment.service.CommentService;
import onde.there.dto.comment.CommentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place/comment")
public class CommentController {

	private final CommentService commentService;

	@PostMapping
	@Operation(summary = "장소에 댓글 쓰기", description = "장소에 댓글 쓰기")
	public ResponseEntity<Long> createComment(
		@Parameter(required = true, content = @Content(schema = @Schema(implementation = CommentDto.CreateRequest.class)))
		@RequestBody @Valid CommentDto.CreateRequest request) {
		return ResponseEntity.ok(commentService.createComment(request).getId());
	}

	@GetMapping
	@Operation(summary = "장소 댓글 조회", description = "장소 댓글 조회")
	@ApiResponse(content = @Content(schema = @Schema(implementation = CommentDto.Response.class)))
	public ResponseEntity<List<CommentDto.Response>> getComments(
		@Parameter(description = "장소 아이디", required = true)
		@RequestParam Long placeId) {
		return ResponseEntity.ok(commentService.getComments(placeId));
	}

	@PutMapping
	@Operation(summary = "장소 댓글 수정", description = "장소 댓글 수정")
	public ResponseEntity<Long> updateComment(
		@Parameter(required = true)
		@RequestBody @Valid CommentDto.UpdateRequest request) {
		return ResponseEntity.ok(commentService.updateComment(request));
	}

	@DeleteMapping
	@Operation(summary = "장소 댓글 삭제", description = "장소 댓글 삭제")
	public ResponseEntity<Void> updateComment(
		@Parameter(description = "댓글 아이디", required = true)
		@RequestParam Long commentId) {
		commentService.deleteComment(commentId);
		return ResponseEntity.ok().build();
	}
}
