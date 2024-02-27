import React from "react";
import { RootStore } from "../stores/RootStore";

interface StoreContextValue {
  rootStore: RootStore;
}

export const StoreContext = React.createContext<StoreContextValue>({} as StoreContextValue);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rootStore = React.useMemo(() => new RootStore({}), []);

  return (
    <StoreContext.Provider value={{ rootStore }}>
      {children}
    </StoreContext.Provider>
  );
};
