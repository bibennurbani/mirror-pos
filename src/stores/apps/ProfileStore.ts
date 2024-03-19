import { model, Model, prop, modelAction } from "mobx-keystone";
import { Profile } from "../../types";
import { handleError } from "../../utils/errorHandler";
import { RootStore } from "../RootStore";


@model("ProfileStore")
export class ProfileStore extends Model({
  isLoading: prop<boolean>(false).withSetter(),
  error: prop<string | null>(null).withSetter(),
  profile: prop<Profile | null>(null).withSetter(),
}) {

  rootStore: RootStore;
  

  constructor(rootStore: RootStore) {
    super({
      profile: null,
      error: null,
      isLoading: false
    });
    this.rootStore = rootStore;
  }

  @modelAction
  async fetchProfile(userId: string): Promise<Profile | undefined> {
    this.setIsLoading(true);
    try {
      const profile = await this.rootStore.api.profile.getById(userId);
      if (profile) {
        this.setProfile(profile)
        this.setError(null); // Clear error after successful fetch
        console.log('🚀 ~ ProfileStore ~ fetchProfile ~ profile:', this.profile)
        return profile;
      } else {
        this.setError('Profile not found.');
      }
    } catch (error) {
      const errorMessage = handleError(error);
      this.setError('Error fetching profile: ' + errorMessage);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  @modelAction
  async updateProfile(profileData: Partial<Profile>): Promise<void> {
    if (!this.profile) {
      this.setError('No profile selected for update.');
      return;
    }
    this.setIsLoading(true);
    try {
      await this.rootStore.api?.profile.update(this.profile.id, profileData);
      this.setProfile({ ...this.profile, ...profileData });
      this.setError(null); // Clear error after successful update
    } catch (error) {
      const errorMessage = handleError(error);
      this.setError('Error fetching profile: ' + errorMessage);
    } finally {
      this.setIsLoading(false);
    }
  }
}
