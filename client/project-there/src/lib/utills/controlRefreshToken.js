// -> Cookie.js

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken, refreshTokenExpirationTime) => {
  const today = new Date();
  today.setMilliseconds(today.getMilliseconds() + refreshTokenExpirationTime);

  return cookies.set('refresh_token', refreshToken, {
    path: '/',
    expires: new Date(today),
  });
};

export const getRefreshToken = () => cookies.get('refresh_token');

export const removeRefreshToken = () =>
  cookies.remove('refresh_token', { path: '/' });
