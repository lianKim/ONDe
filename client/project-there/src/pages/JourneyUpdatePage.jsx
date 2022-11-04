import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JourneyUpdateContainer from '../components/journeyUpdate/JourneyUpdateContainer';
import JourneyUploadContainer from '../components/journeyUpload/JourneyUploadContainer';
import { useAuthActions } from '../contexts/auth';
import JourneyDetailProvider, {
  useJourneyDetailValue,
} from '../contexts/journeyDetail';
import NewJourneyProvider, {
  useNewJourneyActions,
} from '../contexts/newJourney';
import { getAccessToken } from '../lib/utills/controlAccessToken';

function JourneyUpdatePage() {
  const params = useParams();

  // 유저 인증
  const { authenticateUser, initUserInfo } = useAuthActions();

  useEffect(() => {
    // 마운트 될 때 accessToken으로 받은 유저 정보 업데이트
    const accessToken = getAccessToken();
    if (accessToken) {
      console.log(accessToken);
      authenticateUser(accessToken);
    }
  }, []);

  return (
    <JourneyDetailProvider>
      <NewJourneyProvider>
        <JourneyUpdateContainer journeyId={params.journeyId} />
      </NewJourneyProvider>
    </JourneyDetailProvider>
  );
}

export default JourneyUpdatePage;
