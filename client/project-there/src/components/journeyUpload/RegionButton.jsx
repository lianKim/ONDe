import React from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/NewJourneyContext';

const Button = styled.button`
  &:hover {
    background: var(--color-gray300);
  }

  &.selected {
    background: var(--color-green100);
  }
`;

function RegionButton({ children }) {
  const { region } = useNewJourneyValue();

  const handleSelectedBtn = (e) => {
    e.target.classList.toggle('selected');
  };

  return (
    <Button
      type="button"
      className={region === children && 'selected'}
      onClick={handleSelectedBtn}
    >
      {children}
    </Button>
  );
}

export default RegionButton;
