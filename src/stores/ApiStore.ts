import { RootStore } from "./RootStore";
import ProfileApi from "./apis/ProfileApi";

export class ApiStore {
    rootStore: RootStore;
    profile: ProfileApi;
    loading: boolean = false;
  
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
      this.profile = new ProfileApi(rootStore);
    }
  
    // Similarly, actions and computed values can access this.rootStore
  }