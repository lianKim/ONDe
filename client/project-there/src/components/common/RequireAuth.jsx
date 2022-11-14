import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext';

function RequireAuth({ children }) {
  const { id } = useAuthValue();
  const location = useLocation();

  if (!id) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
