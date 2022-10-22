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

export default function JourneyDetails({ focusedPlace, hover }) {
  const holderRef = useRef();

  useEffect(() => {
    if (holderRef) {
      const $targetTimeLineElement = holderRef.current.querySelector(`.verticalTimeLineElement-${focusedPlace}`);
      if ($targetTimeLineElement) {
        $targetTimeLineElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    }
  }, [focusedPlace]);

  return (
    <JourneyDetailsHolder
      ref={holderRef}
    >
      <JourneyInfo />
      <PlacesDetails
        focusedPlace={focusedPlace}
        hover={hover}
      />
    </JourneyDetailsHolder>
  );
}
