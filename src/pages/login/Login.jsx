import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/index";
import { Link, useHistory } from "react-router-dom";
import { Container } from "../../components";
import { Form, Button, Card, Alert } from "react-bootstrap";

export const Login = () => {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
      setError("Erro ao efetuar login");
      console.error(error.message);
    }

    setLoading(false);
  };

  return (
    <section>
      <Container>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
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
              <Button disabled={loading} className="w-100" type="submit">
                Entrar
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/esqueci-minha-senha">Esqueceu sua senha?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Precisa de uma conta? <Link to="/registro">Registre-se</Link>
        </div>
      </Container>
    </section>
  );
};
