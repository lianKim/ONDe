import React from 'react';
import { useParams } from 'react-router-dom';
import JourneyUpdateContainer from '../components/journeyUpdate/JourneyUpdateContainer';
import NewJourneyProvider from '../contexts/NewJourneyContext';

function JourneyUpdatePage() {
  const params = useParams();

  return (
    <NewJourneyProvider>
      <JourneyUpdateContainer journeyId={params.journeyId} />
    </NewJourneyProvider>
  );
}

export default JourneyUpdatePage;
