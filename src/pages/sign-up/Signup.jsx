import React, { useRef, useState } from "react";
import { Container } from "../../components";
import { useAuth } from "../../contexts/index";
import { Link, useHistory } from "react-router-dom";
import { Form, Card, Alert } from "react-bootstrap";
import {
  EMAIL_ALREADY,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_NOT_MATCH_MESSAGE,
} from "../../utils/index";
import { Button } from "../../components/index";

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError(PASSWORD_NOT_MATCH_MESSAGE);
      return;
    }
    setLoading(true);
    setError("");
    const result = await signup(
      emailRef.current.value,
      passwordRef.current.value
    );
    setLoading(false);
    if (result.error) {
      if (result.error === EMAIL_ALREADY) {
        setError(EMAIL_ERROR_MESSAGE);
      } else {
        setError(result.error);
      }
    } else {
      history.push("/");
    }
  };

  return (
    <section>
      <Container>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Registro</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignup}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirmação de senha</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} variant="outline-success" type="submit">
                {loading ? "Registrando..." : "Registre-se"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </div>
      </Container>
    </section>
  );
};
