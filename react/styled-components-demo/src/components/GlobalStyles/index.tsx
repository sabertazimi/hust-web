import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 1.15em;
    color: hsl(192, 100%, 9%);
    background: ${({ theme }) => theme.colors.body};
  }

  p {
    line-height: 1.5;
    opacity: 0.6;
  }

  img {
    max-width: 100%;
}
`

export default GlobalStyles
