import styled from 'styled-components';

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    list-style: none;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    color: #fff;
    text-decoration: none;
    border: 1px solid #fff;
    border-radius: 50%;
  }
`;

export default SocialIcons;
