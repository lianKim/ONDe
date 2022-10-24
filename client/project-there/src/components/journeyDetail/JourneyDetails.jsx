import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PlacesDetails from './PlacesDetails';
import JourneyInfo from './journeyInfo/JourneyInfo';
import JourneyDetailProvider from '../../contexts/journeyDetail';
import NewJourneyProvider from '../../contexts/newJourney';

const JourneyDetailsHolder = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;

export default function JourneyDetails({ focusedPlace, hover, journeyId }) {
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
      <NewJourneyProvider>
        <JourneyDetailProvider>
          <JourneyInfo journeyId={journeyId} />
        </JourneyDetailProvider>
      </NewJourneyProvider>
      <PlacesDetails
        focusedPlace={focusedPlace}
        hover={hover}
      />
    </JourneyDetailsHolder>
  );
}
