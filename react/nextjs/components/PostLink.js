import Link from 'next/link';
import PUBLIC_URL from './url';

const PostLink = ({ id, title }) => (
  <li>
    <Link as={`${PUBLIC_URL}/p/${id}`} href={`${PUBLIC_URL}/post?id=${id}`}>
      <a>{ title }</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Raleway, Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

export default PostLink;
