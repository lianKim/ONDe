package onde.there.dto.place;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import onde.there.domain.Place;
import onde.there.domain.type.PlaceCategoryType;

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
		private String placeCategory;

		public Place toEntity() {
			return Place.builder()
				.latitude(this.latitude)
				.longitude(this.longitude)
                .title(this.title)
				.text(this.text)
               	.addressName(this.addressName)
				.region1(this.region1)
				.region2(this.region2)
				.region3(this.region3)
				.region4(this.region4)
				.placeTime(this.placeTime)
				.placeCategoryType(PlaceCategoryType.valueOf(this.placeCategory))
        		.build();
		}
	}
}
