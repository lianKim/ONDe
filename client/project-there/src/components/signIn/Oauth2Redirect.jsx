import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setRefreshToken } from '../../lib/utills/controlRefreshToken';
import { setAccessToken } from '../../lib/utills/controlAccessToken';

function Oauth2Redirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const expirationTime = params.get('expirationTime');
    // 이메일, 이름 (email, name) 추가될 예정!
    setRefreshToken(refreshToken, expirationTime);
    setAccessToken(accessToken);

    window.location.replace('/test');
  }, []);

  // return <></>;
}

export default Oauth2Redirect;
