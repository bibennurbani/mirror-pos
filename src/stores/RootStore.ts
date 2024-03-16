/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Model, registerRootStore } from "mobx-keystone";
import { SupabaseClientStore } from "./SupabaseClientStore";
import { AppStore } from "./AppStore";
import { ApiStore } from "./ApiStore";
import { PageStore } from "./PageStore";

@model("RootStore")
export class RootStore extends Model({}) {
  supabaseClient: SupabaseClientStore;
  api: ApiStore;
  app: AppStore;
  page: PageStore;

  constructor() {
    super({});
    // Properly initialize here
    this.supabaseClient = new SupabaseClientStore({});
    this.api = new ApiStore(this);
    this.app = new AppStore(this);
    this.page = new PageStore(this);

    registerRootStore(this);
  }
}
