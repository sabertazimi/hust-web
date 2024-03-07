import styled from 'styled-components'

interface Props {
  readonly color?: string
  readonly bg?: string
}

const Button = styled.button<Props>`
  padding: 15px 60px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ color }) => color || '#333'};
  cursor: pointer;
  background-color: ${({ bg }) => bg || '#fff'};
  border: none;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

  &:focus,
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`

export default Button
