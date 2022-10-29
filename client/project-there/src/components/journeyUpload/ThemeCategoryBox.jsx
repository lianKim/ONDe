import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/newJourney';
import ThemeCategoryModal from './ThemeCategoryModal';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 16px;

  & span {
    margin-right: 28px;
  }
`;

function ThemeCategoryBox() {
  const { journeyThemes } = useNewJourneyValue();
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

  // useEffect(() => {
  //   const selectedThemes = journeyThemes.map((theme) => (
  //     <button type="button" onClick={handleOpenModal}>
  //       {theme}
  //     </button>
  //   ));

  // }, [journeyThemes]);

  return (
    <Wrapper>
      <span>테마</span>
      <button type="button" ref={btnRef} onClick={handleOpenModal}>
        선택
      </button>
      {visible && (
        <ThemeCategoryModal
          onCloseModal={closeModal}
          onUpdateBtnText={updateBtnText}
          onOpenModal={handleOpenModal}
        />
      )}
    </Wrapper>
  );
}

export default ThemeCategoryBox;
