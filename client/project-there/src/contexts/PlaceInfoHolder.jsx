import React from 'react';
import styled from 'styled-components';
import {
  PlaceLocationSelector, PlaceDateTimePicker,
  PlaceCategoryPicker, PlaceDetailInfo,
} from '../components';

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
      <PlaceLocationSelector />
      <PlaceDateTimePicker />
      <PlaceCategoryPicker />
      <PlaceDetailInfo />
    </InfoHolder>
  );
}
