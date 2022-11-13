import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/serverBaseUrl';
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

// const instance = axios.create({
//   baseURL: SERVER_BASE_URL,
// });

// const createInstance = () =>
//   axios.create({
//     baseURL: SERVER_BASE_URL,
//   });

const setInterceptors = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // res에서 err가 발생했을 경우 catch로 넘어가기 전에 처리하는 부분
      const { errorCode } = error.response.data;
      const originalRequest = error.config;

      console.log(errorCode);
      console.log(originalRequest);

      if (errorCode === 'EXPIRED_ACCESS_TOKEN' && !originalRequest.retry) {
        originalRequest.retry = true;
        const prevRefreshToken = getRefreshToken();
        const prevAccessToken = getAccessToken();

        return instance
          .post('/member/reissue', {
            prevAccessToken,
            prevRefreshToken,
          })
          .then((res) => {
            console.log(res);

            const { accessToken, refreshToken } = res.data;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            // 강제 새로고침
            window.location.reload();

            console.log(originalRequest);
            return axios(originalRequest);
          })
          .catch((err) => {
            console.log('토큰 재발행 에러');
            console.log(err);
            removeRefreshToken();
            removeAccessToken();

            delete originalRequest?.headers?.Authorization;

            // 강제 새로고침
            window.location.reload();
            return false;
          });
      }

      return Promise.reject(error);
    },
  );
  return instance;
};

// // NEW Interceptors
// const setInterceptors = (instance) => {
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       // res에서 err가 발생했을 경우 catch로 넘어가기 전에 처리하는 부분
//       const { errorCode } = error.response.data;
//       const originalRequest = error.config;

//       // 로그 확인
//       console.log(`errorCode ::: ${errorCode}`);
//       console.log('originalRequest ::: ');
//       console.log(originalRequest);

//       if (error.response && errorCode === 'EXPIRED_ACCESS_TOKEN') {
//         try {
//           const refreshToken = await getRefreshToken();
//           const accessToken = await getAccessToken();
//           const res = await instance.post('/member/reissue', {
//             accessToken,
//             refreshToken,
//           });
//           const { newAccessToken, newRefreshToken } = res.data;
//           setAccessToken(newAccessToken);
//           setRefreshToken(newRefreshToken);

//           window.location.reload();
//         } catch (err) {
//           console.log('error', err.response);
//           delete originalRequest?.headers?.Authorization;

//           window.location.reload();
//         }
//       }

//       return Promise.reject(error);
//     },
//   );
//   return instance;
// };

const baseAPI = () => {
  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
  });

  // return setInterceptors(instance);
  return instance;
};

const authAPI = () => {
  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
  });

  const accessToken = getAccessToken();
  if (accessToken) {
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // instance.headers.Authorization = `Bearer ${accessToken}`;
  }

  // return setInterceptors(instance);
  return instance;
};

export const baseAxios = baseAPI();
export const authAxios = authAPI();
