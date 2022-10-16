package onde.there.exception.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	DATE_ERROR("잘못된 날짜입니다."),
	THERE_IS_NO_MATCHING_THEME("일치하는 테마가 없습니다.")
	;

	private final String description;
}
