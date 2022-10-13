package onde.there.dto.place;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class PlaceDto {


	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	@Builder
	public static class CreateRequest {

		private Double latitude;
		private Double longitude;

		private String title;
		private String text;

		private String addressName;
		private String region1;
		private String region2;
		private String region3;
		private String region4;

		private LocalDateTime placeTime;

		private Long journeyId;
	}
}
