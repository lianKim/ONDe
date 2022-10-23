package onde.there.dto.journy;

import java.util.List;
import lombok.Data;

@Data
public class JourneySearchTheme {

	private String disclosure;
	private List<String> journeyTheme;
	private List<String> regionGroupList;
}
