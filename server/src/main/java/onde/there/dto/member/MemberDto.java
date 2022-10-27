package onde.there.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import onde.there.domain.Member;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.Email;
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

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(name = "CheckEmailRequest", description = "이메일 중복 확인 요청")
    public static class CheckEmailRequest {
        @Email(message = "이메일 형식으로 입력 해 주세요!")
        @NotBlank(message = "이메일 값을 입력 해 주세요!")
        @Schema(description = "이메일")
        private String email;

        @Override
        public String toString() {
            return "이메일 중복 확인 요청 { email: " + email + " }";
        }
    }

    @Getter
    @AllArgsConstructor
    public static class CheckEmailResponse {
        @Schema(description = "중복 확인 결과")
        boolean result;

        @Override
        public String toString() {
            return "이메일 중복 확인 응답 { result: " + result + " }";
        }
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(name = "SignupRequest", description = "회원 가입 요청 요청")
    public static class SignupRequest {
        @NotBlank(message = "아이디 값을 입력 해 주세요!")
        @Schema(description = "아이디")
        private String id;

        @Email(message = "이메일 형식으로 입력 해 주세요!")
        @NotBlank(message = "이메일 값을 입력 해 주세요!")
        @Schema(description = "이메일")
        private String email;

        @NotBlank(message = "이름을 입력 해 주세요!")
        @Schema(description = "이름")
        private String name;

        @NotBlank(message = "비밀번호를 입력 해 주세요!")
        @Schema(description = "비밀번호")
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class SignupResponse {
        private String message;
        private String email;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignupConfirmResponse {
        private String id;
        private String email;
        private String name;

        public static SignupConfirmResponse from(Member member) {
            SignupConfirmResponse response = new SignupConfirmResponse();
            response.id = member.getId();
            response.email = member.getEmail();
            response.name = member.getName();
            return response;
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(name = "SigninRequest", description = "로그인 요청")
    public static class SigninRequest {
        @NotBlank(message = "아이디 값을 입력 해 주세요!")
        private String id;
        @NotBlank(message = "비밀번호를 입력 해 주세요!")
        private String password;

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(id, password);
        }
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(name = "signinResponse", description = "로그인 응답")
    public static class SigninResponse {
        @Schema(description = "Bearer")
        private String grantType;
        @Schema(description = "access 토큰")
        private String accessToken;
        @Schema(description = "refresh 토큰")
        private String refreshToken;
        @Schema(description = "토큰 만료 시간")
        private Long refreshTokenExpirationTime;
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(name = "AuthResponse", description = "인증 응답")
    public static class AuthResponse {
        @Schema(description = "아이디")
        private String id;
        @Schema(description = "이메일")
        private String email;
        @Schema(description = "이름")
        private String name;
        @Schema(description = "프로필 이미지 경로")
        private String profileImageUrl;
    }

    @Getter
    @Setter
    public static class ReissueRequest {
        @NotBlank(message = "accessToken 을 입력해주세요.")
        private String accessToken;

        @NotBlank(message = "refreshToken 을 입력해주세요.")
        private String refreshToken;
    }
}
