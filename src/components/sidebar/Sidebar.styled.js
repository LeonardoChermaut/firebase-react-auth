import styled from "styled-components";
import { Nav } from "react-bootstrap";

export const SidebarNav = styled(Nav)`
  top: 0;
  z-index: 10;
  height: 100vh;
  display: flex;
  position: fixed;
  width: 15.625rem;
  transition: 350ms;
  background: #15171c;
  justify-content: center;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
`;

export const NavIcon = styled(Nav.Link)`
  height: 5rem;
  display: flex;
  font-size: 2rem;
  margin-left: 2rem;
  align-items: center;
  justify-content: flex-start;
`;

export const SidebarLink = styled(Nav.Link)`
  display: flex;
  color: #e1e9fc;
  padding: 1.25rem;
  list-style: none;
  height: 3.75rem;
  position: relative;
  align-items: center;
  font-size: 1.125rem;
  text-decoration: none;
  justify-content: space-between;

  &::after {
    content: "";
    bottom: 0;
    left: 0;
    width: 0%;
    height: 0.12rem;
    position: absolute;
    background-color: #632ce4;
    transition: width 0.5s ease;
    cursor: pointer;
  }
  &:hover::after {
    width: 100%;
  }
`;

export const Navbar = styled.div`
  background: #15171c;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;

export const SidebarLabel = styled.span`
  margin-left: 1rem;
`;
