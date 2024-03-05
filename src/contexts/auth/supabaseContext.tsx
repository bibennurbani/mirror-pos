import React, { createContext, useEffect, ReactNode } from "react";
import { observer } from "mobx-react-lite"; // For observing MobX state changes
import { useStore } from "../../hooks/useStore";
import { User } from "@supabase/supabase-js";
import { SupabaseClientStore } from "../../stores/SupabaseClientStore";

interface AuthContextType {
  user: User | null;
  supabase: SupabaseClientStore;
  // Include any additional methods or properties you want to expose through the context
}

export const SupabaseAuthContext = createContext<AuthContextType>({} as AuthContextType);

export const SupabaseAuthProvider: React.FC<{ children: ReactNode }> = observer(({ children }) => {
  const {
    rootStore: { supabaseClient },
  } = useStore();

  useEffect(() => {
    // Initial check for an existing session and user
    supabaseClient.getSession();

    // Listen for auth state changes
    const { data: {subscription} } = supabaseClient.client.auth.onAuthStateChange((_event, session) => {
      supabaseClient.setSession(session);
      supabaseClient.setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabaseClient, supabaseClient.user]);

  // Use useObserver to make sure React component reacts to MobX state changes
  return (
    <SupabaseAuthContext.Provider value={{ user: supabaseClient.user, supabase: supabaseClient }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
});