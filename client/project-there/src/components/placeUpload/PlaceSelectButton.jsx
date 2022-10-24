import React, { useContext } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => (props.selected ? 'palevioletred' : 'grey')};
  position: absolute;
  right: 2%;
  bottom: 2%;
  z-index: 12;
  width: 10%;
  height: 5%;
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
      선택하기
    </StyledButton>
  );
}
