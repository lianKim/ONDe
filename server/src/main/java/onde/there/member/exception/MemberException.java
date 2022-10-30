package onde.there.member.exception;

import lombok.Getter;
import onde.there.member.exception.type.MemberErrorCode;

@Getter
public class MemberException extends RuntimeException{
    private MemberErrorCode memberErrorCode;
    private String errorMessage;

    public MemberException(MemberErrorCode memberErrorCode) {
        this.memberErrorCode = memberErrorCode;
        this.errorMessage = memberErrorCode.getDescription();
    }
}
