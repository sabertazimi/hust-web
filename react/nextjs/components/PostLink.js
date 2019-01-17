import Link from 'next/link';

const PostLink = ({ id, title }) => (
  <li>
    <Link as={`/p/${id}`} href={`/post?title=${title}`}>
      <a>{ title }</a>
    </Link>
  </li>
);

export default PostLink;
