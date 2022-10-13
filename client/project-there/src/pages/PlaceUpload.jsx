import React from 'react';
import styled from 'styled-components';
import { ImageInputCarousel, PlaceInfoHolder } from '../contexts/index';
import { SubmitButton } from '../components/common';

const PlaceUploadHolder = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: #d3d3d3;
  position: relative;
  left: 15vw;
  top: 15vh;
  display:flex;
`;

export default function Places() {
  return (
    <PlaceUploadHolder>
      <ImageInputCarousel />
      <PlaceInfoHolder />
      <SubmitButton />
    </PlaceUploadHolder>
  );
}
