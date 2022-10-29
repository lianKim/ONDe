import React from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/newJourney';

const Button = styled.button`
  &:hover {
    background: var(--color-gray300);
  }

  &.selected {
    background: var(--color-green100);
  }
`;

function ThemeButton({ children }) {
  const { journeyThemes } = useNewJourneyValue();

  const handleSelectedBtn = (e) => {
    e.target.classList.toggle('selected');
  };

  return (
    <Button
      type="button"
      className={journeyThemes.includes(children) && 'selected'}
      onClick={handleSelectedBtn}
    >
      {children}
    </Button>
  );
}

export default ThemeButton;
