import React from 'react';
import JourneyDetail from '../components/journeyDetail';
import TargetPlaceInfoProvider from '../contexts/TargetPlaceInfoContext';

export default function JourneyDetailPage() {
  return (
    <TargetPlaceInfoProvider>
      <JourneyDetail />
    </TargetPlaceInfoProvider>
  );
}
