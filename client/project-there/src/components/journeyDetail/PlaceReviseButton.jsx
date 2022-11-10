import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../../lib/utills/customAxios';
import { deletePlaceFromTotalPlaceList } from '../../lib/hooks/useJourneyDetail';
import { useTotalPlaceInfoValue, useTotalPlaceInfoActions } from '../../contexts/TotalPlaceInfoContext';

const ButtonHolder = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 12;
`;

const RevisedButton = styled.button`
  width: 30px;
  border: none;
  font-size: 20px;
  background-color: var(--color-gray100) !important;
  color:black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border: 1px solid var(--color-green100);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.9);
`;
const DeleteButton = styled.button`
  color: red;
  background: none;
  border:none;
`;
const FixButton = styled.button`
  color:blue;
  background: none;
  border:none;
`;

export default function PlaceReviseButton({ placeId }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  const totalPlaceList = useTotalPlaceInfoValue();
  const { updateTotalPlaceData } = useTotalPlaceInfoActions();

  const handleReviseButtonCilck = () => {
    setIsOpen((pre) => !pre);
  };

  // const handleDelete = () => {
  // };

  const handlePlaceDelete = () => {
    deletePlaceFromTotalPlaceList(totalPlaceList, placeId, updateTotalPlaceData);
  };

  const handleFix = () => {
    navigation(`/placeupdate/${placeId}`);
  };

  return (
    <ButtonHolder>
      <RevisedButton
        onClick={handleReviseButtonCilck}
      >
        ...
      </RevisedButton>
      {isOpen && (
        <Wrapper>
          <FixButton
            onClick={handleFix}
          >
            수정
          </FixButton>
          <DeleteButton
            onClick={handlePlaceDelete}
          >
            삭제
          </DeleteButton>
        </Wrapper>
      )}
    </ButtonHolder>
  );
}
