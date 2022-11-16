import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--color-gray500);
  color: var(--color-gray100);
  position: absolute;
  right: 110px;
  bottom: 20px;
  z-index: 12;
  width: 80px;
  height: 39px;
  border: 0;
`;

export default function PlaceCancleButton({ selected, setPlaceSelected }) {
  const handelClick = (e) => {
    e.stopPropagation();
    setPlaceSelected('');
  };

  return (
    <div>
      {selected && <StyledButton onClick={handelClick}>취소</StyledButton>}
    </div>
  );
}
