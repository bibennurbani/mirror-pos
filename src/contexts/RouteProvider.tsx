import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATH_AUTH, PATH_DASHBOARD } from "../routes/paths";
import ProtectedRoute from "../routes/ProtectedRoute";
import DashboardPage from "../components/mains/DashboardPage";
import LoginPage from "../components/auths/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import SignUpPage from "../components/auths/SignUpPage";
import ProfilePage from "../components/mains/ProfilePage";

const RouteProvider: React.FC = () => {
  const { user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return <div>Loading...</div>; // Show a loading indicator or return null
  }


  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect base URL based on authentication status */}
        <Route
          path="/"
          element={user ? <Navigate replace to={PATH_DASHBOARD.root} /> : <Navigate replace to={PATH_AUTH.login} />}
        />

        {/* Public routes */}
        <Route path={PATH_AUTH.login} element={<LoginPage />} />
        <Route path={PATH_AUTH.register} element={<SignUpPage />} />

        {/* Protected routes wrapped in a ProtectedRoute component */}
        <Route
          path={PATH_DASHBOARD.root}
          element={
            <ProtectedRoute>
              <DashboardPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH_DASHBOARD.profile}
          element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
