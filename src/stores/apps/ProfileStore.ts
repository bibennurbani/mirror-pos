// src/stores/ProfileStore.ts
import { Model, model, modelAction, prop } from 'mobx-keystone';
import { RootStore } from '../RootStore';
import { handleError } from '../../utils/errorHandler';

export interface ProfileI {
  id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  website?: string;
  updated_at?: string;
}

@model("ProfileStore")
export class ProfileStore extends Model({
  currentProfile: prop<ProfileI | null>().withSetter(),
  error: prop<string | null>(),
  loading: prop<boolean>()
}) {
  rootStore: RootStore;
  

  constructor(rootStore: RootStore) {
    super({
      currentProfile: null,
      error: null,
      loading: false
    });
    this.rootStore = rootStore;
  }

  @modelAction
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @modelAction
  setError(errorMessage: string | null) {
    this.error = errorMessage;
  }

  @modelAction
  async fetchProfile(userId: string): Promise<ProfileI | undefined> {
    this.setLoading(true);
    try {
      const profile = await this.rootStore.api.profile.getById(userId);
      if (profile) {
        this.setCurrentProfile(profile)
        this.setError(null); // Clear error after successful fetch
        return profile;
      } else {
        this.setError('Profile not found.');
      }
    } catch (error) {
      const errorMessage = handleError(error);
      this.setError('Error fetching profile: ' + errorMessage);
    }
    finally {
      this.setLoading(false);
    }
  }

  @modelAction
  async updateProfile(profileData: Partial<ProfileI>): Promise<void> {
    if (!this.currentProfile) {
      this.setError('No profile selected for update.');
      return;
    }
    this.setLoading(true);
    try {
      await this.rootStore.api?.profile.update(this.currentProfile.id, profileData);
      this.setCurrentProfile({ ...this.currentProfile, ...profileData });
      this.setError(null); // Clear error after successful update
    } catch (error) {
      const errorMessage = handleError(error);
      this.setError('Error fetching profile: ' + errorMessage);
    } finally {
      this.setLoading(false);
    }
  }

  @modelAction
  async insertProfile(profileData: ProfileI): Promise<void> {
    this.setLoading(true);
    try {
      const profile = await this.rootStore.api?.profile.create(profileData);
      this.setCurrentProfile(profile); // Assuming creation returns the new profile
      this.setError(null); // Clear error after successful insertion
    } catch (error) {
      const errorMessage = handleError(error);
      this.setError('Error fetching profile: ' + errorMessage);
    } finally {
      this.setLoading(false);
    }
  }

  // Add more actions as needed, e.g., deleteProfile
}
