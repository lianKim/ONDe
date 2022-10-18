import React from 'react';
import styled from 'styled-components';
import PlaceLocationSelector from './PlaceLocationSelector';
import PlaceDateTimePicker from './PlaceDateTimePicker';
import PlaceCategoryPicker from './PlaceCategoryPicker';
import PlaceDetailInfo from './PlaceDetailInfo';
import PlaceTitle from './PlaceTitle';

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

export default function PlaceInfoHolder() {
  return (
    <InfoHolder>
      {/* <PlaceLocationSelector locationDatas={locationDatas} /> */}
      <PlaceDateTimePicker />
      <PlaceCategoryPicker />
      <PlaceTitle />
      <PlaceDetailInfo />
    </InfoHolder>
  );
}
