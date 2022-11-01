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

const Button = styled.button`
  margin-right: 6px;
`;

function ThemeCategoryBox() {
  const { journeyThemes } = useNewJourneyValue();
  const [selectedThemes, setSelectedThemes] = useState(null);
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

  useEffect(() => {
    if (!journeyThemes.length) return;

    const nextSelectedThemes = journeyThemes.map((theme) => (
      <Button type="button" onClick={handleOpenModal}>
        {theme}
      </Button>
    ));
    setSelectedThemes(nextSelectedThemes);
  }, [journeyThemes.length]);

  return (
    <Wrapper>
      <span>테마</span>
      {selectedThemes || (
        <button type="button" ref={btnRef} onClick={handleOpenModal}>
          선택
        </button>
      )}

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
