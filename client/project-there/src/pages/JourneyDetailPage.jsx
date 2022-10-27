
import axios from 'axios';
import React, { createContext } from 'react';
import { useParams } from 'react-router-dom';
import JourneyInfo from '../components/journeyDetail/journeyInfo/JourneyInfo';
import JourneyDetailProvider from '../contexts/journeyDetail';
import NewJourneyProvider from '../contexts/newJourney';

export default function JourneyDetailPage() {
  const params = useParams();
  console.log(`params.journeyId: ${params.journeyId}`);

  return (
    <NewJourneyProvider>
      <JourneyDetailProvider>
        <JourneyInfo journeyId={params.journeyId} />
      </JourneyDetailProvider>
    </NewJourneyProvider>
  );
}
