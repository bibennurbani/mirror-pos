import React, { createContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { SupabaseStore } from '../stores/SupabaseStore';

interface AuthContextType {
  client: SupabaseStore;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode, client: SupabaseStore }> = observer(({ children, client }) => {
  return (
    <AuthContext.Provider value={{ client }}>
      {children}
    </AuthContext.Provider>
  );
});
