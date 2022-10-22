package onde.there.dto.journy;

import com.querydsl.core.annotations.QueryProjection;
import java.util.List;
import lombok.Data;

@Data
public class JourneyFilterDto {

	private Long journeyId;
	private String title;
	private String disclosure;
	private List<String> journeyThemeList;
	private List<String> regionGroupList;

	@QueryProjection
	public JourneyFilterDto(Long journeyId, String title, String disclosure,
		List<String> journeyThemeList, List<String> regionGroupList) {
		this.journeyId = journeyId;
		this.title = title;
		this.disclosure = disclosure;
		this.journeyThemeList = journeyThemeList;
		this.regionGroupList = regionGroupList;
	}

}
