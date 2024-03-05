import { model, Model, prop, registerRootStore } from "mobx-keystone";
import { SupabaseClientStore } from "./SupabaseClientStore";
import { AppStore } from "./AppStore";
import { ApiStore } from "./ApiStore";

@model("budgetapp/RootStore")
export class RootStore extends Model({
  supabaseClient: prop<SupabaseClientStore>(),
  app: prop<AppStore | undefined>(),
  api: prop<ApiStore | undefined>(),
}) {
  constructor() {
    super({
      supabaseClient: new SupabaseClientStore({}),
      app: undefined,
      api: undefined
    });

    this.supabaseClient = new SupabaseClientStore({});
    this.app = new AppStore(this); // Pass RootStore reference
    this.api = new ApiStore(this); // Pass RootStore reference

    registerRootStore(this);
  }
}