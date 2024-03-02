import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';
import journeyThemeCategories from '../../lib/constants/journeyThemeCategories';
import ThemeButton from './ThemeButton';

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
    color: var(--color-green300);
    background: var(--color-green100);
    border: 0.5px solid var(--color-green300);
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
    <Wrapper>
      <BtnContainer onClick={handleUpdateThemes}>
        {Object.entries(journeyThemeCategories).map(([key, val]) => (
          <ThemeButton key={key}>{val}</ThemeButton>
        ))}
      </BtnContainer>
      <button type="button" onClick={onCloseModal}>
        선택
      </button>
    </Wrapper>
  );
}

export default React.memo(ThemeCategoryModal);
