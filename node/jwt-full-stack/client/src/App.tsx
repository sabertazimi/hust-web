import React, { useState, useEffect } from 'react';
import { Skeleton } from 'antd';
import Routes from './Routes';
import Auth from './auth';
import { SERVER_URL } from './config';
import './App.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${SERVER_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async response => {
      const { accessToken } = await response.json();
      Auth.setAccessToken(accessToken);
      setTimeout(() => setLoading(false), 1000);
    });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return <Routes />;
};

export default App;
