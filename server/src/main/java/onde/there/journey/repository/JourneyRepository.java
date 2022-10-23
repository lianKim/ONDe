package onde.there.journey.repository;

import java.util.List;
import onde.there.domain.Journey;
import onde.there.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Long>, JourneyRepositoryCustom{

	List<Journey> findAllByDisclosure(String disclosure);

	List<Journey> findAllByMember(Member member);
}
