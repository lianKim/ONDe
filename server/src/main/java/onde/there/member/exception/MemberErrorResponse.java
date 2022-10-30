package onde.there.member.exception;

import lombok.*;
import onde.there.member.exception.type.MemberErrorCode;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberErrorResponse {
    private MemberErrorCode errorCode;
    private String errorMessage;
}
