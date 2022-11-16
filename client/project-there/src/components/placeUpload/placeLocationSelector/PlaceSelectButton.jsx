import React, { useContext } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.selected ? 'var(--color-green200)' : 'var(--color-gray200)'};
  color: ${(props) =>
    props.selected ? 'var(--color-gray100)' : 'var(--color-green200)'};
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 12;
  width: 80px;
  height: 39px;
  border: 0;
`;

export default function PlaceSelectButton({ selected, setMapOpen }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (selected) {
      setMapOpen(false);
    }
  };

  return (
    <StyledButton selected={selected} onClick={handleClick}>
      선택
    </StyledButton>
  );
}
