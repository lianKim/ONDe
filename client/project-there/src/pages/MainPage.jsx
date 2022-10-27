import React from 'react';
import JourneyList from '../components/main/JourneyList';
import Main from '../components/main/Main';
import JourneyListProvider from '../contexts/journeyList';

export default function MainPage() {
  return (
    <JourneyListProvider>
      <Main />
    </JourneyListProvider>
  );
}
