package onde.there.place.repository;

import onde.there.domain.PlaceHeartScheduling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceHeartSchedulingRepository extends JpaRepository<PlaceHeartScheduling, Long> {

	boolean existsByPlaceId(Long placeId);
}
