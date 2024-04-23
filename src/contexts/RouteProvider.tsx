import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../components/mains/DashboardPage';
import LoginPage from '../components/auths/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import SignUpPage from '../components/auths/SignUpPage';
import ProfilePage from '../components/mains/ProfilePage';
import { PATH_AUTH, PATH_DASHBOARD } from '../routes/paths';
import ProtectedRoute from '../routes/ProtectedRoute';

export const RouteProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to={PATH_DASHBOARD.root} />} />
        {/* Use ProtectedRoute to handle redirection logic based on authentication status */}
        <Route
          path={PATH_AUTH.login}
          element={
            <ProtectedRoute onlyUnauthenticated={true} redirectPath={PATH_DASHBOARD.root}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH_AUTH.register}
          element={
            <ProtectedRoute onlyUnauthenticated={true} redirectPath={PATH_DASHBOARD.root}>
              <SignUpPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes that require authentication */}
        <Route
          path={PATH_DASHBOARD.root}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH_DASHBOARD.profile}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unmatched routes */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
