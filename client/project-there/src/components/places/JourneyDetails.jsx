import React from 'react';
import styled from 'styled-components';
import JourneyInfo from './JourneyInfo';
import PlacesDetails from './PlacesDetails';

const JourneyDetailsHolder = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;

export default function JourneyDetails() {
  return (
    <JourneyDetailsHolder>
      <JourneyInfo />
      <PlacesDetails />
    </JourneyDetailsHolder>
  );
}
