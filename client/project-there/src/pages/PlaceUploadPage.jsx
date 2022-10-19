import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
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
  PlaceCategory: '',
  addressName: '',
  region1: '',
  region2: '',
  region3: '',
  region4: '',
  placeTime: new Date(),
  placeName: '',
  images: [],
  imageTakenLocations: [],
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
    e.preventDefault();
    const blobTest = new Blob([JSON.stringify(value[0])], {
      type: 'application/json',
    });
    formData.append('placeData', blobTest);
    const formValues = Array.from(formData.values());
    axios({
      method: 'POST',
      url: 'http://xxxxxx.com/api/xx',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
      },
      data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
    });
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
