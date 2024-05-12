import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import { StoreProvider } from "./contexts/StoreContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import rootStoreInstance from "./stores/RootStore.ts";

const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to the user asking if they want to refresh to get the new version
    if (confirm("A new version is available, do you want to update?")) {
      updateSW(); // This function is provided by `registerSW` to update the service worker
    }
  },
  onOfflineReady() {
    // Inform the user that the app can work offline
    console.log("The app is ready to work offline!");
  },
});



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider root={rootStoreInstance} >
      <AuthProvider client={rootStoreInstance.supabase}>
        <App />
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>
);
