package onde.there.journey.repository;

import static onde.there.domain.QJourney.journey;
import static onde.there.domain.QJourneyTheme.journeyTheme;
import static onde.there.domain.type.JourneyThemeType.findByTheme;
import static onde.there.domain.type.RegionType.findByRegion;

import com.querydsl.core.BooleanBuilder;
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

		BooleanBuilder filteredRegion = new BooleanBuilder();
		conRegions(filteringRequest.getRegions(), filteredRegion);

		BooleanBuilder filteredTheme = new BooleanBuilder();
		conJourneyTheme(filteringRequest.getThemes(), filteredTheme);

		return jpaQueryFactory
			.selectFrom(journey)
			.innerJoin(journey.journeyThemes, journeyTheme)
			.where(
				journey.disclosure.eq("public"),
				filteredRegion,
				filteredTheme,
				eqTitle(filteringRequest.getKeyword())
			)
			.groupBy(journey)
			.fetch();

	}

	private BooleanExpression eqTitle(String title) {

		return title == null ? null : journey.title.contains(title);
	}

	private void conRegions(List<String> regions, BooleanBuilder builder) {
		if (regions != null) {

			for (String region : regions) {
				builder.or(journey.region.eq(findByRegion(region)));
			}

		}
	}

	private void conJourneyTheme(List<String> journeyThemes,
		BooleanBuilder builder) {
		if (journeyThemes != null) {

			for (String theme : journeyThemes) {
				builder.or(
					journeyTheme.journeyThemeName.eq(findByTheme(theme)));
			}

		}
	}

}
