import React, { useEffect } from 'react';
import JourneyList from '../components/main/JourneyList';
import Main from '../components/main/Main';
import JourneyListProvider from '../contexts/journeyList';
import { getAccessToken } from '../lib/utills/controlAccessToken';
import { useAuthActions } from '../contexts/auth';

export default function MainPage() {
  // 유저 인증
  const { authenticateUser, initUserInfo } = useAuthActions();
  const accessToken = getAccessToken();

  useEffect(() => {
    // 마운트 될 때 accessToken으로 받은 유저 정보 업데이트
    authenticateUser(accessToken);

    // 언마운트 될 때 유저 정보 초기화
    return () => initUserInfo();
  }, []);

  return <Main />;
}
