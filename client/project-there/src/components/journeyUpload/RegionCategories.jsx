import React, { useEffect, useState } from 'react';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import journeyRegionCategories from '../../lib/constants/journeyRegionCategories';
import RegionButton from './RegionButton';

function RegionCategories({ area }) {
  const { regionGroups } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const clickedObj = journeyRegionCategories.find((obj) => obj.area === area);

  return (
    <>
      <button type="button">이전</button>
      {clickedObj.regions.map((region) => (
        <RegionButton key={region} area={area}>
          {region}
        </RegionButton>
      ))}
    </>
  );
}

export default RegionCategories;
