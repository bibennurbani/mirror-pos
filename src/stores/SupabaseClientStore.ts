import { Model, model, modelAction, prop } from "mobx-keystone";
import { User, Session } from "@supabase/supabase-js";
import { computed } from "mobx";
import { supabase } from "../supabaseClient";

@model("SupabaseClientStore")
export class SupabaseClientStore extends Model({
  user: prop<User | null>(null).withSetter(),
  session: prop<Session | null>(null),
}) {
  // Properties are now optional and don't have to be initialized immediately
  isAuthed: boolean = false;
  isInitialized: boolean = false;

  @modelAction
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if(data.user && data.session){
      this.setSession(data.session);
    }

    if (error) throw error;

    return { user: data.user, session: data.session, error }
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
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    return { user: data.user, session: data.session, error }
  }

  @modelAction
  getSession() {
    this.client.auth.getSession().then(({ data: { session } }) => {
      if (session){
        this.setSession(session)
      }
    });
  }

  @modelAction
  setSession(session: Session) {
    this.session = session;
    this.isAuthed = !!session;
    this.setUser(session.user);
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

  //   return data;
  // }


}
