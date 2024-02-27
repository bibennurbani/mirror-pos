import { Model, model, modelAction, prop } from "mobx-keystone";
import { SupabaseClient, createClient, User, Session } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_API_URL } from "../config/env";
import { computed } from "mobx";

@model("SupabaseClientStore")
export class SupabaseClientStore extends Model({
  // Properties are now optional and don't have to be initialized immediately
  user: prop<User | null>(null).withSetter(),
  session: prop<Session | null>(null).withSetter(),
}) {
  // Initialize the Supabase client
  private supabase: SupabaseClient = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);

  @modelAction
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    
    return {user: data.user, session:data.session}
  }

  @modelAction
  signOut() {
    this.supabase.auth.signOut();
    localStorage.clear();
    this.user = null;
    this.session = null;
    // Consider clearing specific Supabase-related items from local storage if needed
  }

  @modelAction
  getSession() {
    this.client.auth.getSession().then(({ data: { session } }) => {
        this.setSession(session)
        this.setUser(session?.user ?? null)
    });
  }

  // Getter to expose the Supabase client for direct queries from components
  @computed
  get client() {
    return this.supabase;
  }

  
}
