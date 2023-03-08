import React from "react";
import { useAuth } from "../contexts/index";
import { Sidebar } from "../components/sidebar/Sidebar";

export const PrivateLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <Sidebar />
        {children}
      </>
    );
  }

  return children;
};
