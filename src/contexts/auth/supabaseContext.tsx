import React, { createContext, useEffect, ReactNode, useState } from "react";
import { observer } from "mobx-react-lite"; // For observing MobX state changes
import { useStore } from "../../hooks/useStore";
import { User } from "@supabase/supabase-js";
import { SupabaseClientStore } from "../../stores/SupabaseClientStore";

interface AuthContextType {
  user: User | null;
  client: SupabaseClientStore;
  isLoadingAuth: boolean
  // Include any additional methods or properties you want to expose through the context
}

export const SupabaseAuthContext = createContext({} as AuthContextType);

export const SupabaseAuthProvider: React.FC<{ children: ReactNode }> = observer(
  ({ children }) => {
    const { supabaseClient } = useStore().rootStore;
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
      supabaseClient.getSession();

      const { data: authListener } =
        supabaseClient.client.auth.onAuthStateChange((_event, session) => {
          if (session) supabaseClient.setSession(session);
          setIsLoadingAuth(false);
        });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }, [supabaseClient]);

    return (
      <SupabaseAuthContext.Provider
        value={{ user: supabaseClient.user, client: supabaseClient, isLoadingAuth: isLoadingAuth }}
      >
        {children}
      </SupabaseAuthContext.Provider>
    );
  }
);
