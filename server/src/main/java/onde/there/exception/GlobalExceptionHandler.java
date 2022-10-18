package onde.there.exception;

import onde.there.member.exception.type.MemberErrorResponse;
import onde.there.member.exception.type.MemberException;
import org.springframework.http.ResponseEntity;
import onde.there.exception.type.ErrorCode;
import onde.there.image.exception.ImageErrorResponse;
import onde.there.image.exception.ImageException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException e) {
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.BAD_REQUEST,
                                                        e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.BAD_REQUEST, "Request Body가 비어 있습니다");
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(MemberException.class)
    public ResponseEntity<?> handleMemberException(MemberException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getErrorCode(), e.getErrorMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }

  @ExceptionHandler(PlaceException.class)
	public ResponseEntity<?> handlerPlaceException(PlaceException e) {

		return ResponseEntity.badRequest()
			.body(ErrorResponse.builder()
				.errorCode(e.getErrorCode())
				.errorMessage(e.getErrorMessage())
				.build());
	}

	@ExceptionHandler(ImageException.class)
	public ResponseEntity<?> handlerPlaceException(ImageException e) {

		return ResponseEntity.badRequest()
			.body(ImageErrorResponse.builder()
				.errorCode(e.getErrorCode())
				.errorMessage(e.getErrorMessage())
				.build());
  }
	@ExceptionHandler(JourneyException.class)
	public ResponseEntity<?> handleJourneyException(JourneyException e) {
		log.error("{} is occurred.", e.getErrorCode());

		return ResponseEntity.badRequest()
			.body(new ErrorResponse(e.getErrorCode(), e.getErrorMessage()));
	}
}
