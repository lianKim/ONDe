package onde.there.exception;

import javax.security.auth.login.AccountException;
import lombok.extern.slf4j.Slf4j;
import onde.there.place.exception.PlaceException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(PlaceException.class)
	public ErrorResponse handleAccountException(PlaceException e) {
		log.error("{} is occurred.", e.getErrorCode());
		return new ErrorResponse(e.getErrorCode(), e.getErrorMessage());
	}
}
