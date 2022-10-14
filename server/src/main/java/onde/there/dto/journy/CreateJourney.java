package onde.there.dto.journy;

import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public class CreateJourney {

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Request {

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
	}

	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Response {

		private long journeyId;
		private long memberId;
		private String title;
		private LocalDate startDay;
		private LocalDate endDay;
		private String placeThumbnail;
		private String disclosure;

		public static Response from(JourneyDto journeyDto) {
			return Response.builder()
				.journeyId(journeyDto.getJourneyId())
				.memberId(journeyDto.getMemberId())
				.title(journeyDto.getTitle())
				.startDay(journeyDto.getStartDay())
				.endDay(journeyDto.getEndDay())
				.placeThumbnail(journeyDto.getPlaceThumbnail())
				.disclosure(journeyDto.getDisclosure())
				.build();
		}
	}
}
