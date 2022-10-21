package onde.there.place.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import onde.there.domain.Place;
import onde.there.domain.PlaceHeartScheduling;
import onde.there.place.repository.PlaceHeartRepository;
import onde.there.place.repository.PlaceHeartSchedulingRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlaceHeartSchedulingService {

	private final PlaceHeartSchedulingRepository placeHeartSchedulingRepository;
	private final PlaceHeartRepository placeHeartRepository;
	private final PlaceRepository placeRepository;

	@Scheduled(cron = "0 0 3 * * *")
	@Transactional
	public void culPlaceHeartSum() {
		List<PlaceHeartScheduling> schedules = placeHeartSchedulingRepository.findAll();

		for (PlaceHeartScheduling schedule : schedules) {
			Optional<Place> optionalPlace = placeRepository.findById(schedule.getPlace().getId());
			if (optionalPlace.isEmpty()) {
				placeHeartSchedulingRepository.deleteById(schedule.getId());
				continue;
			}
			Place place = optionalPlace.get();

			Long updatePlaceHeartSum = placeHeartRepository.countByPlaceId(place.getId());

			if (updatePlaceHeartSum != place.getPlaceHeartSum()) {
				place.setPlaceHeartSum(updatePlaceHeartSum);
				placeRepository.save(place);
			}

			placeHeartSchedulingRepository.deleteById(schedule.getId());

			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				Thread.currentThread().interrupt();
			}
		}
	}
}
