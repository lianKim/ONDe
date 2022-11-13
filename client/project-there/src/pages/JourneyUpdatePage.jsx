import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JourneyUpdateContainer from '../components/journeyUpdate/JourneyUpdateContainer';
import { useAuthActions } from '../contexts/auth';
import NewJourneyProvider from '../contexts/NewJourneyContext';
import { getAccessToken } from '../lib/utills/controlAccessToken';

function JourneyUpdatePage() {
  const params = useParams();

  // 유저 인증
  const { authenticateUser } = useAuthActions();

  useEffect(() => {
    // 마운트 될 때 accessToken으로 받은 유저 정보 업데이트
    const accessToken = getAccessToken();
    if (accessToken) {
      console.log(accessToken);
      authenticateUser(accessToken);
    }
  }, []);

  return (
    <NewJourneyProvider>
      <JourneyUpdateContainer journeyId={params.journeyId} />
    </NewJourneyProvider>
  );
}

export default JourneyUpdatePage;
