import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Card, Container, Footer, GlobalStyles, Header } from './components'
import content from './content'
import theme from './theme'

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
