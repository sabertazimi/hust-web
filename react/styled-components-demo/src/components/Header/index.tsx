import { Button, Container, Flex } from '../index'
import HeaderContainer from './HeaderContainer'
import HeaderImage from './HeaderImage'
import HeaderNav from './HeaderNav'

export default function Header() {
  return (
    <HeaderContainer>
      <Container>
        <HeaderNav>
          <img src="./images/logo.svg" alt="Logo" />
          <Button>Try It Free</Button>
        </HeaderNav>
        <Flex>
          <div>
            <h1>Build The Community Your Fans Will Love</h1>
            <p>
              Huddle re-imagines the way we build communities. You have a voice,
              but so does your audience. Create connections with your users as
              you engage in genuine discussion.
            </p>
            <Button bg="#ff0099" color="#fff">
              Get Started For Free
            </Button>
          </div>
          <HeaderImage src="./images/illustration-mockups.svg" alt="Mocks" />
        </Flex>
      </Container>
    </HeaderContainer>
  )
}
