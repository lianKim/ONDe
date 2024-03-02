import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { deletePlaceFromTotalPlaceList } from '../../lib/hooks/useJourneyDetail';
import { useTotalPlaceInfoValue, useTotalPlaceInfoActions } from '../../contexts/TotalPlaceInfoContext';

const StyledReviseButtonHolder = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 12;
  .revisedButton{
    width: 30px;
    border: none;
    font-size: 20px;
    background-color: var(--color-gray100) !important;
    color:black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper{
    border: 1px solid var(--color-green100);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    background-color: rgba(255,255,255,0.9);
    .fixButton{
      color:blue;
      background: none;
      border:none;
    }
    .deleteButton{
      color: red;
      background: none;
      border:none;
    }
  }
`;

export default function PlaceReviseButton({ placeId }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  const totalPlaceList = useTotalPlaceInfoValue();
  const { updateTotalPlaceData } = useTotalPlaceInfoActions();

  const handleReviseButtonCilck = () => {
    setIsOpen((pre) => !pre);
  };

  const handlePlaceDelete = () => {
    deletePlaceFromTotalPlaceList(totalPlaceList, placeId, updateTotalPlaceData);
  };

  const handlePlaceFix = () => {
    navigation(`/placeupdate/${placeId}`);
  };

  return (
    <StyledReviseButtonHolder>
      <button
        type="button"
        className="revisedButton"
        onClick={handleReviseButtonCilck}
      >
        ...
      </button>
      {isOpen && (
        <div className="wrapper">
          <button
            type="button"
            className="fixButton"
            onClick={handlePlaceFix}
          >
            수정
          </button>
          <button
            type="button"
            className="deleteButton"
            onClick={handlePlaceDelete}
          >
            삭제
          </button>
        </div>
      )}
    </StyledReviseButtonHolder>
  );
}
