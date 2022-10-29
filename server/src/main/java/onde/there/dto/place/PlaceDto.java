package onde.there.dto.place;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
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
@Schema
public class PlaceDto {


	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	@Builder
	@Schema(name = "장소 생성에 필요한 request파라미터")
	public static class CreateRequest {

		@NotNull
		private Double latitude;
		@NotNull
		private Double longitude;
		@NotNull
		private String title;
		private String text;
		@NotNull
		private String addressName;
		@NotNull
		private String region1;
		@NotNull
		private String region2;
		@NotNull
		private String region3;
		private String region4;
		@Past
		private LocalDateTime placeTime;
		@NotNull
		private Long journeyId;

		private String placeCategory;
		private String placeName;

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
				.placeCategory(PlaceCategoryType.toPlaceCategoryType(this.placeCategory))
				.placeName(this.placeName)
				.build();
		}
	}
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	@Builder
	@Schema(name = "장소 업데이트에 필요한 request 파라미터")
	public static class UpdateRequest {

		@NotNull
		private Long placeId;
		@NotNull
		private Double latitude;
		@NotNull
		private Double longitude;
		@NotNull
		private String title;
		private String text;
		@NotNull
		private String addressName;
		@NotNull
		private String region1;
		@NotNull
		private String region2;
		@NotNull
		private String region3;
		private String region4;
		@Past
		private LocalDateTime placeTime;
		@NotNull
		private Long journeyId;
		private String placeCategory;
		private String placeName;
		public Place toEntity() {
			return Place.builder()
				.id(this.getPlaceId())
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
				.placeCategory(PlaceCategoryType.toPlaceCategoryType(this.placeCategory))
				.placeName(this.placeName)
				.build();
		}
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	@Builder
	@Schema(name = "장소 조회시 반환되는 response")
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

		private List<String> imageUrls = new ArrayList<>();

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
				.placeName(place.getPlaceName())
				.placeHeartSum(place.getPlaceHeartCount())
				.journeyId(place.getJourney().getId())
				.imageUrls(new ArrayList<>())
				.build();
		}

		public static List<Response> toResponse(List<Place> list) {
			return list.stream().map(Response::toResponse).collect(Collectors.toList());
		}
	}
}
