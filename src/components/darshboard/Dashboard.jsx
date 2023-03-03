import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/index";

export const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          <strong>Email:</strong> {currentUser && currentUser.email}
          <Link to="/inicio" className="btn btn-primary w-100 mt-3">
            Atualizar Perfil
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};
