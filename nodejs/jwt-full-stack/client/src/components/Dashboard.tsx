import React from 'react';
import { useHistory } from 'react-router';
import { Alert, Spin, Button } from 'antd';
import { useUserQuery } from '../query';
import Auth from '../auth';

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const history = useHistory();
  const { data, loading, error } = useUserQuery();

  if (error) {
    Auth.setAccessToken('');
    setTimeout(() => history.push('/login'), 0);
    return <Alert message="Haven't logged in" type="info" showIcon />;
  }

  return (
    <Spin spinning={loading} size="large">
      <div style={{ marginBottom: '1em' }}>
        {loading ? '' : <div>Email: {data!.user.email}</div>}
      </div>
      <Button type="primary">Logout</Button>
    </Spin>
  );
};

export default Dashboard;
