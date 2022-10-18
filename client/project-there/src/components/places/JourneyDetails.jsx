import React from 'react';
import styled from 'styled-components';
import JourneyInfo from './JourneyInfo';
import PlacesDetails from './PlacesDetails';

const JourneyDetailsHolder = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function JourneyDetails() {
  return (
    <JourneyDetailsHolder>
      <JourneyInfo />
      <PlacesDetails />
    </JourneyDetailsHolder>
  );
}
