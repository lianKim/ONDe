package onde.there.dto.journy;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import onde.there.domain.Journey;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JourneyDto {

	private long journeyId;
	private long memberId;
	private String title;
	private LocalDate startDay;
	private LocalDate endDay;
	private String placeThumbnail;
	private String disclosure;

	public static JourneyDto fromEntity(Journey journey) {
		return JourneyDto.builder()
			.journeyId(journey.getId())
			.memberId(journey.getMember().getId())
			.title(journey.getTitle())
			.startDay(journey.getStartDay())
			.endDay(journey.getEndDay())
			.placeThumbnail(journey.getPlaceThumbnail())
			.disclosure(journey.getDisclosure())
			.build();
	}
}
