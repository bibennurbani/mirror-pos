// src/stores/StoreContext.tsx
import React from 'react';
import BudgetStore from './BudgetStore';

interface StoreContextValue {
  budgetStore: BudgetStore;
}

export const StoreContext = React.createContext<StoreContextValue>({} as StoreContextValue);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const budgetStore = new BudgetStore();

  return (
    <StoreContext.Provider value={{ budgetStore }}>
      {children}
    </StoreContext.Provider>
  );
};
