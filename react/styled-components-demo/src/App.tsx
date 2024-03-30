import { ThemeProvider } from 'styled-components'
import { Card, Container, Footer, GlobalStyles, Header } from './components'
import content from './content'
import theme from './theme'

/**
 * Renders the main application component.
 * @returns {JSX.Element} The rendered JSX element.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <Container>
          {content.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default App
