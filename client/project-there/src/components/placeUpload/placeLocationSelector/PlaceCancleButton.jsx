import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--color-gray400);
  position: absolute;
  right: 120px;
  bottom: 20px;
  z-index: 12;
  width: 88px;
  height: 39px;
`;

export default function PlaceCancleButton({ selected, setPlaceSelected }) {
  const handelClick = (e) => {
    e.stopPropagation();
    setPlaceSelected('');
  };

  return (
    <div>
      {selected && (
        <StyledButton
          onClick={handelClick}
        >
          취소
        </StyledButton>
      )}
    </div>
  );
}
