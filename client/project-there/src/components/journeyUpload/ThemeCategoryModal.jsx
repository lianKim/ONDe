import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';
import journeyThemeCategories from '../../lib/constants/journeyThemeCategories';
import ThemeButton from './ThemeButton';

const ModalBox = styled.div`
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
  flex-wrap: wrap;

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

function ThemeCategoryModal({ onCloseModal }) {
  const { journeyThemes } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const handleUpdateThemes = ({ target }) => {
    if (!target.matches('button')) return;

    const targetTheme = target.textContent;

    if (!journeyThemes.includes(targetTheme)) {
      updateData('journeyThemes', [...journeyThemes, targetTheme]);
    } else {
      const nextJourneyThemes = journeyThemes.filter(
        (theme) => theme !== targetTheme,
      );
      updateData('journeyThemes', nextJourneyThemes);
    }
  };

  return (
    <ModalBox type="div">
      <BtnContainer onClick={handleUpdateThemes}>
        {Object.entries(journeyThemeCategories).map(([key, val]) => (
          <ThemeButton key={key}>{val}</ThemeButton>
        ))}
      </BtnContainer>
      <button type="button" onClick={onCloseModal}>
        선택
      </button>
    </ModalBox>
  );
}

export default React.memo(ThemeCategoryModal);
