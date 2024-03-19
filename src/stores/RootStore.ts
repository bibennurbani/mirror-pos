// src/stores/RootStore.ts
import { model, Model, modelAction, prop, registerRootStore } from "mobx-keystone";
import { AppStore } from "./AppStore";
import { ApiStore } from "./ApiStore";
import { PageStore } from "./PageStore";
import { SupabaseStore } from "./SupabaseStore"; // Ensure you import SupabaseStore

@model("RootStore")
export class RootStore extends Model({
  supabase: prop<SupabaseStore>(),
  app: prop<AppStore>(),
  api: prop<ApiStore>(),
  page: prop<PageStore>(),
}) {
  @modelAction
  initializeStores() {
    console.log('🚀 ~ RootStore ~ initializeStores ~ initializeStores:')
    this.supabase = new SupabaseStore(this);
    this.app = new AppStore(this);
    this.api = new ApiStore(this);
    this.page = new PageStore(this);
  }
}

// Create a new instance of the root store
const rootStoreInstance = new RootStore({ app: {} as AppStore, api: {} as ApiStore, page: {} as PageStore, supabase: {} as SupabaseStore });

// Initialize and link child stores
rootStoreInstance.initializeStores();

registerRootStore(rootStoreInstance);

export default rootStoreInstance;
