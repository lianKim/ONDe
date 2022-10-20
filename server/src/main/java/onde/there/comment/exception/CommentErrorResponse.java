package onde.there.comment.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import onde.there.image.exception.ImageErrorCode;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentErrorResponse {
	private ImageErrorCode errorCode;
	private String errorMessage;
}