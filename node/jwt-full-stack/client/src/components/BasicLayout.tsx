import React from 'react';
import { Layout } from 'antd';
import RouterHeader from './RouterHeader';
import styles from '../App.module.css';

interface Props {}

const BasicLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="layout">
      <RouterHeader />
      <Layout.Content style={{ padding: '0 50px' }}>
        <div className={styles.content}>{children}</div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        React JWT Full Stack
      </Layout.Footer>
    </Layout>
  );
};

export default BasicLayout;
