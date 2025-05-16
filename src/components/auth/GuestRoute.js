import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

const GuestRoute = () => {
  const authService = useAuth();
  return !authService.isAuthenticated()
    ? <Outlet />
    : <Navigate to="/" />;
};

export default GuestRoute;
