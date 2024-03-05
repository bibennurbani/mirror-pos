// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PATH_AUTH } from './paths';

interface ProtectedRouteProps {
  component: React.ElementType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATH_AUTH.login} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
