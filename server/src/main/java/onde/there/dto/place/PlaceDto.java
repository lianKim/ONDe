package onde.there.dto.place;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import onde.there.domain.Place;

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
		private String placeName;

		private LocalDateTime placeTime;

		private Long journeyId;

	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	@Builder
	public static class Response {

		private Long placeId;
		private Double latitude;
		private Double longitude;

		private String title;
		private String text;

		private String addressName;
		private String region1;
		private String region2;
		private String region3;
		private String region4;
		private String placeName;

		private LocalDateTime placeTime;
		private String placeCategory;
		private Long placeHeartSum;
		private Long journeyId;

		public static Response toResponse(Place place) {
			return Response.builder()
				.placeId(place.getId())
				.latitude(place.getLatitude())
				.longitude(place.getLongitude())
				.title(place.getTitle())
				.text(place.getText())
				.addressName(place.getAddressName())
				.region1(place.getRegion1())
				.region2(place.getRegion2())
				.region3(place.getRegion3())
				.region4(place.getRegion4())
				.placeName(place.getPlaceName())
				.placeTime(place.getPlaceTime())
				.placeCategory(place.getPlaceCategory().getDescription())
				.placeHeartSum(place.getPlaceHeartSum())
				.journeyId(place.getJourney().getId())
				.build();
		}
	}
}
