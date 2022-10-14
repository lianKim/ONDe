package onde.there.dto.journy;

import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotBlank;
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

		@NotBlank(message = "여정 시작 날짜를 입력해주세요.")
		@DateTimeFormat(iso = ISO.DATE)
		private LocalDate startDay;

		@NotBlank(message = "여정 종료 날짜를 입력해주세요.")
		@DateTimeFormat(iso = ISO.DATE)
		private LocalDate endDay;

		private String placeThumbnailUrl;

		private List<String> journeyThemeTypes;
	}

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class CreateResponse {

		private long journeyId;
		private long memberId;
		private String title;
		private LocalDate startDay;
		private LocalDate endDay;
		private String placeThumbnail;
		private String disclosure;
		private List<String> journeyThemes;

		public static JourneyDto.CreateResponse fromEntity(Journey journey,
			List<String> journeyThemes) {
			return JourneyDto.CreateResponse.builder()
				.journeyId(journey.getId())
				.memberId(journey.getMember().getId())
				.title(journey.getTitle())
				.startDay(journey.getStartDay())
				.endDay(journey.getEndDay())
				.placeThumbnail(journey.getPlaceThumbnailUrl())
				.disclosure(journey.getDisclosure())
				.journeyThemes(journeyThemes)
				.build();
		}
	}
}
