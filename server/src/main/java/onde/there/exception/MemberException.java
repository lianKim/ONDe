package onde.there.exception;

import lombok.Getter;
import onde.there.exception.type.ErrorCode;


@Getter
public class MemberException extends RuntimeException{
    private ErrorCode errorCode;
    private String errorMessage;

    public MemberException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.errorMessage = errorCode.getDescription();
    }
}
