package onde.there.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class MemberDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(name = "CheckIdRequest", description = "아이디 중복 확인 요청")
    public static class CheckIdRequest {
        @NotBlank(message = "아이디를 입력 해 주세요!")
        @Schema(description = "아이디")
        private String id;

        @Override
        public String toString() {
            return "아이디 중복 확인 요청 { id: " + id + " }";
        }
    }

    @Getter
    @AllArgsConstructor
    public static class CheckIdResponse {
        @Schema(description = "중복 확인 결과")
        boolean result;

        @Override
        public String toString() {
            return "아이디 중복 확인 응답 { result: " + result + " }";
        }
    }
}
