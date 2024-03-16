import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATH_AUTH } from "../routes/paths";

// Define props type to include children
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to={PATH_AUTH.login} replace />;
  }

  // If authenticated, render the children passed to ProtectedRoute
  return <>{children}</>;
};

export default ProtectedRoute;
