package onde.there.journey.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum JourneyErrorCode {
	NOT_FOUND_MEMBER("존재하지 않는 유저입니다."),
	DATE_ERROR("잘못된 날짜입니다."),
	THERE_IS_NO_MATCHING_THEME("일치하는 테마가 없습니다."),
	NEED_A_DETAILED_REGION("해당 지역은 추가적인 시/도 정보가 필요합니다."),
	NO_REGION_MATCHES("일치하는 지역이 없습니다.")

	;


	private final String description;

}
