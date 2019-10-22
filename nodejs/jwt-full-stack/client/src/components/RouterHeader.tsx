import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Auth from '../auth';

interface Props {
  defaultSelectedKey?: number;
}

const RouterHeader: React.FC<Props> = ({ defaultSelectedKey = '/' }) => {
  const location = useLocation();
  const menus = [{ path: '/', title: 'Home' }];
  const accessToken = Auth.getAccessToken();

  if (accessToken) {
    menus.push({ path: '/dashboard', title: 'Dashboard' });
  } else {
    menus.push({ path: '/register', title: 'Register' });
    menus.push({ path: '/login', title: 'Login' });
  }

  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${defaultSelectedKey}`]}
        selectedKeys={[location.pathname]}
        style={{ lineHeight: '64px' }}
      >
        {menus.map(menu => (
          <Menu.Item key={menu.path}>
            <Link to={menu.path}>{menu.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Header>
  );
};

export default RouterHeader;
