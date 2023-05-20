import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  margin-right: 2rem;

  &:hover {
    color: #666;
  }

  &.active {
    color: #000;
    font-weight: bold;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const MobileMenuDropdown = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Link href="/">
        <Logo>Meu Site</Logo>
      </Link>
      <Nav>
        <Link href="/">
          <NavLink className={router.pathname === '/' ? 'active' : ''}>Home</NavLink>
        </Link>
        <Link href="/blog">
          <NavLink className={router.pathname === '/blog' ? 'active' : ''}>Blog</NavLink>
        </Link>
        <Link href="/contato">
          <NavLink className={router.pathname === '/contato' ? 'active' : ''}>Contato</NavLink>
        </Link>
        <MobileMenu>
          <MobileIcon onClick={toggleMenu}>
            <i className="fas fa-bars" />
          </MobileIcon>
          <MobileMenuDropdown isOpen={isOpen}>
            <Link href="/">
              <NavLink onClick={toggleMenu} className={router.pathname === '/' ? 'active' : ''}>
                Home
              </NavLink>
            </Link>
            <Link href="/blog">
              <NavLink onClick={toggleMenu} className={router.pathname === '/blog' ? 'active' : ''}>
                Blog
              </NavLink>
            </Link>
            <Link href="/contato">
              <NavLink onClick={toggleMenu} className={router.pathname === '/contato' ? 'active' : ''}>
                Contato
              </NavLink>
            </Link>
          </MobileMenuDropdown>
        </MobileMenu>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
