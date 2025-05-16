import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

const AuthRoute = () => {
  const authService = useAuth();

  return authService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
