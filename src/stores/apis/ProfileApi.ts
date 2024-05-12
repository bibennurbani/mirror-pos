import { Profile } from "../../types";
import { RootStore } from "../RootStore";
import { AbstractApi } from "./AbstractApi";

export default class ProfileApi extends AbstractApi<Profile>{
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        super();
        this.rootStore = rootStore;
    }

    async getAll(): Promise<Profile[] | undefined> {
        try {
            const { data, error } = await this.rootStore.supabase.client
                .from('profiles')
                .select('*');
            
            if (error) {
                console.error('Error fetching profiles:', error.message);
                throw new Error(error.message);
            }

            return data;
        } catch (error) {
            console.error('Failed to fetch profiles:', error);
            return undefined;
        }
    }

    async getById(id: string): Promise<Profile | undefined> {
        try {
            const { data, error } = await this.rootStore.supabase.client
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error.message);
                throw new Error(error.message);
            }

            return data;
        } catch (error) {
            console.error('Failed to fetch profile by ID:', error);
            return undefined;
        }
    }

    async create(data: Profile): Promise<Profile> {
        const { error } = await this.rootStore.supabase.client
            .from('profiles')
            .insert([data]);

        if (error) {
            console.error('Error creating profile:', error.message);
            throw new Error(error.message);
        }

        return data;
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.rootStore.supabase.client
            .from('profiles')
            .delete()
            .match({ id });

        if (error) {
            console.error('Error deleting profile:', error.message);
            throw new Error(error.message);
        }
    }

    async update(id: string, newData: Partial<Profile>): Promise<void> {
        const { error } = await this.rootStore.supabase.client
            .from('profiles')
            .update(newData)
            .match({ id });

        if (error) {
            console.error('Error updating profile:', error.message);
            throw new Error(error.message);
        }
    }
}
