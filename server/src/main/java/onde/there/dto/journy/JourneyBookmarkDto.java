package onde.there.dto.journy;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import onde.there.domain.Journey;
import onde.there.dto.journy.JourneyDto.JourneyListResponse;

public class JourneyBookmarkDto {

	@Schema(name = "북마크(찜) 추가 요청")
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class CreateRequest{

		@NotNull
		private String memberId;

		@NotNull
		private Long journeyId;

		@Builder
		public CreateRequest(String memberId, Long journeyId) {
			this.memberId = memberId;
			this.journeyId = journeyId;
		}
	}

	@Schema(name = "북마크(찜) 조회 결과")
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	@Builder
	public static class JourneyBookmarkListResponse {

		private Long journeyId;
		private Long journeyBookmarkId;
		private String memberId;
		private String title;
		private LocalDate startDate;
		private LocalDate endDate;
		private int numberOfPeople;
		private String disclosure;
		private List<String> journeyThemes;
		private String introductionText;
		private String region;
		private String journeyThumbnailUrl;

		public static JourneyBookmarkDto.JourneyBookmarkListResponse fromEntity(Journey journey,
			List<String> journeyThemes, Long journeyBookmarkId) {
			return JourneyBookmarkDto.JourneyBookmarkListResponse.builder()
				.journeyId(journey.getId())
				.journeyBookmarkId(journeyBookmarkId)
				.memberId(journey.getMember().getId())
				.title(journey.getTitle())
				.startDate(journey.getStartDate())
				.endDate(journey.getEndDate())
				.numberOfPeople(journey.getNumberOfPeople())
				.disclosure(journey.getDisclosure())
				.journeyThemes(journeyThemes.isEmpty() ? Collections.singletonList("null") : journeyThemes)
				.introductionText(journey.getIntroductionText())
				.region(journey.getRegion().getRegionName())
				.journeyThumbnailUrl(journey.getJourneyThumbnailUrl())
				.build();
		}

	}
}
