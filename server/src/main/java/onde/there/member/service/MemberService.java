package onde.there.member.service;

import lombok.RequiredArgsConstructor;
import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.exception.MemberException;
import onde.there.exception.type.ErrorCode;
import onde.there.member.repository.MemberRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final RedisService<Member> redisService;


    public boolean checkId(MemberDto.CheckIdRequest checkIdRequest) {
        return !memberRepository.existsById(checkIdRequest.getId());
    }

    public boolean checkEmail(MemberDto.CheckEmailRequest checkEmailRequest) {
        return !memberRepository.existsByEmail(checkEmailRequest.getEmail());
    }

    public void sendSignupMail(MemberDto.SignupRequest signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new MemberException(ErrorCode.DUPLICATED_MEMBER_EMAIL);
        }

        if (memberRepository.existsById(signupRequest.getId())) {
            throw new MemberException(ErrorCode.DUPLICATED_MEMBER_ID);
        }

        String uuid = UUID.randomUUID().toString();
        String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());
        Member member = Member.from(signupRequest, encodedPassword);
        mailService.sendSignupMail(uuid, member);
        redisService.set(uuid, member, 10);
    }
}
