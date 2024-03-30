import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import IconsContainer from './IconsContainer'

/**
 * Renders a list of social icons.
 * Each icon is wrapped in an anchor tag with a corresponding URL.
 * @returns {JSX.Element} component
 */
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
  )
}
