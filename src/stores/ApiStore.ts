import { Model, model } from "mobx-keystone";
import { RootStore } from "./RootStore";
import ProfileApi from "./apis/ProfileApi";

@model("ApiStore")
export class ApiStore  extends Model({}){
    rootStore: RootStore;
    profile: ProfileApi;
    loading: boolean = false;
  
    constructor(rootStore: RootStore) {
      super({});
      this.rootStore = rootStore;
      this.profile = new ProfileApi(rootStore);
    }
  
    // Similarly, actions and computed values can access this.rootStore
  }