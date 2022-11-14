import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';
import RegionCategoryModal from './RegionCategoryModal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & span {
    margin-right: 28px;
  }
`;

function RegionCategoryPicker() {
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

export default RegionCategoryPicker;
