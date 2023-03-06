import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../contexts";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoMdPeople, IoIosPaper, IoMdHelpCircle, IoMdLogOut, IoMdHome, IoMdPerson } from "react-icons/io";
import { SidebarWrap, SidebarLabel, Navbar, SidebarLink, NavIcon, SidebarNav } from "./Sidebar.styled";

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
      console.error(`error logout\n ${error.message}`);
    }
  };

  return (
    <aside>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Navbar>
          <NavIcon href="#">
            <FaBars onClick={showSidebar} />
          </NavIcon>
        </Navbar>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon href="#">
              <AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <SidebarLink href="/inicio" onClick={() => handleSubmenuClick(0)}>
              <div>
                <IoMdHome />
                <SidebarLabel>Início</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink href="/perfil" onClick={() => handleSubmenuClick(1)}>
              <div>
                <CgProfile/> 
                <SidebarLabel>Perfil</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink href="/cadastrar" onClick={() => handleSubmenuClick(2)}>
              <div>
                <IoMdPeople />
                <SidebarLabel>Cadastrar</SidebarLabel>
              </div>
            </SidebarLink>
               <SidebarLink href="/funcionarios" onClick={() => handleSubmenuClick(1)}>
              <div>
                <IoMdPerson/> 
                <SidebarLabel>Funcionários</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink href="/reportar" onClick={() => handleSubmenuClick(3)}>
              <div>
                <IoIosPaper />
                <SidebarLabel>Reportar</SidebarLabel>
              </div>
            </SidebarLink>
            <SidebarLink href="/support" onClick={() => handleSubmenuClick(4)}>
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
