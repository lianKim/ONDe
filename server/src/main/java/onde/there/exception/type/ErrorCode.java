package onde.there.exception.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
        CATEGORY_NOT_FOUND("존재하지 않는 카테고리입니다.");
    ;

    private final String description;
}
