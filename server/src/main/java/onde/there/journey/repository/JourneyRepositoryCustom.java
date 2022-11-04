package onde.there.journey.repository;

import onde.there.domain.Journey;
import onde.there.dto.journy.JourneyDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JourneyRepositoryCustom {

	Page<Journey> searchAll(JourneyDto.FilteringRequest filteringRequest, Pageable pageable);
	Page<Journey> myList(String memberId, Pageable pageable);
}
