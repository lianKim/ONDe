package onde.there.member;

import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.exception.MemberException;
import onde.there.exception.type.ErrorCode;
import onde.there.member.repository.MemberRepository;
import onde.there.member.service.JwtService;
import onde.there.member.service.MailService;
import onde.there.member.service.MemberService;
import onde.there.member.service.RedisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RedisService<Member> redisService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    class TestMailService extends MailService {

        public TestMailService(JavaMailSender javaMailSender) {
            super(javaMailSender);
        }

        @Override
        public void sendSignupMail(String uuid, Member member) {
            System.out.println("메일 전송 기능 잘 호출 됨");
        }
    }

    @Transactional
    @Test
    void 아이디중복_확인_성공_케이스_중복된아이디 () {
        // given
        Member member = new Member("test", "test", "test", "test");
        memberRepository.save(member);
        // when
        MemberDto.CheckIdRequest request = new MemberDto.CheckIdRequest("test");
        boolean result = memberService.checkId(request);
        // then
        assertThat(result).isFalse();
    }

    @Transactional
    @Test
    void 아이디중복_확인_성공_케이스_사용가능아이디 () {
        // given
        Member member = new Member("test", "test", "test", "test");
        memberRepository.save(member);
        // when
        MemberDto.CheckIdRequest request = new MemberDto.CheckIdRequest("newId");
        boolean result = memberService.checkId(request);
        // then
        assertThat(result).isTrue();
    }

    @Transactional
    @Test
    void 이메일중복_확인_성공_케이스_중복된아이디 () {
        // given
        Member member = new Member("test", "test", "test", "test");
        memberRepository.save(member);
        // when
        MemberDto.CheckEmailRequest request = new MemberDto.CheckEmailRequest("test");
        boolean result = memberService.checkEmail(request);
        // then
        assertThat(result).isFalse();
    }

    @Transactional
    @Test
    void 이메일중복_확인_성공_케이스_사용가능아이디 () {
        // given
        Member member = new Member("test", "test", "test", "test");
        memberRepository.save(member);
        // when
        MemberDto.CheckEmailRequest request = new MemberDto.CheckEmailRequest("newEmail");
        boolean result = memberService.checkEmail(request);
        // then
        assertThat(result).isTrue();
    }

    @Transactional
    @Test
    void 회원가입요청_성공 () {
        // given
        TestMailService testMailService = new TestMailService(new JavaMailSenderImpl());
        MemberService memberService = new MemberService(memberRepository, passwordEncoder, testMailService,redisService, jwtService);
        MemberDto.SignupRequest request = new MemberDto.SignupRequest("test","test@test.com","test", "1234");

        // when
        Member member = memberService.sendSignupMail(request);
        // then
        assertThat(member.getId()).isEqualTo(request.getId());
        assertThat(member.getName()).isEqualTo(request.getName());
        assertThat(member.getEmail()).isEqualTo(request.getEmail());
        assertThat(passwordEncoder.matches("1234", member.getPassword())).isTrue();
    }

    @Transactional
    @Test
    void 회원가입요청_실패_중복된_이메일() {
        //given
        MemberDto.SignupRequest request = new MemberDto.SignupRequest("test","test@test.com","test", "1234");
        memberRepository.save(new Member("test","test@test.com","1234","test"));
        //when
        MemberException memberException = org.junit.jupiter.api.Assertions.assertThrows(MemberException.class,
                () -> memberService.sendSignupMail(request));
        //then
        assertThat(memberException.getErrorCode()).isEqualTo(ErrorCode.DUPLICATED_MEMBER_EMAIL);
    }

    @Transactional
    @Test
    void 회원가입요청_실패_중복된_아이디() {
        //given
        MemberDto.SignupRequest request = new MemberDto.SignupRequest("test","test@test.com","test", "1234");
        memberRepository.save(new Member("test","asf@naver.com","1234","test"));
        //when
        MemberException memberException = org.junit.jupiter.api.Assertions.assertThrows(MemberException.class,
                () -> memberService.sendSignupMail(request));
        //then
        assertThat(memberException.getErrorCode()).isEqualTo(ErrorCode.DUPLICATED_MEMBER_ID);
    }

}
