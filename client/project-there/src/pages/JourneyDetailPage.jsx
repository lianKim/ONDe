import React from 'react';
import { useBeforeunload } from 'react-beforeunload';
import JourneyDetail from '../components/journeyDetail';
import TargetPlaceInfoProvider from '../contexts/TargetPlaceInfoContext';
import TotalPlaceInfoProvider from '../contexts/TotalPlaceInfoContext';

export default function JourneyDetailPage() {
  useBeforeunload((event) => {
    event.preventDefault();
  });

  return (
    <TotalPlaceInfoProvider>
      <TargetPlaceInfoProvider>
        <JourneyDetail />
      </TargetPlaceInfoProvider>
    </TotalPlaceInfoProvider>
  );
}
