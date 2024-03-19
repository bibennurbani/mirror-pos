// src/stores/SupabaseStore.ts
import { model, Model, modelAction, prop } from 'mobx-keystone';
import { supabase } from '../supabaseClient';
import { AuthError, AuthResponse, AuthTokenResponsePassword, Session, User } from '@supabase/supabase-js';
import { RootStore } from './RootStore';
import { computed } from 'mobx';
import { handleError } from '../utils/errorHandler';

@model("SupabaseStore")
export class SupabaseStore extends Model({
  session: prop<Session | null>(null).withSetter(),
  currentUser: prop<User | null>(null).withSetter(),
  isInitialized: prop<boolean>(false).withSetter(),
  isAuthenticated: prop<boolean>(false).withSetter(),
  error: prop<string | null>(null),
}) {

  rootStore: RootStore; // Injecting RootStore for cross-store interaction

  constructor(rootStore: RootStore) {
    super({});
    this.rootStore = rootStore;
    this.initAuthListener();
    this.checkInitialSession();
  }
  @modelAction
  setError(error: string | null) {
    this.error = error;
  }

  @modelAction
  initAuthListener() {
    supabase.auth.onAuthStateChange((_event, session) => {
      this.setSession(session);
      this.setCurrentUser(session?.user || null);
      this.setIsAuthenticated(!!session);
    });
  }

  @modelAction
  async checkInitialSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting initial session:", error.message);
      return;
    }
    this.setSession(data.session);
    this.setCurrentUser(data.session?.user || null);
    this.setIsAuthenticated(!!data.session);
    this.setIsInitialized(true); // Indicates the store has been initialized and the initial auth state checked
  }

  @modelAction
  async register(email: string, password: string): Promise<AuthResponse> {
    console.log('🚀 ~ SupabaseStore ~ register ~ email:', email)
    console.log('🚀 ~ SupabaseStore ~ register ~ email:', password)
    try {
      const response = await supabase.auth.signUp({ email, password });
      if (response.error) throw response.error;
      this.setSession(response.data.session);
      this.setCurrentUser(response.data.user);
      return {
        data: { user: response.data.user, session: response.data.session },
        error: null, // No error occurred, so this is explicitly null
      };
    } catch (error) {
      // Construct an AuthResponse object that signifies an error condition
      const authResponseError: AuthResponse = {
        data: { user: null, session: null }, // Indicating that no successful registration took place
        error: new AuthError(handleError(error)), // Use your existing handleError function or directly use the error
      };
      this.setError('Error register: ' + authResponseError.error);
      return authResponseError;
    }
  }


  @modelAction
  async signIn(email: string, password: string): Promise<AuthTokenResponsePassword | undefined> {
    try {
      const response = await supabase.auth.signInWithPassword({ email, password });
      if (response.error) throw response.error;
      this.setSession(response.data.session);
      this.setCurrentUser(response.data.user);
      this.setIsAuthenticated(!!response.data.session);
      return response;
    } catch (error) {
      const errorMessage = handleError(error);
      this.setError('Error signIn: ' + errorMessage);

    }

  }

  @modelAction
  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.setSession(null);
      this.setCurrentUser(null);
      this.setIsAuthenticated(false);
    } catch (error) {
      const errorMessage = handleError(error);
      this.setError('Error signIn: ' + errorMessage);

    }

  }

  @computed
  get client() {
    return supabase;
  }

  // More actions related to Supabase functionality can be added here
}
