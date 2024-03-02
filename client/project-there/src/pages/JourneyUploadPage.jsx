import React from 'react';
import JourneyUploadContainer from '../components/journeyUpload/JourneyUploadContainer';
import NewJourneyProvider from '../contexts/NewJourneyContext';

function JourneyUploadPage() {
  return (
    <NewJourneyProvider>
      <JourneyUploadContainer />
    </NewJourneyProvider>
  );
}

export default JourneyUploadPage;
