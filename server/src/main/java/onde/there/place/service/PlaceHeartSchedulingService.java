package onde.there.place.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import onde.there.domain.Place;
import onde.there.domain.PlaceHeartScheduling;
import onde.there.place.repository.PlaceHeartRepository;
import onde.there.place.repository.PlaceHeartSchedulingRepository;
import onde.there.place.repository.PlaceRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaceHeartSchedulingService {

	private final PlaceHeartSchedulingRepository placeHeartSchedulingRepository;
	private final PlaceHeartRepository placeHeartRepository;
	private final PlaceRepository placeRepository;

	@Scheduled(cron = "0 0 3 * * *")
	@Transactional
	public void culPlaceHeartSum() {
		log.info("장소 스케줄링 시작!");
		List<PlaceHeartScheduling> schedules = placeHeartSchedulingRepository.findAll();

		for (PlaceHeartScheduling schedule : schedules) {
			log.info("장소 좋아요 스케쥴링 시작! (장소 아이디 : " + schedule.getPlace().getId() + ")");
			Optional<Place> optionalPlace = placeRepository.findById(schedule.getPlace().getId());
			if (optionalPlace.isEmpty()) {
				placeHeartSchedulingRepository.deleteById(schedule.getId());
				log.info("장소 스케줄링 좋아요 업데이트 실패! (존재하지 않는 장소 아이디 " + schedule.getPlace().getId() + ")");
				continue;
			}
			Place place = optionalPlace.get();

			Long updatePlaceHeartSum = placeHeartRepository.countByPlaceId(place.getId());

			if (updatePlaceHeartSum != place.getPlaceHeartCount()) {
				log.info("장소 좋아요 갯수 업데이트 시작! (업데이트 전 좋아요 갯수 : " + place.getPlaceHeartCount() + ")");
				place.setPlaceHeartCount(updatePlaceHeartSum);
				placeRepository.save(place);
				log.info("장소 좋아요 갯수 업데이트 완료! (업데이트 후 좋아요 갯수 : " + place.getPlaceHeartCount() + ")");
			}

			placeHeartSchedulingRepository.deleteById(schedule.getId());

			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				Thread.currentThread().interrupt();
			}
			log.info("장소 좋아요 스케쥴링 완료! (장소 아이디 : " + schedule.getPlace().getId() + ")");
		}
	}
}
