package onde.there.member.exception.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberErrorCode {
    BAD_REQUEST("입력 값을 확인해 주세요!"),
    MEMBER_NOT_FOUND("등록 되지 않은 아이디 입니다"),
    PASSWORD_MISMATCH("비밀 번호가 일치하지 않습니다"),
    DUPLICATED_MEMBER_EMAIL("중복된 이메일 입니다!"),
    DUPLICATED_MEMBER_ID("중복된 아이디 입니다!"),
    EMAIL_AUTH_REQUIRED("이메일 인증이 완료되지 않았습니다!");
    private final String description;
}
