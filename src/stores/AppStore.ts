// src/stores/AppStore.ts
import { model, Model, prop } from "mobx-keystone";
import { RootStore } from "./RootStore";
import { ProfileStore } from "./apps/ProfileStore";

@model("AppStore")
export class AppStore extends Model({
  // Assuming ProfileStore is already a mobx-keystone model
  profile: prop<ProfileStore>(),
}) {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    super({
      // Initialize the ProfileStore with reference to the AppStore or RootStore if needed
      profile: new ProfileStore(rootStore),
    });
    this.rootStore = rootStore;
  }

}
