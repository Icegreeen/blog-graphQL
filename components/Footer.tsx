import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsla(0, 0%, 100%, .9);
  padding: 2rem;
  justify-content: space-around;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const FooterText = styled.p`
  color: #888888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FooterLink = styled.a`
  color: #888888;
  text-decoration: underline;

  &:hover {
    color: #555555;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; 2023 All rights reserved. | Created by{" "}
        <FooterLink href="https://www.example.com">Flávio Áquila</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
