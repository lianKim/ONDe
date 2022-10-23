import axios from 'axios';
import React, { createContext } from 'react';
import { useParams } from 'react-router-dom';
import JourneyInfo from '../components/journeyDetail/journeyInfo/JourneyInfo';
import JourneyDetailProvider from '../contexts/journeyDetail';

export default function JourneyDetailPage() {
  const params = useParams();
  console.log(`params.journeyId: ${params.journeyId}`);

  return (
    <JourneyDetailProvider>
      <JourneyInfo journeyId={params.journeyId} />
    </JourneyDetailProvider>
  );
}
