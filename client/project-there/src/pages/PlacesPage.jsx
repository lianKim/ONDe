import React from 'react';
import styled from 'styled-components';
import JourneyDetails from '../components/places/JourneyDetails';
import JourneyMap from '../components/places/JourneyMap';

const JourneyHolder = styled.div`
  width: 80%;
  height: 80%;
  position: fixed;
  left : 10%;
  top: 15%;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export default function PlacesPage() {
  return (
    <JourneyHolder>
      <JourneyMap />
      <JourneyDetails />
    </JourneyHolder>
  );
}
