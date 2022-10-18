import React, { useState } from 'react';
import styled from 'styled-components';
import { ImageInputCarousel, PlaceInfoHolder } from '../components/placeUpload';
import { SubmitButton } from '../components/common';
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

function PlaceInfoProvider({ children, value }) {
  return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>;
}

export default function Places() {
  const value = useState(PlaceInfo);
  console.log(value[0]);
  return (
    <PlaceUploadHolder>
      <PlaceInfoProvider value={value}>
        <ImageInputCarousel />
        <PlaceInfoHolder />
        <SubmitButton />
      </PlaceInfoProvider>
    </PlaceUploadHolder>
  );
}
