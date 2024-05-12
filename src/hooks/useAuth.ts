import { useContext } from 'react';
// Can use different context the context should have this props

// interface AuthContextType {
//   user: User | null;
//   client: thecontextStore;
//   isLoadingAuth: boolean
//   // Include any additional methods or properties you want to expose through the context
// }
// import { AuthContext } from './JwtContext';
// import { AuthContext } from './Auth0Context';
// import { AuthContext } from './FirebaseContext';
// import { AuthContext } from './AwsCognitoContext';
import { AuthContext } from '../contexts/AuthContext';

// ----------------------------------------------------------------------

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
