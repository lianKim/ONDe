import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageInputCarousel, PlaceInfoHolder } from '../components/placeUpload';
import PlaceContext from '../contexts/PlaceContext';

const PlaceUploadHolder = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: #d3d3d3;
  position: relative;
  left: 15vw;
  top: 15vh;
  display: flex;
`;
const PlaceInfo = {
  latitude: '',
  longitude: '',
  title: '',
  text: '',
  placeCategory: '',
  addressName: '',
  region1: '',
  region2: '',
  region3: '',
  region4: '',
  placeTime: new Date(),
  placeName: '',
  images: [],
  imageTakenLocations: [],
  journeyId: 1,
};
const StyledSubmitButton = styled.button`
  position: absolute;
  right: 3%;
  bottom: 3%;
  width: 10%;
  height: 5%;
`;

const StyledCancleButton = styled.button`
  position: absolute;
  right: 15%;
  bottom: 3%;
  width: 10%;
  height: 5%;
`;

function PlaceInfoProvider({ children, value }) {
  return (
    <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>
  );
}

export default function Places() {
  const value = useState(PlaceInfo);
  const navigation = useNavigate();
  const params = useParams();

  const handleSubmitClick = async (e) => {
    const formData = new FormData();
    const dispatchValue = { ...value[0] };
    let submitPossible = true;
    e.preventDefault();
    delete dispatchValue.imageTakenLocations;

    const placeKeys = Object.keys(dispatchValue);
    placeKeys.forEach((key) => {
      const placeValue = dispatchValue[key];
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
    dispatchValue.placeTime = dispatchValue.placeTime.toISOString();
    formData.append('request', new Blob([JSON.stringify(dispatchValue)], { type: 'application/json' }));
    if (submitPossible) {
      const url = 'http://localhost:8080/place/create';
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
    <PlaceUploadHolder>
      <PlaceInfoProvider value={value}>
        <ImageInputCarousel />
        <PlaceInfoHolder />
        <StyledSubmitButton onClick={handleSubmitClick}>
          제출
        </StyledSubmitButton>
        <StyledCancleButton onClick={handleCancleClick}>
          취소
        </StyledCancleButton>
      </PlaceInfoProvider>
    </PlaceUploadHolder>
  );
}
