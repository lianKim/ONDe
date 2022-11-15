import React, { createContext, useContext, useMemo, useState } from 'react';
import { authAPI } from '../lib/apis/auth';

const AuthValueContext = createContext();
const AuthActionsContext = createContext();

const initialState = {
  id: '',
  email: '',
  name: '',
  nickName: '',
  profileImageUrl: '',
};

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(initialState);

  const actions = useMemo(() => ({
    // 유저 인증
    async authenticateUser(accessToken) {
      try {
        const data = await authAPI(accessToken);
        if (data) setUserInfo({ ...data });

        return true;
      } catch (err) {
        console.log(err);
      }
    },

    // 유저 정보 초기화
    initUserInfo() {
      setUserInfo(initialState);
    },
  }));

  return (
    <AuthActionsContext.Provider value={actions}>
      <AuthValueContext.Provider value={userInfo}>
        {children}
      </AuthValueContext.Provider>
    </AuthActionsContext.Provider>
  );
}

export const useAuthValue = () => {
  const value = useContext(AuthValueContext);
  if (value === undefined) {
    throw new Error('useAuthValue should be used within JourneysProvider');
  }
  return value;
};

export const useAuthActions = () => {
  const value = useContext(AuthActionsContext);
  if (value === undefined) {
    throw new Error('useAuthActions should be used within JourneysProvider');
  }
  return value;
};
