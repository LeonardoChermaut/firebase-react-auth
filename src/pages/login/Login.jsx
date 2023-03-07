import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../components";
import { useAuth } from "../../contexts/index";
import { CardLoginPage, ImageLogo } from "./Login.styled";
import { Link, useHistory } from "react-router-dom";
import logoLogin from "../../assets/logo-login.jpg";
import { LOGIN_ERROR_MESSAGE } from "../../utils/messages";
import { Form, Button, Card, Alert } from "react-bootstrap";

export const Login = () => {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const isMountedRef = useRef(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      if (isMountedRef.current) {
        history.push("/");
      }
    } catch (error) {
      setError(LOGIN_ERROR_MESSAGE);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <section>
      <Container fluid>
        <CardLoginPage>
          <ImageLogo src={logoLogin} alt="logo fire flit login" />
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                variant="outline-success"
              >
                Entrar
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/esqueci-minha-senha">Esqueceu sua senha?</Link>
              <div className="w-100 text-center mt-2">
                Precisa de uma conta? <Link to="/registro">Registre-se</Link>
              </div>
            </div>
          </Card.Body>
        </CardLoginPage>
      </Container>
    </section>
  );
};
