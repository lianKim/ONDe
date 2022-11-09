import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import RegionCategoryModal from './RegionCategoryModal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & span {
    margin-right: 28px;
  }
`;

function RegionCategoryBox() {
  const { region } = useNewJourneyValue();
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <span>지역</span>
      <button type="button" onClick={handleOpenModal}>
        {region || '선택'}
      </button>
      {visible && <RegionCategoryModal onCloseModal={closeModal} />}
    </Wrapper>
  );
}

export default RegionCategoryBox;
