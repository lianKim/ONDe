import React, { useEffect, useRef } from 'react';
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

export default function JourneyDetails({ focusedPlace }) {
  const holderRef = useRef();

  useEffect(() => {
    console.log(focusedPlace);
    console.log(holderRef);
  }, [focusedPlace]);

  return (
    <JourneyDetailsHolder
      ref={holderRef}
    >
      <JourneyInfo />
      <PlacesDetails focusedPlace={focusedPlace} />
    </JourneyDetailsHolder>
  );
}
