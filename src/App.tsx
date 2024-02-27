import React from 'react';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          {/* Render components that require authentication */}
        </div>
      ) : (
        <div>
          <p>Please log in</p>
          {/* Render public components */}
        </div>
      )}
    </div>
  );
};

export default App;
