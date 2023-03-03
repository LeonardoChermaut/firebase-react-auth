import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/index";
import { EmployeForm } from "../index";

export const Dashboard = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to log out");
      console.error("error logout\n", error.message);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser && currentUser.email}
          <Link to="/profile" className="btn btn-primary w-100 mt-3">
            Atualizar Perfil
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </>
  );
};
