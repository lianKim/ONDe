import React from 'react';
import { useParams } from 'react-router-dom';
import MyJourney from '../components/myJourney/MyJourney';

function MyJourneyPage() {
  const { memberId } = useParams();

  return <MyJourney memberId={memberId} />;
}

export default MyJourneyPage;
