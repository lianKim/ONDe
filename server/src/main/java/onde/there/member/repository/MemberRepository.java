package onde.there.member.repository;

import java.util.List;
import java.util.Optional;
import onde.there.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {

	Optional<Member> findByEmail(String memberEmail);
}
