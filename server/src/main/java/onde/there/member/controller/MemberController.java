package onde.there.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.member.resolver.TokenMemberId;
import onde.there.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "아이디 중복 확인", description = "아이디 중복 확인 결과를 반환 합니다.")
    @PostMapping("/check/id")
    public ResponseEntity<?> checkId(@Validated @RequestBody MemberDto.CheckIdRequest checkIdRequest) {
        MemberDto.CheckIdResponse response = new MemberDto.CheckIdResponse(memberService.checkId(checkIdRequest));
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "이메일 중복 확인", description = "이메일 중복 확인 결과를 반환 합니다.")
    @PostMapping("/check/email")
    public ResponseEntity<?> checkEmail(@Validated @RequestBody MemberDto.CheckEmailRequest checkEmailRequest) {
        MemberDto.CheckEmailResponse response = new MemberDto.CheckEmailResponse(memberService.checkEmail(checkEmailRequest));
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "회원 가입 신청", description = "회원 가입 정보를 받아서 인증 메일을 보내줍니다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Validated @RequestBody MemberDto.SignupRequest signupRequest) {
        System.out.println(signupRequest);
        Member member = memberService.sendSignupMail(signupRequest);
        MemberDto.SignupResponse response = new MemberDto.SignupResponse("인증 메일을 보냈습니다", member.getEmail());
        System.out.println(response);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "회원 가입 인증", description = "인증 메일 링크를 통해 회원가입을 완료한다.")
    @GetMapping("/signup/confirm")
    public ResponseEntity<?> createConfirm(@RequestParam("key") String key) {
        Member member = memberService.registerMember(key);
        return ResponseEntity.ok(member.getId() + "님의 회원가입이 완료 되었습니다! 로그인 후 서비스를 사용하실 수 있습니다.");
    }

    @Operation(summary = "로그인", description = "로그인")
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@Validated @RequestBody MemberDto.SigninRequest signinRequest) {
        MemberDto.SigninResponse response = memberService.signin(signinRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth")
    public ResponseEntity<?> auth(@TokenMemberId String memberId) {
        System.out.println(memberId);
        return ResponseEntity.ok(memberService.auth(memberId));
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@Validated @RequestBody MemberDto.ReissueRequest request) {
        System.out.println("controller:" + request);
        return ResponseEntity.ok(memberService.reissue(request));
    }

}
