import { model, Model, prop, modelAction } from 'mobx-keystone';
import { Profile } from '../../types';
import { RootStore } from '../RootStore';

@model('ProfilePageStore')
export class ProfilePageStore extends Model({
  // UI-specific states such as form data and loading states
  profileFormData: prop<Partial<Profile>>(),
  isLoading: prop<boolean>(false).withSetter(),
}) {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    super({
      profileFormData: {},
    });
    this.rootStore = rootStore;
  }

  @modelAction
  setProfileFormData(profile: Partial<Profile>) {
    this.profileFormData = profile;
  }

  @modelAction
  async loadAndSetProfile(userId: string) {
    this.setIsLoading(true);
    try {
      console.log('🚀 ~ ProfilePageStore ~ loadAndSetProfile ~ this.rootStore.app.profile.profile:', this.rootStore.app.profile.profile);

      const profileData = this.rootStore.app.profile.profile ?? (await this.rootStore.app.profile.fetchProfile(userId));
      if (profileData) {
        this.setProfileFormData(profileData);
      }
    } catch (error) {
      console.error('Error loading profile', error);
    } finally {
      this.setIsLoading(false);
    }
  }

  @modelAction
  async saveProfileChanges(profileData: Partial<Profile>) {
    this.setIsLoading(true);
    try {
      await this.rootStore.app.profile.updateProfile(profileData);
      this.setProfileFormData({ ...this.profileFormData, ...profileData });
    } catch (error) {
      console.error('Error saving profile changes', error);
    } finally {
      this.setIsLoading(false);
    }
  }
}
