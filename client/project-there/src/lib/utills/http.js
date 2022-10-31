import axios from 'axios';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from './controlAccessToken';
import {
  getRefreshToken,
  removeRefreshToken,
  setRefreshToken,
} from './controlRefreshToken';

const http = axios.create({
  baseURL: 'http://localhost:8080/',
});

// interceptors 때문에 axios 버전 낮춰야 함
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // res에서 err가 발생했을 경우 catch로 넘어가기 전에 처리하는 부분
    const { errorCode } = error.response.data;
    const originalRequest = error.config;

    if (errorCode === 'EXPIRED_ACCESS_TOKEN' && !originalRequest.retry) {
      originalRequest.retry = true;
      const prevRefreshToken = getRefreshToken();
      const prevAccessToken = getAccessToken();

      return axios
        .post('http://localhost:8080/member/reissue', {
          prevAccessToken,
          prevRefreshToken,
        })
        .then((res) => {
          const { accessToken, refreshToken } = res.data;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        })
        .catch((err) => {
          console.log('토큰 재발행 에러');
          console.log(err);
          removeRefreshToken();
          removeAccessToken();
          return false;
        });
    }

    return Promise.reject(error);
  },
);

// 반환값 로그인한 회원 이름
export const authAPI = async (accessToken) => {
  try {
    const response = await http.get('/member/auth', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    const { errorCode, errorMessage } = e.response.data;
    if (errorCode === 'INVALID_ACCESS_TOKEN') {
      alert('다시 로그인 해주세요!');
    }
    window.location.replace('/signin');
  }
};

// 반환값 boolean
// true: 사용 가능한 이메일, false: 사용 불가능한 이메일
export const checkEmailAPI = async (email) => {
  try {
    const response = await http.post('/members/check/email', { email });
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 반환값 boolean
// true: 사용 가능한 아이디, false: 사용 불가능한 아이디
export const checkIdAPI = async (id) => {
  try {
    const response = await http.post('/members/check/id', { id });
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 반환값 메세지, 이메일
export const signupAPI = async ({ id, email, name, password }) => {
  try {
    const response = await http.post('/members/signup', {
      id,
      email,
      name,
      password,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 반환값 accessToken, grantType, refreshToken, refreshTokenExpirationTime
export const signinAPI = async (id, password) => {
  try {
    const response = await http.post('/members/signin', {
      id,
      password,
    });

    // 토큰
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
