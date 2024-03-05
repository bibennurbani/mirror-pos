// NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;