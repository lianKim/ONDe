import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledPlaceAddButton = styled.button`
  position: absolute;
  z-index: 12;
  right: 30px;
  bottom: 30px;
  background-color: var(--color-green100);
  color: white;
  height: 50px;
`;

export default function PlaceAddButton({ possibleAddNumber, journeyId }) {
  const navigate = useNavigate();

  const handlePlaceAddButton = () => {
    if (possibleAddNumber > 10) {
      window.alert('장소는 10개까지 추가가 가능합니다.');
    } else {
      navigate(`/placeupload/${journeyId}`);
    }
  };

  return (
    <StyledPlaceAddButton
      type="button"
      onClick={handlePlaceAddButton}
      className="addPlaceButton"
    >
      장소 추가하기
      <br />
      {`( ${10 - possibleAddNumber} )`}
    </StyledPlaceAddButton>
  );
}
