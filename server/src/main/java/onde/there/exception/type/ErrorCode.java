package onde.there.exception.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	NOT_FOUND_JOURNEY("존재하지 않는 여정입니다."),
	NOT_FOUND_PLACE("존재하지 않는 장소입니다."),
	DUPLICATED_MEMBER_EMAIL("중복된 이메일 입니다. 중복 확인을 다시 진행 해 주세요"),
	DUPLICATED_MEMBER_ID("중복된 아이디 입니다. 중복 확인을 다시 진행 해 주세요"),
	BAD_REQUEST("입력 값을 확인해 주세요!"),
	MISMATCH_PLACE_CATEGORY_TYPE("일치하는 카테고리 타입이 없습니다.");

	private final String description;
}
