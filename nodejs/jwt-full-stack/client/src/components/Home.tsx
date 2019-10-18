import React from 'react';
import { Spin } from 'antd';
import { useHelloQuery } from '../query';

interface Props {}

const Home: React.FC<Props> = () => {
  const { data, loading } = useHelloQuery();

  return (
    <Spin spinning={loading} size="large">
      <div>{loading ? '' : data!.hello}</div>
    </Spin>
  );
};

export default Home;
