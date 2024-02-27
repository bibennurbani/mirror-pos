import { useContext } from 'react';
//
// import { AuthContext } from './JwtContext';
// import { AuthContext } from './Auth0Context';
// import { AuthContext } from './FirebaseContext';
// import { AuthContext } from './AwsCognitoContext';
import { SupabaseAuthContext } from '../contexts/auth/supabaseContext';

// ----------------------------------------------------------------------

export const useAuth = () => {
  const context = useContext(SupabaseAuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
