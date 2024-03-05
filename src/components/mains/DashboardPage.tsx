// DashboardPage.tsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const {user} = useAuth();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome {user?.email}</h1>
      <p>This is Dashboard</p>
    </div>
  );
};

export default DashboardPage;