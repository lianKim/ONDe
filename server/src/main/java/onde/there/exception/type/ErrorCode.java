package onde.there.exception.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	NOT_FOUND_JOURNEY("존재하지 않는 여정입니다."),
	NOT_FOUND_PLACE("존재하지 않는 장소입니다."),
	BAD_REQUEST("입력 값을 확인해 주세요!"),
	MISMATCH_PLACE_CATEGORY_TYPE("일치하는 카테고리 타입이 없습니다.");

	private final String description;
}
