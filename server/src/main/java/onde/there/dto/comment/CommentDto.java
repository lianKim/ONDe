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
	public static class CreateRequest {

		@NotNull
		private String memberId;
		@NotNull
		private Long placeId;
		@NotNull
		private String comment;

	}

	@Getter
	public static class UpdateRequest {
		@NotNull
		private Long commentId;
		@NotNull
        private String comment;
	}

	@Builder
	public static class Response{
		private String memberName;
		private Long placeId;
        private String comment;

	}
}
