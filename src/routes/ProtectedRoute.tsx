import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../hooks/useAuth';
import { PATH_AUTH, PATH_DASHBOARD } from '../routes/paths';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
  onlyUnauthenticated?: boolean;
}

const ProtectedRoute = observer<ProtectedRouteProps>(({ children, redirectPath = PATH_DASHBOARD.root, onlyUnauthenticated = false }) => {
  const { client } = useAuth();
  const { currentUser, isInitialized } = client;

  if (!isInitialized) {
    return <div>Loading...</div>; // Or any loader component
  }

  // Redirect already authenticated users away from login/signup pages
  if (onlyUnauthenticated && currentUser) {
    return <Navigate replace to={redirectPath} />;
  }

  // Redirect unauthenticated users away from protected pages
  if (!onlyUnauthenticated && !currentUser) {
    return <Navigate replace to={PATH_AUTH.login} />;
  }

  return children;
});

export default ProtectedRoute;
