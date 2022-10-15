import React from 'react';
import Header from '../components/common/header/Header';
import JourneyList from '../components/main/JourneyList';

function MainPage() {
  return (
    <div>
      <JourneyList />
      <div>카테고리</div>
    </div>
  );
}

export default MainPage;
