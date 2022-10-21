import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import journeyRegionCategories from '../../lib/constants/journeyRegionCategories';
import RegionButton from './RegionButton';
import RegionCategories from './RegionCategories';

const AreasContainer = styled.div`
  padding: 8px;
  border: 1px solid black;
`;

function RegionCategoryBox() {
  const [clickedArea, setClickedArea] = useState('경기도');
  const [selectedRegionGroups, setSelectedRegionGroups] = useState([]);

  const { regionGroups } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const handleClickArea = ({ target }) => {
    if (
      target.textContent.endsWith('도') &&
      target.textContent !== '제주특별자치도'
    ) {
      setClickedArea(target.textContent);

      const currGroup = regionGroups.find(
        (obj) => obj.area === target.textContent,
      );
      if (!currGroup) {
        updateData('regionGroups', [
          ...regionGroups,
          { area: target.content, regions: [] },
        ]);
      }
    }
  };

  return (
    <div>
      <AreasContainer>
        {journeyRegionCategories.map((obj) => (
          <RegionButton key={obj.area}>{obj.area}</RegionButton>
        ))}
      </AreasContainer>
      <RegionCategories area={clickedArea} />
    </div>
  );
}

export default RegionCategoryBox;
