package onde.there.member.exception;

import lombok.Getter;
import lombok.ToString;
import onde.there.member.exception.type.MemberErrorCode;

@ToString
@Getter
public class MemberException extends RuntimeException{
    private MemberErrorCode memberErrorCode;
    private String errorMessage;

    public MemberException(MemberErrorCode memberErrorCode) {
        this.memberErrorCode = memberErrorCode;
        this.errorMessage = memberErrorCode.getDescription();
    }
}
