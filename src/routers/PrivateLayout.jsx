import React from "react"
import { Container } from "react-bootstrap";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useAuth } from "../contexts";

export const PrivateLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Sidebar />}
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
        <div className="w-100" style={{ maxWidth: "50%" }}>
          {children}
        </div>
      </Container>
    </>
  );
};
