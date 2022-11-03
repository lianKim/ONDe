import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImageInputCarousel from './ImageInputCarousel';
import PlaceInfoHolder from './PlaceInfoHolder';
import { usePlaceInfoActions } from '../../contexts/PlaceInfoContext';

const StyledPlaceUploadHolder = styled.div`
  width: 70vw;
  height: 70vh;
  position: relative;
  left: 15vw;
  top: 15vh;
  display: flex;
  border: 1px solid #dde4e5;
  .submit{
    position: absolute;
    right: 30px;
    bottom: 20px;
    width: 88px;
    height: 39px;
    border-radius: 20px;
    background-color: var(--color-green100);
    letter-spacing: -5%;
    color:white;
  }
  .cancle{
    position: absolute;
    right: 140px;
    bottom: 20px;
    width: 88px;
    height: 39px;
    border-radius: 20px;
    background-color: var(--color-gray400);
    letter-spacing: -5%;
    border: none;
  }
`;

export default function PlaceUploadPage() {
  const { uploadData } = usePlaceInfoActions();
  const navigation = useNavigate();
  const params = useParams();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    uploadData(params);
  };
  const handleCancleClick = () => {
    navigation(-1);
  };

  return (
    <StyledPlaceUploadHolder>
      <ImageInputCarousel />
      <PlaceInfoHolder />
      <button className="submit" type="button" onClick={handleSubmitClick}>
        등록
      </button>
      <button className="cancle" type="button" onClick={handleCancleClick}>
        취소
      </button>
    </StyledPlaceUploadHolder>
  );
}
