import React, { useState } from 'react';
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
  display: flex;
`;

export default function PlaceUploadPage() {
  const [resizedImageFiles, setResizedImageFiles] = useState([]);
  const [imageTakenTime, setImageTakenTime] = useState([]);
  const [imageTakenPlaces, setImageTakenPlaces] = useState([]);
  const [placeLocation, setPlaceLocation] = useState();
  const [placeCategory, setPlaceCategory] = useState('default');
  const [placeTitle, setPlaceTitle] = useState('');
  const [placeDetailInfo, setPlaceDetailInfo] = useState('');

  const imageMetaData = [
    imageTakenTime,
    setImageTakenTime,
    imageTakenPlaces,
    setPlaceLocation,
  ];

  return (
    <PlaceUploadHolder>
      <ImageInputCarousel
        getImageMetaData={[
          setResizedImageFiles,
          setImageTakenTime,
          setImageTakenPlaces,
        ]}
      />
      <PlaceInfoHolder
        setImageMetaData={imageMetaData}
        setCategory={setPlaceCategory}
        setTitle={setPlaceTitle}
        setDetailInfo={setPlaceDetailInfo}
      />
      <SubmitButton />
    </PlaceUploadHolder>
  );
}
