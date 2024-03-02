import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../../lib/utills/controlAccessToken';

function RequireAuth({ children }) {
  const location = useLocation();
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
