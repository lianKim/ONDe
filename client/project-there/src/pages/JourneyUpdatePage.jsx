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
  const accessToken = getAccessToken();

  useEffect(() => {
    // 마운트 될 때 accessToken으로 받은 유저 정보 업데이트
    authenticateUser(accessToken);

    // 언마운트 될 때 유저 정보 초기화
    return () => initUserInfo();
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
