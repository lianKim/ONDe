package onde.there.journey.repository;

import java.util.List;
import onde.there.domain.JourneyTheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyThemeRepository extends
	JpaRepository<JourneyTheme, Long> {
	List<JourneyTheme>findAllByJourneyId(Long journeyId);
}
