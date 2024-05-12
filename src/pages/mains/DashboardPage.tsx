// DashboardPage.tsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../hooks/useStore';
import { observer } from 'mobx-react-lite';

const DashboardPage: React.FC = observer(() => {
  const { root } = useStore();
  const { app } = root;
  const { client } = useAuth();

  // useEffect(() => {
  //   if (user && user.id) app.profile.fetchProfile(user.id);
  // }, []);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome {client.currentUser?.email}</h1>
      <p>This is Dashboard</p>
      <p>hi {app.profile.profile?.id}</p>
    </div>
  );
});

export default DashboardPage;
