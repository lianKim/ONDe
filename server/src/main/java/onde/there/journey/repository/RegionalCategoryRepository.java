package onde.there.journey.repository;

import java.util.List;
import onde.there.domain.RegionalCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionalCategoryRepository extends
	JpaRepository<RegionalCategory, Long> {

	List<RegionalCategory> findAllByJourneyId(Long journeyId);
}
