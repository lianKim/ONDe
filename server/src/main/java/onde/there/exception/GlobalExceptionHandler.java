package onde.there.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(PlaceException.class)
	public ResponseEntity<?> handlerPlaceException(PlaceException e) {

		return ResponseEntity.badRequest()
			.body(ErrorResponse.builder()
				.errorCode(e.getErrorCode())
				.errorMessage(e.getErrorMessage())
				.build());
	}

}
