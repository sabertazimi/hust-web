import React from 'react';
import { Link } from 'gatsby';

import { Layout } from '../components';

const IndexPage = () => (
  <Layout>
    <h1>Hi</h1>
    <p>Welcome to Gatsby Blog.</p>
    <p>Now go build something great.</p>
    <Link to='/about/'>Go to about page</Link>
  </Layout>
);

export default IndexPage;
