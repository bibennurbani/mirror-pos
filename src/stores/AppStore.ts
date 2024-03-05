import { RootStore } from './RootStore';
import { ProfileStore } from './apps/ProfileStore';

export class AppStore {
  rootStore: RootStore;
  profile: ProfileStore;
  loading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.profile = new ProfileStore(rootStore); // Pass RootStore if needed
  }

  // Actions and computed values that use this.rootStore to access other stores
}