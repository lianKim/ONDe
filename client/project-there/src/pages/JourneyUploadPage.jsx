import React, { useState } from 'react';
import { addDatas } from '../lib/utills';
import ThumbsUploader from '../components/journeyUpload/ThumbsUploader';
import ContentsEditor from '../components/journeyUpload/ContentsEditor';
import JourneysProvider, { useJourneysValue } from '../contexts/journeys';
import JourneyUploadContainer from '../components/journeyUpload/JourneyUploadContainer';

function JourneyUploadPage() {
  return (
    <JourneysProvider>
      <JourneyUploadContainer />
    </JourneysProvider>
  );
}

export default JourneyUploadPage;
