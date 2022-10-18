package onde.there.member.exception.type;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberErrorResponse {
    private MemberErrorCode errorCode;
    private String errorMessage;
}
