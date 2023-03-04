import React from "react";
import { Container } from "../components/container/Container";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useAuth } from "../contexts";

export const PrivateLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Sidebar />}
      <Container>{children}</Container>
    </>
  );
};
