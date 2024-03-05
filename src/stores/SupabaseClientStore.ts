import { Model, model, modelAction, prop } from "mobx-keystone";
import { User, Session } from "@supabase/supabase-js";
import { computed } from "mobx";
import { supabase } from "../supabaseClient";

@model("SupabaseClientStore")
export class SupabaseClientStore extends Model({
  // Properties are now optional and don't have to be initialized immediately
  user: prop<User | null>(null).withSetter(),
  session: prop<Session | null>(null).withSetter(),
}) {

  @modelAction
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    
    return {user: data.user, session:data.session, error}
  }

  @modelAction
  signOut() {
    supabase.auth.signOut();
    localStorage.clear();
    this.user = null;
    this.session = null;
    // Consider clearing specific Supabase-related items from local storage if needed
  }

  @modelAction
  async signUp(email: string, password: string) {
    console.log('🚀 ~ SupabaseClientStore ~ signUp ~ password:', password)
    console.log('🚀 ~ SupabaseClientStore ~ signUp ~ email:', email)
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log('🚀 ~ SupabaseClientStore ~ signUp ~ supabase:', supabase)
    console.log('🚀 ~ SupabaseClientStore ~ signUp ~ error:', error)
    console.log('🚀 ~ SupabaseClientStore ~ signUp ~ data:', data)

    if (error) throw error;

    console.log('🚀 ~ SupabaseClientStore ~ signUp ~ data:', data);
    console.log('🚀 ~ SupabaseClientStore ~ signUp ~ error:', error);
    
    return {user: data.user, session:data.session, error}
  }

  @modelAction
  getSession() {
    supabase.auth.getSession().then(({ data: { session } }) => {
        this.setSession(session)
        this.setUser(session?.user ?? null)
    });
  }

  // Getter to expose the Supabase client for direct queries from components
  @computed
  get client() {
    return supabase;
  }

  // @computed
  // get rpc() {
  //   const profile = {
  //       fetch: async () => {return this.createFetcher('profile', '*')},
  //       insert: () => {},
  //       update: () => {},
  //       delete: () => {},
  //   }

  //   return {
  //       profile
  //   }
  // }

  
  // createFetcher = async (table:string,fields:string) => {
  //   const query = this.client.from(table).select(fields)
  //   const { data, error, status } = await query;
  //   console.log('🚀 ~ SupabaseClientStore ~ createFetcher= ~ status:', status)
  //   console.log('🚀 ~ SupabaseClientStore ~ createFetcher= ~ error:', error)
  //   console.log('🚀 ~ SupabaseClientStore ~ createFetcher= ~ data:', data)

  //   return data;
  // }

  
}
