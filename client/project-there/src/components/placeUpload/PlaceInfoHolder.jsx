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

const DividerTop = styled.div`
  width: 100%;
  border-bottom: 0.5px solid var(--color-gray300);
  margin-top: 2%;
  margin-bottom: 5%;
`;
const DividerBottom = styled.div`
  width: 100%;
  border-bottom: 0.5px solid var(--color-gray300);
  margin-top: 5%;
  margin-bottom: 2%;
`;

export default function PlaceInfoHolder() {
  return (
    <InfoHolder>
      <PlaceTitle />
      <DividerTop />
      <PlaceLocationSelector />
      <PlaceDateTimePicker />
      <PlaceCategoryPicker />
      <DividerBottom />
      <PlaceDetailInfo />
    </InfoHolder>
  );
}
