import React, { useEffect } from 'react';
import JourneyUploadContainer from '../components/journeyUpload/JourneyUploadContainer';
import { useAuthActions } from '../contexts/auth';
import NewJourneyProvider from '../contexts/newJourney';
import { getAccessToken } from '../lib/utills/controlAccessToken';

function JourneyUploadPage() {
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
    <NewJourneyProvider>
      <JourneyUploadContainer />
    </NewJourneyProvider>
  );
}

export default JourneyUploadPage;
