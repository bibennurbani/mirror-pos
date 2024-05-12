import { Model, model } from "mobx-keystone";
import { RootStore } from "./RootStore";
import { ProfilePageStore } from "./pages/ProfilePageStore";

@model("PageStore")
export class PageStore extends Model({}) {
    rootStore: RootStore;
    profilePage: ProfilePageStore;
    loading: boolean = false;

    constructor(rootStore: RootStore) {
        super({});
        this.rootStore = rootStore;
        this.profilePage = new ProfilePageStore(rootStore);
    }

    // Similarly, actions and computed values can access this.rootStore
}