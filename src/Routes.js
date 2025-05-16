import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import RentalHome from './pages/RentalHome';
import RentalDetail from './pages/RentalDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SecretPage from './pages/SecretPage';

import AuthRoute from 'components/auth/AuthRoute';
import GuestRoute from 'components/auth/GuestRoute';

const AppRoutes = () => {
  return (
    <div className="container bwm-container">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<RentalHome />} />
        <Route path="/rentals/:id" element={<RentalDetail />} />

        {/* Protected route */}
        <Route element={<AuthRoute />}>
          <Route path="/secret" element={<SecretPage />} />
        </Route>

        {/* Guest-only routes */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
