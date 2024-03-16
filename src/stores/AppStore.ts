import { Model, model } from 'mobx-keystone';
import { RootStore } from './RootStore';
import { ProfileStore } from './apps/ProfileStore';

@model("AppStore")
export class AppStore  extends Model({}){
  rootStore: RootStore;
  profile: ProfileStore;
  loading: boolean = false;

  constructor(rootStore: RootStore) {
    super({});
    this.rootStore = rootStore;
    this.profile = new ProfileStore(rootStore); // Pass RootStore if needed
  }

  // Actions and computed values that use this.rootStore to access other stores
}