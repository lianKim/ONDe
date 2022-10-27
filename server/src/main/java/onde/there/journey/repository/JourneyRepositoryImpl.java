package onde.there.journey.repository;

import static onde.there.domain.QJourney.journey;
import static onde.there.domain.QJourneyTheme.journeyTheme;
import static onde.there.domain.type.JourneyThemeType.findByTheme;
import static onde.there.domain.type.RegionType.findByRegion;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import onde.there.domain.Journey;
import onde.there.dto.journy.JourneyDto;

@RequiredArgsConstructor
public class JourneyRepositoryImpl implements JourneyRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Journey> searchAll(
		JourneyDto.FilteringRequest filteringRequest) {

		return jpaQueryFactory
			.selectFrom(journey)
			.innerJoin(journey.journeyThemes, journeyTheme)
			.where(
				journey.disclosure.eq("public"),
				conJourneyTheme(filteringRequest.getThemes()),
				conRegions(filteringRequest.getRegions()),
				eqTitle(filteringRequest.getKeyword())
			)
			.groupBy(journey)
			.fetch();

	}

	private BooleanExpression conJourneyTheme(List<String> journeyThemes) {

		if (journeyThemes == null) {
			return null;
		}

		for (String theme : journeyThemes) {
			return journeyTheme.journeyThemeName.eq(findByTheme(theme));

		}

		return null;
	}

	private BooleanExpression conRegions(List<String> regions) {

		if (regions == null) {
			return null;
		}

		for (String region : regions) {
			return journey.region.eq(findByRegion(region));

		}

		return null;
	}

	private BooleanExpression eqTitle(String title) {

		return title == null ? null : journey.title.contains(title);
	}

}
