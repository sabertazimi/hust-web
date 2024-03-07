import styled from 'styled-components'

interface Props {
  readonly layout: string
}

const CardContainer = styled.div<Props>`
  display: flex;
  flex-direction: ${({ layout }) => layout || 'row'};
  align-items: center;
  padding: 60px;
  margin: 40px 0;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

  img {
    width: 80%;
  }

  & > div {
    flex: 1;
  }
`

export default CardContainer
