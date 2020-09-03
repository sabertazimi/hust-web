import { Layout, PostLink } from '../components';
import fetch from 'isomorphic-unfetch';

const Index = ({ shows }) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      { shows.map(({ show }) => <PostLink key={show.id} id={show.id} title={show.name} />) }
    </ul>
    <style jsx>{`
      h1 {
        font-family: "Raleway Arial";
      }

      ul {
        padding: 0;
      }
    `}</style>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return { shows: data };
};

export default Index;
