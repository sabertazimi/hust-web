import React from 'react';

import { Link } from 'gatsby';

import { Layout } from '../components';

const AboutPage = () => (
  <Layout>
    <h1>About me</h1>
    <p>sabertazimi</p>
    <Link to='/'>Go to home</Link>
  </Layout>
);

export default AboutPage;
