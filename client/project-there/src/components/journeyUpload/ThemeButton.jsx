import React from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/newJourney';

const ThemeButtonHolder = styled.button`
  padding: 8px 16px;
  height: 30px;
  margin: 6px;
  background: lightblue;
  border: 1px solid black;

  &:hover {
    background: blue;
  }

  &.selected {
    background: blue;
  }
`;

function ThemeButton({ children }) {
  const { journeyThemes } = useNewJourneyValue();

  const handleSelectedBtn = (e) => {
    e.target.classList.toggle('selected');
  };

  return (
    <ThemeButtonHolder
      type="button"
      className={journeyThemes.includes(children) && 'selected'}
      onClick={handleSelectedBtn}
    >
      {children}
    </ThemeButtonHolder>
  );
}

export default ThemeButton;
