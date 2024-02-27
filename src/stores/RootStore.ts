import { model, Model, prop } from "mobx-keystone";
import { SupabaseClientStore } from "./SupabaseClientStore";
// Import other stores

@model("budgetapp/RootStore")
export class RootStore extends Model({
  // Define the SupabaseClientStore as a property with an initializer function
  // This automatically instantiates SupabaseClientStore when RootStore is instantiated
  supabaseClient: prop(() => new SupabaseClientStore({})),
  // Define other stores as properties here, using prop(() => new OtherStore()) if necessary
}) {
  // No need for a constructor to manually instantiate and assign stores
  // unless you have specific initialization logic that can't be handled in the property definition
}
