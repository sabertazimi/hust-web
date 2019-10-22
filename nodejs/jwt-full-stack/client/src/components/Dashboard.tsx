import React from 'react';
import { useHistory } from 'react-router';
import { Alert, Spin, Button } from 'antd';
import { useUserQuery } from '../query';

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const history = useHistory();
  const { data, loading, error } = useUserQuery({
    fetchPolicy: 'network-only'
  });

  if (error) {
    history.push('/login');
    return <Alert message="Haven't logged in" type="info" showIcon />;
  }

  return (
    <Spin spinning={loading} size="large">
      <div style={{marginBottom: '1em'}}>{loading ? '' : <div>Your user ID is {data!.user}</div>}</div>
      <Button type="primary">Logout</Button>
    </Spin>
  );
};

export default Dashboard;
