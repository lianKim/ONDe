package onde.there.member;

import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.member.repository.MemberRepository;
import onde.there.member.service.MemberService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

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
}
