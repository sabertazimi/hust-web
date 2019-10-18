import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

interface Props {
  defaultSelectedKey?: number;
}

const RouterHeader: React.FC<Props> = ({ defaultSelectedKey = 1 }) => {
  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${defaultSelectedKey}`]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default RouterHeader;
