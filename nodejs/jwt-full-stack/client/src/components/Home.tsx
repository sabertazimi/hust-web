import React from 'react';
import { Spin, List, Avatar } from 'antd';
import { useUsersQuery } from '../query';

interface Props {}

const Home: React.FC<Props> = () => {
  const { data, loading } = useUsersQuery();

  return (
    <Spin spinning={loading} size="large">
      <div>
        {loading ? (
          ''
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={data!.users}
            renderItem={user => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size="large" icon="user" />}
                  title={
                    <a href="https://github.com/sabertazimi/hust-web">
                      {user.email}
                    </a>
                  }
                  description="React JWT Full Stack Project"
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </Spin>
  );
};

export default Home;
