import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import journeyRegionCategories from '../../lib/constants/journeyRegionCategories';
import RegionButton from './RegionButton';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 72px 60px;
  background: var(--color-gray100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const BtnContainer = styled.div`
  width: 60%;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1em 1.7em;
  margin-bottom: 60px;
`;

function RegionCategoryModal({ onCloseModal }) {
  const { region } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const handleUpdateRegion = ({ target }) => {
    if (!target.matches('button')) return;
    updateData('region', target.textContent);
  };

  return (
    <Wrapper>
      <BtnContainer onClick={handleUpdateRegion}>
        {Object.keys(journeyRegionCategories).map((key) => (
          <RegionButton key={key}>{journeyRegionCategories[key]}</RegionButton>
        ))}
      </BtnContainer>
      <button type="button" onClick={onCloseModal}>
        선택
      </button>
    </Wrapper>
  );
}

export default RegionCategoryModal;
