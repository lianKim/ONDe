import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
const StyledButton = styled.button`
  position: absolute;
  right: 3%;
  bottom: 3%;
  width: 10%;
  height: 5%;
`;

function PlaceInfoProvider({ children, value }) {
  return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>;
}

export default function Places() {
  const value = useState(PlaceInfo);

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
      if (key !== 'placeTime' || key !== 'images') {
        formData.append(key, placeValue);
      }
      if (key === 'placeTime') {
        formData.append(key, placeValue.toISOString());
      }
      if (key === 'images') {
        placeValue.forEach((image) => { formData.append('multipartFile', image); });
      }
    });
    if (submitPossible) {
      const url = 'http://localhost:8080/place/create';
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      axios
        .post(url, FormData, config)
        .then((res) => { console.log(res); })
        .then((err) => { console.log(err); });
    }
  };

  return (
    <PlaceUploadHolder>
      <PlaceInfoProvider value={value}>
        <ImageInputCarousel />
        <PlaceInfoHolder />
        <StyledButton onClick={handleSubmitClick}>
          제출
        </StyledButton>
      </PlaceInfoProvider>
    </PlaceUploadHolder>
  );
}
