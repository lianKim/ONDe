package onde.there.member.service;

import lombok.RequiredArgsConstructor;
import onde.there.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
}
