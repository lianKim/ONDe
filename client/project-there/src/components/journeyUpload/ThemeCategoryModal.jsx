import React from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import journeyThemeCategories from '../../lib/constants/journeyThemeCategories';
import ThemeButton from './ThemeButton';

const ModalBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  white-space: nowrap;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  background: whitesmoke;
  border: 1px solid black;
`;

const ButtonsWrapper = styled.div`
  border: 1px solid black;
  padding: 8px;
`;

function ThemeCategoryModal({ onCloseModal }) {
  const { journeyThemes } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const handleUpdateThemes = ({ target }) => {
    if (!target.matches('button')) return;

    if (!journeyThemes.includes(target.textContent)) {
      updateData('journeyThemes', [...journeyThemes, target.textContent]);
    } else {
      const nextJourneyThemes = journeyThemes.filter(
        (theme) => theme !== target.textContent,
      );
      updateData('journeyThemes', nextJourneyThemes);
    }
  };

  return (
    <ModalBox type="div">
      <ButtonsWrapper onClick={handleUpdateThemes}>
        {journeyThemeCategories.map((theme) => (
          <ThemeButton key={theme}>{theme}</ThemeButton>
        ))}
      </ButtonsWrapper>
      <button type="button" onClick={onCloseModal}>
        선택
      </button>
    </ModalBox>
  );
}

export default ThemeCategoryModal;
