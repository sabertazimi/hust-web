import React from 'react';
import { Alert, Spin } from 'antd';
import { useUserQuery } from '../query';

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const { data, loading, error } = useUserQuery({
    fetchPolicy: 'network-only'
  });

  if (error) {
    return <Alert message="Not authenticated" type="error" showIcon closable />;
  }

  return (
    <Spin spinning={loading} size="large">
      <div>{loading ? '' : `Your user ID is ${data!.user}`}</div>
    </Spin>
  );
};

export default Dashboard;
