package onde.there.journey.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JourneyErrorResponse {

	private JourneyErrorCode errorCode;
	private String errorMessage;
}
