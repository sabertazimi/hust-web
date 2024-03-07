import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  align-items: center;

  & > div,
  & > ul {
    flex: 1;
  }
`

export default Flex
