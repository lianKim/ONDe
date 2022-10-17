package onde.there.place.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import onde.there.exception.type.ErrorCode;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceException extends RuntimeException {
	private ErrorCode errorCode;
	private String errorMessage;
	public PlaceException(ErrorCode errorCode){
		this.errorCode = errorCode;
		this.errorMessage = errorCode.getDescription();
	}
}