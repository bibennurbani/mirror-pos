// DashboardPage.tsx
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

const DashboardPage: React.FC = observer(() => {
  const { rootStore } = useStore();
  const { app } = rootStore;

  const { user } = useAuth();
  useEffect(() => {
    if (user && user.id) app.profile.fetchProfile(user.id);
  }, [app.profile, user]);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome {user?.email}</h1>
      <p>This is Dashboard</p>
      <p>hi {app.profile.currentProfile?.id}</p>
    </div>
  );
});

export default DashboardPage;
