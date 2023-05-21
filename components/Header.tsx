import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: hsla(0, 0%, 100%, .9);
  width: 90%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.a`
  color: #333333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Your Logo</Logo>
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/">About</NavItem>
        <NavItem href="/">Articles</NavItem>
        <NavItem href="/">Projects</NavItem>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
