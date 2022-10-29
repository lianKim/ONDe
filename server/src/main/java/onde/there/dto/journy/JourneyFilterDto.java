package onde.there.dto.journy;

import com.querydsl.core.annotations.QueryProjection;
import java.util.List;
import lombok.Data;

@Data
public class JourneyFilterDto {

	private Long journeyId;
	private String memberId;
	private String title;
	private String disclosure;
	private String region;
	private String journeyThumbnailUrl;
	private List<String> journeyThemes;

	@QueryProjection
	public JourneyFilterDto(Long journeyId, String title, String disclosure,
		List<String> journeyThemes, String region, String journeyThumbnailUrl,
		String memberId) {
		this.journeyId = journeyId;
		this.title = title;
		this.disclosure = disclosure;
		this.journeyThemes = journeyThemes;
		this.region = region;
		this.journeyThumbnailUrl = journeyThumbnailUrl;
		this.memberId = memberId;
	}

}
