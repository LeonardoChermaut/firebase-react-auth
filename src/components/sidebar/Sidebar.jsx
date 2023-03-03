import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import {
  IoMdPeople,
  IoIosPaper,
  IoMdHelpCircle,
  IoMdLogOut,
  IoMdHome,
  IoMdPerson,
} from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { useAuth } from "../../contexts";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;


export const Sidebar = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSubmenuClick = (index) => {
    if (activeItem === index) {
      setActiveItem(null);
    } else {
      setActiveItem(index);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      history.replace("/login");
    } catch (error) {
      console.error("error logout\n", error.message);
    }
  };

  return (
    <aside>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <SidebarLink to="/inicio" onClick={() => handleSubmenuClick(0)}>
              <div>
                <IoMdHome />
                <SidebarLabel>Início</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink to="/perfil" onClick={() => handleSubmenuClick(1)}>
              <div>
                <IoMdPerson />
                <SidebarLabel>Perfil</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink to="/usuarios" onClick={() => handleSubmenuClick(2)}>
              <div>
                <IoMdPeople />
                <SidebarLabel>Usuários</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink to="/reportar" onClick={() => handleSubmenuClick(3)}>
              <div>
                <IoIosPaper />
                <SidebarLabel>Reportar</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink to="/support" onClick={() => handleSubmenuClick(4)}>
              <div>
                <IoMdHelpCircle />
                <SidebarLabel>Support</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink onClick={handleLogout}>
              <div>
                <IoMdLogOut />
                <SidebarLabel>Sair</SidebarLabel>
              </div>
            </SidebarLink>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </aside>
  );
};
