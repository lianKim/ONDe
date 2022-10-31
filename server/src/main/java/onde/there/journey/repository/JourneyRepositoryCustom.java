package onde.there.journey.repository;

import java.util.List;
import onde.there.domain.Journey;
import onde.there.dto.journy.JourneyDto;

public interface JourneyRepositoryCustom {

	List<Journey> searchAll(JourneyDto.FilteringRequest filteringRequest);
}
