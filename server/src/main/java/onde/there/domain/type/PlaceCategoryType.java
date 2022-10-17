package onde.there.domain.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import onde.there.exception.PlaceException;
import onde.there.exception.type.ErrorCode;

@Getter
@RequiredArgsConstructor
public enum PlaceCategoryType {

	NATURE("자연"),
	ACCOMMODATION("숙박"),
	RESTAURANT("음식점"),
	LEISURE("레저"),
	THEME_PARK("테마파크"),
	SHOPPING("쇼핑"),
	HISTORICAL_SITE("유적지"),
	MUSEUM("박물관"),
	CONCERT("공연"),
	EXHIBITION("전시회"),
	CAMPING("캠핑"),
	KIDS("키즈"),
	ECT("기타"),
	;
	private final String description;

	public static PlaceCategoryType toPlaceCategoryType(String s) {
		switch (s) {
			case "자연":
				return PlaceCategoryType.NATURE;
			case "숙박":
				return PlaceCategoryType.ACCOMMODATION;
			case "음식점":
				return PlaceCategoryType.RESTAURANT;
			case "레저":
				return PlaceCategoryType.LEISURE;
			case "테마파크":
				return PlaceCategoryType.THEME_PARK;
			case "쇼핑":
				return PlaceCategoryType.SHOPPING;
			case "유적지":
				return PlaceCategoryType.HISTORICAL_SITE;
			case "박물관":
				return PlaceCategoryType.MUSEUM;

			case "공연":
				return PlaceCategoryType.CONCERT;
			case "전시회":
				return PlaceCategoryType.EXHIBITION;
			case "캠핑":
				return PlaceCategoryType.CAMPING;
			case "기타":
				return PlaceCategoryType.ECT;

			default:
				throw new PlaceException(ErrorCode.MISMATCH_PLACE_CATEGORY_TYPE);
		}
	}
}
