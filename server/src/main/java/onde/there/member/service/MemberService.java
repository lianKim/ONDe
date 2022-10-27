package onde.there.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.member.exception.type.MemberErrorCode;
import onde.there.member.exception.type.MemberException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.concurrent.TimeUnit;
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {

    private final onde.there.member.repository.MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final RedisService<Member> memberRedisService;
    private final RedisService<String> tokenRedisService;
    private final JwtService jwtService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public boolean checkId(MemberDto.CheckIdRequest checkIdRequest) {
        return !memberRepository.existsById(checkIdRequest.getId());
    }

    public boolean checkEmail(MemberDto.CheckEmailRequest checkEmailRequest) {
        return !memberRepository.existsByEmail(checkEmailRequest.getEmail());
    }

    public Member sendSignupMail(MemberDto.SignupRequest signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new MemberException(MemberErrorCode.DUPLICATED_MEMBER_EMAIL);
        }

        if (memberRepository.existsById(signupRequest.getId())) {
            throw new MemberException(MemberErrorCode.DUPLICATED_MEMBER_ID);
        }

        String uuid = UUID.randomUUID().toString();
        String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());
        Member member = Member.from(signupRequest, encodedPassword);
        mailService.sendSignupMail(uuid, member);
        memberRedisService.set(uuid, member, 10, TimeUnit.MINUTES);
        return member;
    }

    @Transactional
    public Member registerMember(String key) {
        Member member = memberRedisService.get(key)
                .orElseThrow(() -> new MemberException(MemberErrorCode.SIGNUP_CONFIRM_TIMEOUT));
        memberRedisService.delete(key);
        memberRepository.save(member);
        return member;
    }

    public MemberDto.SigninResponse signin(MemberDto.SigninRequest signinRequest) {
        memberRepository.findById(signinRequest.getId())
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND));

        UsernamePasswordAuthenticationToken authenticationToken = signinRequest.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        MemberDto.SigninResponse signinResponse = jwtService.generateToken(authentication);
        tokenRedisService.set("RT:"+ authentication.getName(),
                                    signinResponse.getRefreshToken(),
                                    signinResponse.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return signinResponse;
    }

    public MemberDto.AuthResponse auth(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND));
        return MemberDto.AuthResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }

    public void oAuthUserSignup(Member member) {
        memberRepository.save(member);
    }
}
