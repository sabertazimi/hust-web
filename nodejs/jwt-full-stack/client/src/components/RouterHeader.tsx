import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

interface Props {
  defaultSelectedKey?: number;
}

const RouterHeader: React.FC<Props> = ({ defaultSelectedKey = '/' }) => {
  const location = useLocation();

  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${defaultSelectedKey}`]}
        selectedKeys={[location.pathname]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/register">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default RouterHeader;
