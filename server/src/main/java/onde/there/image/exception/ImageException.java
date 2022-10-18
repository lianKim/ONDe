package onde.there.image.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import onde.there.exception.type.ErrorCode;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
public class ImageException extends RuntimeException {
	private ImageErrorCode errorCode;
	private String errorMessage;

	public ImageException(ImageErrorCode errorCode){
		this.errorCode = errorCode;
		this.errorMessage = errorCode.getDescription();
	}
}
