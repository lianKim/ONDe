import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';
import journeyRegionCategories from '../../lib/constants/journeyRegionCategories';
import RegionButton from './RegionButton';

const Wrapper = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: calc(100vw - 100vh + 45px);
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-gray100);
  z-index: 1;

  && > button {
    color: var(--color-gray200);
    background: var(--color-green200);
  }
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
  const { updateData } = useNewJourneyActions();

  const handleUpdateRegion = ({ target }) => {
    if (!target.matches('button')) return;
    updateData('region', target.textContent);
  };

  return (
    <Wrapper>
      <BtnContainer onClick={handleUpdateRegion}>
        {Object.entries(journeyRegionCategories).map(([key, val]) => (
          <RegionButton key={key}>{val}</RegionButton>
        ))}
      </BtnContainer>
      <button type="button" onClick={onCloseModal}>
        선택
      </button>
    </Wrapper>
  );
}

export default React.memo(RegionCategoryModal);
