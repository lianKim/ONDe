import React from 'react';
import styled from 'styled-components';
import {
  PlaceLocationSelector, PlaceDateTimePicker,
  PlaceCategoryPicker, PlaceDetailInfo,
} from '../components/placeUpload';

const InfoHolder = styled.div`
  width : 50%;
  height: 100%;
  border: 1px solid black;
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;;
  align-items: center;
  box-sizing: border-box;
`;

export default function PlaceInfoHolder({ setImageMetaData }) {
  const [imageTakenTime, setImageTakenTime,
    imageTakenPlaces, setPlaceLocation] = setImageMetaData;
  const locationDatas = [imageTakenPlaces, setPlaceLocation];
  const placeTimeData = [imageTakenTime, setImageTakenTime];
  return (
    <InfoHolder>
      <PlaceLocationSelector locationDatas={locationDatas} />
      <PlaceDateTimePicker placeTimeData={placeTimeData} />
      <PlaceCategoryPicker />
      <PlaceDetailInfo />
    </InfoHolder>
  );
}
