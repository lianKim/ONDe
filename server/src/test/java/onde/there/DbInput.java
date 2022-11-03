package onde.there;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import onde.there.comment.repository.CommentRepository;
import onde.there.domain.Comment;
import onde.there.domain.Journey;
import onde.there.domain.JourneyTheme;
import onde.there.domain.Member;
import onde.there.domain.Place;
import onde.there.domain.PlaceHeart;
import onde.there.domain.PlaceImage;
import onde.there.domain.type.JourneyThemeType;
import onde.there.domain.type.PlaceCategoryType;
import onde.there.domain.type.RegionType;
import onde.there.dto.place.PlaceDto.Response;
import onde.there.journey.repository.JourneyRepository;
import onde.there.journey.repository.JourneyThemeRepository;
import onde.there.member.repository.MemberRepository;
import onde.there.place.repository.PlaceHeartRepository;
import onde.there.place.repository.PlaceImageRepository;
import onde.there.place.repository.PlaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class DbInput {

	@Autowired
	private JourneyRepository journeyRepository;

	@Autowired
	private JourneyThemeRepository journeyThemeRepository;

	@Autowired
	private PlaceRepository placeRepository;

	@Autowired
	private PlaceHeartRepository placeHeartRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private PlaceImageRepository placeImageRepository;

	@Autowired
	private MemberRepository memberRepository;


	@DisplayName("01_00. 여행 - (테마, 장소(장소 좋아요, 댓글, 장소 이미지))")
	@Test
	public void test_01_00() {
		int journeyNum = 10;            // total count
		int journeyThemeNum = 1;        // journey * journeyThemeNum
		int placeNum = 2;                // journey * placeNum
		int placeHeartCommentImage = 1; // journey * placeNum * placeHeartCommentImage

		Member saveMember = memberRepository.save(
			new Member("member Id", "memeber@com.com", "1234", "memberName"));

		for (int i = 0; i < journeyNum; i++) {
			Journey saveJourney = journeyRepository.save(Journey.builder()
				.title("test journey" + i)
				.startDate(LocalDate.now().minusDays(1))
				.endDate(LocalDate.now())
				.journeyThumbnailUrl("journeyThumbnailUrl Test")
				.disclosure("public")
				.introductionText("introductionText test")
				.numberOfPeople(i)
				.region(RegionType.BUSAN)
				.member(saveMember)
				.build());

			for (int j = 0; j < journeyThemeNum; j++) {
				if (i == 1) {
					journeyThemeRepository.save(JourneyTheme.builder()
						.journey(saveJourney)
						.journeyThemeName(JourneyThemeType.CULTURE)
						.build());
				} else {
					journeyThemeRepository.save(JourneyTheme.builder()
						.journey(saveJourney)
						.journeyThemeName(JourneyThemeType.ECT)
						.build());
				}
			}

			for (int j = 0; j < placeNum; j++) {
				Place savePlace = placeRepository.save(Place.builder()
					.latitude(1.0)
					.longitude(1.0)
					.title("장소 = " + (i * 2 + j))
					.text("place title test    여정 = " + i + " 장소 = " + (i * 2 + j))
					.addressName("addressName test")
					.region1("region1")
					.region2("region2")
					.region3("region3")
					.region4("region4")
					.placeCategory(PlaceCategoryType.ECT)
					.placeName("place name test" + (i * 2 + j))
					.placeTime(LocalDateTime.now())
					.journey(saveJourney)
					.placeHeartCount(1)
					.build());

				for (int k = 0; k < placeHeartCommentImage; k++) {
					placeHeartRepository.save(PlaceHeart.builder()
						.place(savePlace)
						.member(saveMember)
						.build());

					commentRepository.save(Comment.builder()
						.member(saveMember)
						.place(savePlace)
						.comment("comment test " + k + "장소 = " + (i * 2 + j))
						.build());

					placeImageRepository.save(PlaceImage.builder()
						.place(savePlace)
						.imageUrl("image url" + k + "장소 = " + (i * 2 + j))
						.build());
				}
			}
		}
	}

	@DisplayName("02_00. ")
	@Test
	public void test_02_00() {
		//given
		Place place = placeRepository.findById(1L).orElseThrow(null);
		List<PlaceImage> placeImages = place.getPlaceImages();
		Response response = Response.toResponse(place);
		response.setImageUrls(
			placeImages.stream().map((PlaceImage::getUrl)).collect(Collectors.toList()));

		System.out.println(response);
		//when
		//then
	}
}