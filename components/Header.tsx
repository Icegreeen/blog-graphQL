import React, { useState } from "react";
import styled from "styled-components";

interface HamburgerIconProps {
  open: boolean;
}

const HeaderContainer = styled.header`
  background-color: hsla(0, 0%, 100%, 0.9);
  width: 60vw;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 768px) {
    padding: 2rem 2rem;
  }

  @media (min-width: 368px) {
    padding: 2rem 2rem;
  }
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Nav = styled.nav<HamburgerIconProps>`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 100%;
    left: -75px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    height: 60vh;
    width: 100vw;
    background-color: #f9f9f9;
    padding: 1rem;
    opacity: ${({ open }: HamburgerIconProps) => (open ? "1" : "0")};
    visibility: ${({ open }: HamburgerIconProps) => (open ? "visible" : "hidden")};
    transition: opacity 0.3s ease, visibility 0.3s ease;

    a {
      display: block;
      text-align: right;
    }
  }

`;

const NavItem = styled.a`
  color: #333333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 2rem;
  }
`;

const HamburgerIcon = styled.div<HamburgerIconProps>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 100%;
    height: 2px;
    background-color: #333333;
    transition: transform 0.3s ease;

    &:first-child {
      transform: ${({ open }: HamburgerIconProps) => (open ? "rotate(45deg) translate(5px, 5px)" : "none")};
    }

    &:nth-child(2) {
      opacity: ${({ open }: HamburgerIconProps) => (open ? "0" : "1")};
    }

    &:last-child {
      transform: ${({ open }: HamburgerIconProps) => (open ? "rotate(-45deg) translate(6px, -6px)" : "none")};
    }
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Logo>My blog</Logo>
      <HamburgerIcon open={isOpen} onClick={handleHamburgerClick}>
        <span />
        <span />
        <span />
      </HamburgerIcon>
      <Nav open={isOpen}>
      <NavItem href="/">Home</NavItem>
        <NavItem href="/">About</NavItem>
        <NavItem href="/">Articles</NavItem>
        <NavItem href="/">Projects</NavItem>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
