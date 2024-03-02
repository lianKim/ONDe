package onde.there.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.image.service.AwsS3Service;
import onde.there.member.exception.type.MemberErrorCode;
import onde.there.member.exception.MemberException;
import onde.there.member.security.jwt.JwtService;
import onde.there.member.type.TokenType;
import onde.there.member.utils.MailService;
import onde.there.member.utils.RedisService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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
    private final AwsS3Service awsS3Service;

    public boolean checkId(MemberDto.CheckIdRequest checkIdRequest) {
        return !memberRepository.existsById(checkIdRequest.getId());
    }

    public boolean checkEmail(MemberDto.CheckEmailRequest checkEmailRequest) {
        return !memberRepository.existsByEmail(checkEmailRequest.getEmail());
    }

    public Member sendSignupMail(MemberDto.SignupRequest signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            MemberException memberException = new MemberException(MemberErrorCode.DUPLICATED_MEMBER_EMAIL);

            log.error("memberService.sendSignupMail Error");
            log.error("request => {}", signupRequest);
            log.error("exception => {}", memberException.toString());

            throw memberException;
        }

        if (memberRepository.existsById(signupRequest.getId())) {
            MemberException memberException = new MemberException(MemberErrorCode.DUPLICATED_MEMBER_ID);

            log.error("memberService.sendSignupMail Error");
            log.error("request => {}", signupRequest);
            log.error("exception => {}", memberException.toString());

            throw memberException;
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
                .orElseThrow(() -> {
                    MemberException memberException = new MemberException(MemberErrorCode.SIGNUP_CONFIRM_TIMEOUT);
                    log.error("memberService.registerMember Error");
                    log.error("request key => {}", key);
                    log.error("exception => {}", memberException.toString());
                    return memberException;
                });
        memberRedisService.delete(key);
        memberRepository.save(member);
        return member;
    }

    public MemberDto.SigninResponse signin(MemberDto.SigninRequest signinRequest) {
        memberRepository.findById(signinRequest.getId())
                .orElseThrow(() -> {
                    MemberException memberException = new MemberException(MemberErrorCode.MEMBER_NOT_FOUND);
                    log.error("memberService.signin Error");
                    log.error("request => {}", signinRequest);
                    log.error("exception => {}", memberException.toString());
                    return memberException;
                });

        UsernamePasswordAuthenticationToken authenticationToken = signinRequest.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        MemberDto.SigninResponse signinResponse = jwtService.generateToken(authentication);
        tokenRedisService.set("RT:"+ authentication.getName(),
                                    signinResponse.getRefreshToken(),
                                    signinResponse.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return signinResponse;
    }

    public MemberDto.AuthResponse auth(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> {
                    MemberException memberException = new MemberException(MemberErrorCode.MEMBER_NOT_FOUND);
                    log.error("memberService.auth Error");
                    log.error("request id => {}", memberId);
                    log.error("exception => {}", memberException.toString());
                    return memberException;
                });

        return MemberDto.AuthResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .nickName(member.getNickName())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }

    public MemberDto.SigninResponse reissue(MemberDto.ReissueRequest request) {
        jwtService.validateToken(request.getRefreshToken(), TokenType.REFRESH);
        Authentication authentication = jwtService.getAuthentication(request.getAccessToken());
        String refreshToken = tokenRedisService.get("RT:"+authentication.getName())
                .orElseThrow(() -> {
                    MemberException memberException = new MemberException(MemberErrorCode.INVALID_REFRESH_TOKEN);
                    log.error("memberService.reissue Error");
                    log.error("request => {}", request);
                    log.error("exception => {}", memberException.toString());
                    return memberException;
                });

        if (!refreshToken.equals(request.getRefreshToken())) {
            throw new MemberException(MemberErrorCode.INVALID_REFRESH_TOKEN);
        }

        MemberDto.SigninResponse signinResponse = jwtService.generateToken(authentication);
        tokenRedisService.set("RT:"+ authentication.getName(),
                signinResponse.getRefreshToken(),
                signinResponse.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return signinResponse;
    }

    @Transactional
    public Member update(MultipartFile multipartFile, MemberDto.UpdateRequest updateRequest) {
        Member member = memberRepository.findById(updateRequest.getId())
                .orElseThrow(() -> {
                    MemberException memberException = new MemberException(MemberErrorCode.MEMBER_NOT_FOUND);
                    log.error("memberService.update Error");
                    log.error("request id => {}", updateRequest);
                    log.error("exception => {}", memberException.toString());
                    return memberException;
                });


        String profileUrl = null;
        if (multipartFile.isEmpty()) {
            profileUrl = member.getProfileImageUrl();
        } else {
            profileUrl = awsS3Service.uploadFiles(List.of(multipartFile)).get(0);
        }

        String encodedPassword = null;

        if (updateRequest.getPassword().equals("")) {
            encodedPassword = member.getPassword();
        } else {
            encodedPassword= passwordEncoder.encode(updateRequest.getPassword());
        }

        member.update(updateRequest, encodedPassword, profileUrl);
        return member;
    }
}
