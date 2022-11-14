import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRefreshToken } from '../../lib/utills/controlRefreshToken';
import { setAccessToken } from '../../lib/utills/controlAccessToken';

function Oauth2Redirect() {
  const navigate = useNavigate();

  const getParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const isNewMember = params.get('newMember');

    if (isNewMember === 'true') {
      const name = params.get('name');
      const email = params.get('email');

      navigate('/signup', { state: { name, email } });
    } else if (isNewMember === 'false') {
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');
      const expirationTime = params.get('expirationTime');
      setRefreshToken(refreshToken, expirationTime);
      setAccessToken(accessToken);

      window.location.replace('/');
    }
  }, []);

  useEffect(() => {
    getParams();
  }, []);
}

export default Oauth2Redirect;
