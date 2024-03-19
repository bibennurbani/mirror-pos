// src/contexts/StoreContext.tsx
import React, { ReactNode, createContext } from 'react';
import { RootStore } from '../stores/RootStore';

interface StoreProviderProps {
  root: RootStore;
}

export const StoreContext = createContext<StoreProviderProps>({} as StoreProviderProps);

export const StoreProvider: React.FC<{ children: ReactNode, root: RootStore }> = ({ children, root }) => {
  return (
    <StoreContext.Provider value={{root}}>{children}</StoreContext.Provider>
  );
};
