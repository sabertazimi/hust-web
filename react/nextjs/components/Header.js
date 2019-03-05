import Link from 'next/link';
import PUBLIC_URL from './url';

const linkStyle = {
  marginRight: 15,
  fontSize: '1.2em'
};

const Header = () => (
  <div>
    <Link href={`${PUBLIC_URL}/`}>
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href={`${PUBLIC_URL}/about`}>
      <a style={linkStyle}>About</a>
    </Link>
    <style jsx>{`
      a {
        text-decoration: none;
        color: blue;
        font-family: "Raleway, Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </div>
);

export default Header;
