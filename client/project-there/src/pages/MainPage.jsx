import React from 'react';
import JourneyList from '../components/main/JourneyList';
import JourneyListProvider from '../contexts/journeyList';

export default function MainPage() {
  return (
    <JourneyListProvider>
      <div>
        <JourneyList />
        <div>카테고리</div>
      </div>
    </JourneyListProvider>
  );
}
