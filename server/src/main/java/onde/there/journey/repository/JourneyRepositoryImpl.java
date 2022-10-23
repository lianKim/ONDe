package onde.there.journey.repository;

import static onde.there.domain.QJourney.journey;
import static onde.there.domain.QJourneyTheme.journeyTheme;
import static onde.there.domain.type.JourneyThemeType.findByTheme;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import onde.there.domain.Journey;
import onde.there.domain.QJourneyTheme;
import onde.there.dto.journy.JourneySearchTheme;

@RequiredArgsConstructor
public class JourneyRepositoryImpl implements JourneyRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Journey> searchAll(
		JourneySearchTheme journeySearchTheme) {

		return jpaQueryFactory
			.select(journey)
			.from(journeyTheme)
//			.leftJoin(regionalCategory.journey, journey)
//			.leftJoin(journey.regionalCategoryList, regionalCategory)
			.where(
				eqJourneyTheme(journeySearchTheme.getJourneyTheme()),
				journey.disclosure.contains("public")
			)
			.fetch();

	}

	private BooleanExpression eqDisclosure(String disclosure) {
		return disclosure == null ? null
			: journey.disclosure.contains(disclosure);
	}

	private BooleanBuilder eqJourneyTheme(List<String> journeyThemeList) {

		if (journeyThemeList == null) {
			return null;
		}

		BooleanBuilder booleanBuilder = new BooleanBuilder();

		for (String journeyTheme : journeyThemeList) {
			booleanBuilder.or(QJourneyTheme.journeyTheme.journeyThemeName.eq(
				findByTheme(journeyTheme)));
		}

		return booleanBuilder;
	}

	private BooleanBuilder eqRegionGroup(List<String> regionGroupList) {

		if (regionGroupList == null) {
			return null;
		}

		BooleanBuilder booleanBuilder = new BooleanBuilder();

//		booleanBuilder.or(
//			regionalCategory.area.eq(regionGroup.getArea()));

		return booleanBuilder;
	}


}
