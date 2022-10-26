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
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 4%;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 0.5px solid var(--color-gray300);
  margin-top: 2%;
  margin-bottom: 5%;
`;

export default function PlaceInfoHolder() {
  return (
    <InfoHolder>
      <PlaceTitle />
      <Divider />
      <PlaceLocationSelector />
      <PlaceDateTimePicker />
      <PlaceCategoryPicker />
      {/* <PlaceDetailInfo /> */}
    </InfoHolder>
  );
}
