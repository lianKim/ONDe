import React, { useRef, useState } from 'react';
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
  const [visible, setVisible] = useState(false);
  const btnRef = useRef();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const updateBtnText = (text) => {
    btnRef.current.textContent = text;
  };

  return (
    <Wrapper>
      <span>지역</span>
      <button type="button" ref={btnRef} onClick={handleOpenModal}>
        선택
      </button>
      {visible && (
        <RegionCategoryModal
          onCloseModal={closeModal}
          OnUpdateBtnText={updateBtnText}
        />
      )}
    </Wrapper>
  );
}

export default RegionCategoryBox;
