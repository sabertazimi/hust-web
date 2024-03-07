import styled from 'styled-components'

const FooterContainer = styled.footer`
  padding: 100px 0 60px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.footer};

  ul {
    list-style-type: none;
  }

  ul li {
    margin-bottom: 20px;
  }

  p {
    text-align: right;
  }
`

export default FooterContainer
