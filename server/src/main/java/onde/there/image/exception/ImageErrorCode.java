package onde.there.image.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import onde.there.exception.type.ErrorCode;

@Getter
@AllArgsConstructor
public enum ImageErrorCode {
	EMPTY_FILE("빈 파일입니다."),
	FAILED_UPLOAD("이미지 업로드에 실패했습니다."),
	NOT_IMAGE_EXTENSION("이미지 파일이 아닙니다."),
	INVALID_FORMAT_FILE("잘못된 형식의 파일입니다."),
	NOT_FOUND_PLACE("존재하지 않는 장소입니다.");

	private final String description;
}
