// src/stores/ProfileUIStore.ts
import { Model, model, prop, modelAction } from "mobx-keystone";
import { ProfileI } from "../apps/ProfileStore";
import { RootStore } from "../RootStore";

@model("ProfileUIStore")
export class ProfilePageStore extends Model({
  isEditMode: prop<boolean>(false),
  // Initial profile form fields - could be empty or populated with an existing profile
  profileForm: prop<Partial<ProfileI>>(),
}) {
    rootStore: RootStore;

    constructor(rootStore : RootStore) {
        super({
            profileForm: {} as ProfileI
        });
        this.setEditMode(false);

        this.rootStore = rootStore;
    }

  @modelAction
  setEditMode(isEditMode: boolean) {
    this.isEditMode = isEditMode;
  }

  @modelAction
  setProfileForm(profile: Partial<ProfileI>) {
    this.profileForm = profile;
  }

  @modelAction
  updateProfileField(field: keyof ProfileI, value: string) {
    this.profileForm[field] = value;
  }

}
