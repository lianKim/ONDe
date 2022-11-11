import React from 'react';
import JourneyDetail from '../components/journeyDetail';
import TargetPlaceInfoProvider from '../contexts/TargetPlaceInfoContext';
import TotalPlaceInfoProvider from '../contexts/TotalPlaceInfoContext';

export default function JourneyDetailPage() {
  return (
    <TotalPlaceInfoProvider>
      <TargetPlaceInfoProvider>
        <JourneyDetail />
      </TargetPlaceInfoProvider>
    </TotalPlaceInfoProvider>
  );
}
