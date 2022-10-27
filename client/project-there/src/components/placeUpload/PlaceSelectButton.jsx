import React, { useContext } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => (props.selected ? '#51A863' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 12;
  width: 88px;
  height: 39px;
`;

export default function PlaceSelectButton({ selected, setMapOpen }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (selected) {
      setMapOpen(false);
    }
  };

  return (
    <StyledButton
      selected={selected}
      onClick={handleClick}
    >
      선택
    </StyledButton>
  );
}
