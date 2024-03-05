// src/hooks/useStore.ts
import React from 'react';
import { StoreContext } from '../contexts/StoreContext';

export const useStore = () => {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
