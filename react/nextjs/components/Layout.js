import Header from './Header';

const layoutStyle = {
  margin: '1.2em',
  padding: '1.2em',
  border: '1px solid #ddd',
};

const Layout = ({ children }) => (
  <div style={layoutStyle}>
    <Header />
    { children }
  </div>
);

export default Layout;
