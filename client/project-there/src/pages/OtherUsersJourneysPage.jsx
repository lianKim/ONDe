import React from 'react';
import { useParams } from 'react-router-dom';
import OtherUsersJourneys from '../components/otherUsersJourneys/OtherUsersJourneys';

function OtherUsersJourneysPage() {
  const params = useParams();

  return <OtherUsersJourneys nickName={params.nickName} />;
}

export default OtherUsersJourneysPage;
