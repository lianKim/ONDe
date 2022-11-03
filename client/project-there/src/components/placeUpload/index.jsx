import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImageInputCarousel from './ImageInputCarousel';
import PlaceInfoHolder from './PlaceInfoHolder';
import { usePlaceInfoValue } from '../../contexts/PlaceInfoContext';

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
    bottom: 3%;
    width: 88px;
    height: 39px;
    border-radius: 20px;
    background-color: var(--color-gray400);
    letter-spacing: -5%;
    border: none;
  }
`;

export default function PlaceUploadPage() {
  const value = usePlaceInfoValue();
  const navigation = useNavigate();
  const params = useParams();

  console.log(value);
  const handleSubmitClick = async (e) => {
    const formData = new FormData();
    const dispatchValue = value;
    let submitPossible = true;
    e.preventDefault();
    delete dispatchValue.imageTakenLocations;

    const placeKeys = Object.keys(value);
    placeKeys.forEach((key) => {
      const placeValue = value[key];
      if (placeValue === '' || placeValue === []) {
        window.alert(`${key}를 입력해주세요!`);
        submitPossible = false;
      }
      if (key === 'images') {
        placeValue.forEach((image) => { formData.append('multipartFile', image); });
      }
    });

    delete dispatchValue.images;
    dispatchValue.journeyId = params.journeyId;
    console.log(dispatchValue);
    formData.append('request', new Blob([JSON.stringify(dispatchValue)], { type: 'application/json' }));
    if (submitPossible) {
      const url = 'http://onde-bucket.s3.ap-northeast-2.amazonaws.com/place';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios
        .post(url, formData)
        .then((res) => {
          window.alert('제출이 성공적으로 완료되었습니다.');
          navigation(`/journey/${params.journeyId}`);
        })
        .catch((err) => {
          window.alert(`${err}로 인해 제출에 실패하였습니다.`);
          navigation(`/journey/${params.journeyId}`);
        });
    }
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
