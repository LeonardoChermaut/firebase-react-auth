import React from "react";
import { Container } from "../components/container/Container";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useAuth } from "../contexts/index";

export const PrivateLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;
  
  return (
    <>
      <Sidebar />
      <Container>{children}</Container>
    </>
  );
};