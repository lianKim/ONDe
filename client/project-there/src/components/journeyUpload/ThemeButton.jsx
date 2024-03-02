import React from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/NewJourneyContext';

const Button = styled.button`
  &:hover {
    background: var(--color-gray300);
  }

  &.selected {
    color: var(--color-gray200);
    background: var(--color-green200);
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
