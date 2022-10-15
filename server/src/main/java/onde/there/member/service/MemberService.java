package onde.there.member.service;

import lombok.RequiredArgsConstructor;
import onde.there.dto.member.MemberDto;
import onde.there.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public boolean checkId(MemberDto.CheckIdRequest checkIdRequest) {
        return !memberRepository.existsById(checkIdRequest.getId());
    }
}
