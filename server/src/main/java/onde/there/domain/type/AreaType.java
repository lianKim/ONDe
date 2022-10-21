package onde.there.domain.type;

import java.util.Arrays;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import onde.there.journey.exception.JourneyErrorCode;
import onde.there.journey.exception.JourneyException;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public enum AreaType {
	METROPOLITAN_CITY("광역시",
		Arrays.asList("서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시",
			"울산광역시", "세종특별자치시", "제주특별자치도")),
	DO("도", Arrays.asList("경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도",
		"경상남도"));


	private String title;
	private List<String> areaList;

	public static AreaType findByAreaType(String inputArea) {
		return Arrays.stream(AreaType.values())
			.filter(areaType -> areaType.hasArea(inputArea))
			.findAny()
			.orElseThrow(
				() -> new JourneyException(JourneyErrorCode.NO_AREA_MATCHES));

	}

	public boolean hasArea(String inputArea) {
		return areaList.stream()
			.anyMatch(area -> area.equals(inputArea));
	}
}
