package onde.there.image.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import onde.there.exception.ErrorResponse;
import onde.there.exception.type.ErrorCode;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageErrorResponse {
	private ImageErrorCode errorCode;
	private String errorMessage;
}
