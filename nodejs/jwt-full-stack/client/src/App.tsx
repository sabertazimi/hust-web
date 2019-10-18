import React from 'react';
import { Spin, Layout, Menu, Breadcrumb } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './App.css';

const App: React.FC = () => {
  const { Header, Content, Footer } = Layout;
  const { data, loading } = useQuery(gql`
    {
      hello
    }
  `);

  return (
  <Layout className='layout'>
    <Header>
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key='1'>Home</Menu.Item>
        <Menu.Item key='2'>Register</Menu.Item>
        <Menu.Item key='3'>Login</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={loading} size='large'>
        <div
          style={{ background: '#fff', padding: 24, minHeight: 280 }}
        >
          { loading ? '' : data.hello }
        </div>
      </Spin>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      React JWT Full Stack
    </Footer>
  </Layout>
  );
}

export default App;
