package onde.there.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler(JourneyException.class)
	public ErrorResponse handleJourneyException(JourneyException e) {
		log.error("{} is occurred.", e.getErrorCode());

		return new ErrorResponse(e.getErrorCode(), e.getErrorMessage());
	}
}
