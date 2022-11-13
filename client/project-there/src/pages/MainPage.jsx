import React, { useEffect } from 'react';
import JourneyList from '../components/main/JourneyList';
import Main from '../components/main/Main';
import JourneyListProvider from '../contexts/JourneyListContext';
import { getAccessToken } from '../lib/utills/controlAccessToken';
import { useAuthActions } from '../contexts/auth';
import { baseAxios, authAxios } from '../lib/utills/customAxios';

export default function MainPage() {
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

  return <Main />;
}
