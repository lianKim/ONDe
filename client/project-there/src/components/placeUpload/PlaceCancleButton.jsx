import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: grey;
  position: absolute;
  right: 15%;
  bottom: 2%;
  z-index: 12;
  width: 10%;
  height: 5%;
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
          취소하기
        </StyledButton>
      )}
    </div>
  );
}
