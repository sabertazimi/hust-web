import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Alert, Spin, Button } from 'antd';
import { useUserQuery, useLogoutMutation } from '../query';
import Auth from '../auth';

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useUserQuery();
  const [logout, { client }] = useLogoutMutation();

  const handleClick = useCallback(async () => {
    await logout();
    Auth.setAccessToken('');
    await client!.resetStore();
    setTimeout(() => navigate('/login'), 0);
  }, [logout, navigate, client]);

  if (error) {
    Auth.setAccessToken('');
    setTimeout(() => navigate('/login'), 0);
    return <Alert message="Haven't logged in" type="info" showIcon />;
  }

  return (
    <Spin spinning={loading} size="large">
      <div style={{ marginBottom: '1em' }}>
        {loading ? '' : <div>Email: {data!.user.email}</div>}
      </div>
      {!loading && data && data.user ? (
        <Button type="primary" onClick={handleClick}>
          Logout
        </Button>
      ) : null}
    </Spin>
  );
};

export default Dashboard;
