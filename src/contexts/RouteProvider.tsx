// RouteProvider.tsx
import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATH_AUTH, PATH_DASHBOARD } from "../routes/paths";
import ProtectedRoute from "../routes/ProtectedRoute";
import DashboardPage from "../components/mains/DashboardPage";
import LoginPage from "../components/auths/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import SignUpPage from "../components/auths/SignUpPage";

interface RouteProviderProps {
  children?: ReactNode; // Ensure this is here
}

const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  // Suppose useAuth hook is accessible here, either directly or by lifting state up
  // This is conceptual; you'll adjust based on your auth state management
  const { user } = useAuth(); // Make sure you have access to your auth state here

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={PATH_DASHBOARD.root} />
            ) : (
              <Navigate to={PATH_AUTH.login} />
            )
          }
        />
        <Route path={PATH_AUTH.login} element={<LoginPage />} />
        <Route path={PATH_AUTH.register} element={<SignUpPage />} />
        <Route
          path={PATH_DASHBOARD.root}
          element={<ProtectedRoute component={DashboardPage} />}
        />
        {/* Define other routes and potentially protected routes as needed */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {children}
    </BrowserRouter>
  );
};

export default RouteProvider;
