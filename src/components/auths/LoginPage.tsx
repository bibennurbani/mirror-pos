import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';
import { PATH_DASHBOARD } from '../../routes/paths';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { client } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data, error: signInError } = (await client.signIn(email, password)) as AuthTokenResponsePassword;
      console.log('🚀 ~ handleSubmit ~ signInError:', signInError);

      if (signInError || !data.user || !data.session) throw signInError;
      navigate(PATH_DASHBOARD.root); // Adjust the route as needed
    } catch (error) {
      alert('Failed to log in');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '320px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='email' style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='password' style={{ display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type='submit' style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
