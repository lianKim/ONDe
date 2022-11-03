import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/serverBaseUrl';
import { getAccessToken } from './controlAccessToken';

const baseAPI = () =>
  axios.create({
    baseURL: SERVER_BASE_URL,
  });

const authAPI = () => {
  const accessToken = getAccessToken();
  const instance = baseAPI();
  if (accessToken) {
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  return instance;
};

export const baseAxios = baseAPI();
export const authAxios = authAPI();
