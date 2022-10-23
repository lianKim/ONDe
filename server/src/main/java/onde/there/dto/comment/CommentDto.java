package onde.there.dto.comment;

import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import onde.there.domain.Comment;

@Getter
@Setter
public class CommentDto {
	@Getter
	@Builder
	public static class CreateRequest {

		@NotNull
		private String memberId;
		@NotNull
		private Long placeId;
		@NotNull
		private String comment;

	}

	@Getter
	@Builder
	public static class UpdateRequest {
		@NotNull
		private Long commentId;
		@NotNull
        private String comment;
	}

	@Builder
	@Getter
	public static class Response{
		private Long commentId;
		private String memberName;
		private Long placeId;
        private String comment;
	}
}
