import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Auth from '../auth';

interface Props {
}

const RouterHeader: React.FC<Props> = () => {
  const location = useLocation();
  const accessToken = Auth.getAccessToken();
  const menus = [{ path: '/', title: 'Home' }];
  const defaultMenu = [];

  if (accessToken) {
    menus.push({ path: '/dashboard', title: 'Dashboard' });
    defaultMenu.push('/dashboard');
  } else {
    menus.push({ path: '/register', title: 'Register' });
    menus.push({ path: '/login', title: 'Login' });
    defaultMenu.push('/');
  }

  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={defaultMenu}
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
