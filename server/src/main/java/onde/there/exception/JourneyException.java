package onde.there.exception;

import lombok.Getter;
import lombok.Setter;
import onde.there.exception.type.ErrorCode;

@Getter
@Setter
public class JourneyException extends RuntimeException{

	private ErrorCode errorCode;
	private String errorMessage;

	public JourneyException(ErrorCode errorCode) {
		this.errorCode = errorCode;
		this.errorMessage = errorCode.getDescription();
	}
}
