// src/stores/AppStore.ts
import { model, Model, prop } from 'mobx-keystone';
import { RootStore } from './RootStore';
import { ProfileStore } from './apps/ProfileStore';
import { reaction } from 'mobx';

@model('AppStore')
export class AppStore extends Model({
  // Store in here should a mobx-keystone model
  profile: prop<ProfileStore>(),
}) {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    super({
      // Initialize the ProfileStore with reference to the AppStore or RootStore if needed
      profile: new ProfileStore(rootStore),
    });
    this.rootStore = rootStore;
    // Setup a reaction to handle changes to currentUser
    reaction(
      () => this.rootStore.supabase.currentUser,
      (currentUser) => {
        if (currentUser) {
          console.log('🚀 ~ AppStore ~ constructor ~ currentUser:', currentUser);
          this.profile.fetchProfile(currentUser.id);
        }
      },
      {
        fireImmediately: true, // Trigger the reaction immediately with current value
      }
    );
  }
}
