package onde.there.member.exception.type;

import lombok.Getter;

@Getter
public class MemberException extends RuntimeException{
    private MemberErrorCode memberErrorCode;
    private String errorMessage;

    public MemberException(MemberErrorCode memberErrorCode) {
        this.memberErrorCode = memberErrorCode;
        this.errorMessage = memberErrorCode.getDescription();
    }
}
