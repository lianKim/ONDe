import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAccessToken } from '../lib/utills/controlAccessToken';
import { authAPI } from '../lib/utills/http';

const AuthValueContext = createContext();
const AuthActionsContext = createContext();

const initialState = {
  id: '',
  email: '',
  name: '',
  profileImageUrl: '',
};

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(initialState);
  // const accessToken = getAccessToken();

  const actions = useMemo(() => ({
    // 유저 인증
    async authenticateUser(accessToken) {
      try {
        const { id, email, name, profileImageUrl } = await authAPI(accessToken);
        console.log(`id: ${id}`);
        setUserInfo((prev) => ({ ...prev, id, email, name, profileImageUrl }));
      } catch (err) {
        console.log(err);
      }
    },

    // 유저 정보 초기화
    initUserInfo() {
      setUserInfo(initialState);
    },
  }));

  // const authenticationUser = useCallback(async (accessToken) => {
  //   try {
  //     const { id, email, name, profileImageUrl } = await authAPI(accessToken);
  //     console.log(`id: ${id}`);
  //     setUserInfo((prev) => ({ ...prev, id, email, name, profileImageUrl }));
  //   } catch (err) {
  //     // const { errCode, errMessage } = err.response.data;
  //     // console.log(errCode);
  //     // console.log(errMessage);
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   authenticationUser();
  // }, []);

  // const { authenticationUser } = useAuthActions();
  // const accessToken = getAccessToken();

  // useEffect(() => {
  //   // 마운트 될 때 accessToken으로 받은 유저 정보 업데이트
  //   authenticationUser(accessToken);
  //   // 언마운트 될 때 유저 정보 초기화
  //   () => initUserInfo();
  // }, []);

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
