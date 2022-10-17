package onde.there.member.service;

import lombok.RequiredArgsConstructor;
import onde.there.exception.MemberException;
import onde.there.exception.type.ErrorCode;
import onde.there.member.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        return memberRepository.findById(id).orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));
    }
}
