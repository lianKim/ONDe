package onde.there.exception;

import lombok.*;
import onde.there.exception.type.ErrorCode;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
public class PlaceException extends RuntimeException{

	private ErrorCode errorCode;
	private String errorMessage;

	public PlaceException(ErrorCode errorCode) {
		this.errorCode = errorCode;
		this.errorMessage = errorCode.getDescription();
	}


}
