import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../components";
import { useAuth } from "../../contexts/index";
import { CardLoginPage, ImageLogo } from "./Login.styled";
import { Link, useHistory } from "react-router-dom";
import logoLogin from "../../assets/logo-login.png";
import { LOGIN_ERROR_MESSAGE } from "../../utils/messages";
import { Form, Card, Alert } from "react-bootstrap";
import { Button } from "../../components/button/Button";

export const Login = () => {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const isMountedRef = useRef(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isMounted = (param) => {
    return param ? (isMountedRef.current = param) : isMountedRef.current;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      if (isMounted) {
        history.push("/inicio");
      }
    } catch (error) {
      setError(LOGIN_ERROR_MESSAGE);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      isMounted(false);
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
