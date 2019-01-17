import { withRouter } from 'next/router';
import { Layout } from '../components';

const Content = withRouter(({ router }) => (
  <div>
    <h1>{ router.query.title }</h1>
    <p>This is the blog post content.</p>
  </div>
));

const Page = () => (
  <Layout>
    <Content />
  </Layout>
);

export default Page;
