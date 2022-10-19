package onde.there.place.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import onde.there.domain.Member;
import onde.there.domain.Place;
import onde.there.domain.PlaceHeartScheduling;
import onde.there.member.repository.MemberRepository;
import onde.there.place.repository.PlaceHeartSchedulingRepository;
import onde.there.place.repository.PlaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional
class PlaceHeartSchedulingServiceTest {

	@Autowired
	private PlaceHeartSchedulingRepository placeHeartSchedulingRepository;
	@Autowired
	private PlaceRepository placeRepository;
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private PlaceHeartSchedulingService placeHeartSchedulingService;
	@Autowired
	private PlaceHeartService placeHeartService;


	@DisplayName("01_00. scheduling method success")
	@Test
	public void test_01_00() {
		//given
		List<Long> placeIds = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			Place savePlace = placeRepository.save(Place.builder()
				.placeHeartSum(1000 * i)
				.build());

			Member saveMember = new Member();
			saveMember.setId("testMember" + i);
			memberRepository.save(saveMember);

			for (int j = 0; j < i; j++) {
				String memberId = "testMember" + (j + 1);
				placeHeartService.heart(savePlace.getId(), memberId);
			}
			placeIds.add(savePlace.getId());
		}

		//when
		placeHeartSchedulingService.culPlaceHeartSum();

		//then
		for (int i = 0; i < placeIds.size(); i++) {
			Place place = placeRepository.findById(placeIds.get(i)).orElseThrow();
			assertEquals(place.getPlaceHeartSum(), i + 1);
		}
	}

	@DisplayName("01_01. scheduling method success null scheduling ")
	@Test
	public void test_01_01() {
		//given
		List<Long> placeIds = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			Place savePlace = placeRepository.save(Place.builder()
				.placeHeartSum(1000 * i)
				.build());

			Member saveMember = new Member();
			saveMember.setId("testMember" + i);
			memberRepository.save(saveMember);

			placeIds.add(savePlace.getId());
		}

		//when
		placeHeartSchedulingService.culPlaceHeartSum();

		//then
		for (int i = 0; i < placeIds.size(); i++) {
			Place place = placeRepository.findById(placeIds.get(i)).orElseThrow();
			assertEquals(place.getPlaceHeartSum(), 1000L * (i + 1));
		}
	}

	@DisplayName("01_02. scheduling method fail found place but not throw not")
	@Test
	public void test_01_02() {
		//given
		Place willDelete = placeRepository.save(Place.builder().build());
		placeHeartSchedulingRepository.save(PlaceHeartScheduling.builder()
			.place(willDelete)
			.build());

		placeRepository.deleteById(willDelete.getId());

		//when
		placeHeartSchedulingService.culPlaceHeartSum();

		//then
		List<PlaceHeartScheduling> all = placeHeartSchedulingRepository.findAll();
		assertEquals(all.size(), 0);
	}
}