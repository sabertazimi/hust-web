import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import IconsContainer from './IconsContainer';

export default function SocialIcons() {
  return (
    <IconsContainer>
      <li>
        <a href="https://twitter.com">
          <FaTwitter />
        </a>
      </li>
      <li>
        <a href="https://facebook.com">
          <FaFacebook />
        </a>
      </li>
      <li>
        <a href="https://linkedin.com">
          <FaLinkedin />
        </a>
      </li>
    </IconsContainer>
  );
}
