import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/index";
import { Container } from "../index"

export const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <section>
      <Container>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          <strong>Email:</strong> {currentUser && currentUser.email}
          <Link to="/perfil" className="btn btn-primary w-100 mt-3">
            Atualizar Perfil
          </Link>
        </Card.Body>
        </Card>
        </Container>
    </section>
  );
};
