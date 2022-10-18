package onde.there.journey.repository;

import onde.there.domain.JourneyTheme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JourneyThemeRepository extends
	JpaRepository<JourneyTheme, Long> {

}
