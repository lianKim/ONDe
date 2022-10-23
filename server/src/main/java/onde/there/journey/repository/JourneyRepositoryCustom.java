package onde.there.journey.repository;

import java.util.List;
import onde.there.domain.Journey;
import onde.there.dto.journy.JourneySearchTheme;

public interface JourneyRepositoryCustom {

	List<Journey> searchAll(JourneySearchTheme journeySearchTheme);
}
