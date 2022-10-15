package onde.there.dto.journy;

import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import onde.there.domain.Journey;
import onde.there.domain.type.JourneyThemeType;
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
		private LocalDate startDay;

		@DateTimeFormat(iso = ISO.DATE)
		private LocalDate endDay;

		@NotBlank(message = "공개범위를 선택해주세요.")
		private String disclosure;

		private String placeThumbnailUrl;

		private List<String> journeyThemes;

		private String introductionText;
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
		private LocalDate startDay;
		private LocalDate endDay;
		private String placeThumbnailUrl;
		private String disclosure;
		private List<String> journeyThemes;
		private String introductionText;

		public static JourneyDto.CreateResponse fromEntity(Journey journey,
			List<String> journeyThemes) {
			return JourneyDto.CreateResponse.builder()
				.journeyId(journey.getId())
				.memberId(journey.getMember().getId())
				.title(journey.getTitle())
				.startDay(journey.getStartDay())
				.endDay(journey.getEndDay())
				.placeThumbnailUrl(journey.getPlaceThumbnailUrl())
				.disclosure(journey.getDisclosure())
				.journeyThemes(journeyThemes)
				.introductionText(journey.getIntroductionText())
				.build();
		}
	}
}
