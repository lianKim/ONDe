package onde.there.dto.journy;

import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import onde.there.domain.Journey;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Getter
@Setter
public class JourneyDto {

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class CreateRequest {

		@NotBlank(message = "이메일을 입력해주세요.")
		private String memberEmail;

		@NotBlank(message = "제목을 입력해주세요.")
		private String title;

		@DateTimeFormat(iso = ISO.DATE)
		private LocalDate startDate;

		@DateTimeFormat(iso = ISO.DATE)
		private LocalDate endDate;

		@NotNull
		@Min(1)
		private int numberOfPeople;

		@NotBlank(message = "공개범위를 선택해주세요.")
		private String disclosure;


		@NotNull
		private List<String> journeyThemes;

		@NotNull
		private List<RegionGroup> regionGroups;

		private String introductionText;

		private String placeThumbnailUrl;

	}

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class CreateResponse {

		private long journeyId;
		private String memberId;
		private String title;
		private LocalDate startDate;
		private LocalDate endDate;
		private int numberOfPeople;
		private String disclosure;
		private List<String> journeyThemes;
		private List<RegionGroup> regionGroups;
		private String introductionText;
		private String placeThumbnailUrl;


		public static JourneyDto.CreateResponse fromEntity(Journey journey,
			List<String> journeyThemes, List<RegionGroup> regionGroups) {
			return CreateResponse.builder()
				.journeyId(journey.getId())
				.memberId(journey.getMember().getId())
				.title(journey.getTitle())
				.startDate(journey.getStartDate())
				.endDate(journey.getEndDate())
				.numberOfPeople(journey.getNumberOfPeople())
				.placeThumbnailUrl(journey.getPlaceThumbnailUrl())
				.disclosure(journey.getDisclosure())
				.journeyThemes(journeyThemes)
				.introductionText(journey.getIntroductionText())
				.regionGroups(regionGroups)
				.build();
		}
	}

	@Getter
	public static class RegionGroup {

		String area;
		List<String> regions;
	}
}
