import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useAuth } from "../contexts/index";

export const PrivateLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;
  
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};