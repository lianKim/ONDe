import React from 'react';
import PlaceUpload from '../components/placeUpload';
import PlaceInfoProvider from '../contexts/PlaceInfoContext';

export default function PlaceUploadPage() {
  return (
    <PlaceInfoProvider>
      <PlaceUpload />
    </PlaceInfoProvider>
  );
}
