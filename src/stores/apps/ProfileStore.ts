// src/stores/ProfileStore.ts
import { Model, model, prop, modelAction } from 'mobx-keystone';
import { supabase } from '../../supabaseClient';
import { RootStore } from '../RootStore';

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
  // You might want to track the current user's profile as an observable property
  currentProfile: prop<ProfileI | null>(null),
}) {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    super({});
    this.rootStore = rootStore;
  }

  @modelAction
  async fetchProfile(userId: string): Promise<void> {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
      return;
    }

    this.currentProfile = profile;
  }

  @modelAction
  async updateProfile(profileData: Partial<ProfileI>): Promise<void> {
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update(profileData)
      .match({ id: this.currentProfile?.id });

    if (error) {
      console.error('Error updating profile:', error.message);
      return;
    }

    this.currentProfile = updatedProfile ? updatedProfile[0]:null;
  }

  @modelAction
  async insertProfile(profileData: ProfileI): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .insert([profileData]);

    if (error) {
      console.error('Error inserting profile:', error.message);
    }
  }

  // Add more actions as needed, e.g., deleteProfile
}
