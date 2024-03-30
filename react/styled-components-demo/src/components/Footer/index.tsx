import { Container, Flex, SocialIcons } from '../index'
import FooterContainer from './FooterContainer'

/**
 * Renders the footer section of the page.
 * @returns {JSX.Element} Footer component.
 */
export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <img src="./images/logo_white.svg" alt="Logo" />
        <Flex>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </li>
            <li>+1-543-123-4567</li>
            <li>example@huddle.com</li>
          </ul>
          <ul>
            <li>About Us</li>
            <li>What We Do</li>
            <li>FAQ</li>
          </ul>
          <ul>
            <li>Career</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
          <SocialIcons />
        </Flex>
        <p>&copy; 2021 Huddle. All rights reserved</p>
      </Container>
    </FooterContainer>
  )
}
