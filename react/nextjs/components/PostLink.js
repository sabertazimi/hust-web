import Link from 'next/link';

const PostLink = ({ title }) => (
  <li>
    <Link href={`/post?title=${title}`}>
      <a>{ title }</a>
    </Link>
  </li>
);

export default PostLink;
