import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
  fontSize: '1.2em'
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
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
