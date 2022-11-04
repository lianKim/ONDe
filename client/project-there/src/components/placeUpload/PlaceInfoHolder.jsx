import React from 'react';
import styled from 'styled-components';
import PlaceLocationSelector from './placeLocationSelector';
import PlaceDateTimeSelector from './PlaceDateTimeSelector';
import PlaceCategorySelector from './PlaceCategorySelector';
import PlaceText from './PlaceText';
import PlaceTitle from './PlaceTitle';

const StyledPlaceInfoHolder = styled.div`
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
    <StyledPlaceInfoHolder>
      <PlaceTitle />
      <DividerTop />
      <PlaceLocationSelector />
      <PlaceDateTimeSelector />
      <PlaceCategorySelector />
      <DividerBottom />
      <PlaceText />
    </StyledPlaceInfoHolder>
  );
}
