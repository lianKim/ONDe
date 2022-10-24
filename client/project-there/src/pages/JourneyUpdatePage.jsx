import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JourneyUpdateContainer from '../components/journeyUpdate/JourneyUpdateContainer';
import JourneyUploadContainer from '../components/journeyUpload/JourneyUploadContainer';
import JourneyDetailProvider, {
  useJourneyDetailValue,
} from '../contexts/journeyDetail';
import NewJourneyProvider, {
  useNewJourneyActions,
} from '../contexts/newJourney';

function JourneyUpdatePage() {
  const params = useParams();

  return (
    <JourneyDetailProvider>
      <NewJourneyProvider>
        <JourneyUpdateContainer />
      </NewJourneyProvider>
    </JourneyDetailProvider>
  );
}

export default JourneyUpdatePage;
