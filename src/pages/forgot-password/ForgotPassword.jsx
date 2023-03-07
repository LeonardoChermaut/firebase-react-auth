import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components";
import { useAuth } from "../../contexts/index";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {
  EMAIL_SEND_RECOVER_MESSAGE,
  RESET_PASSWORD_ERROR_MESSAGE,
} from "../../utils/index";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(EMAIL_SEND_RECOVER_MESSAGE);
    } catch (e) {
      console.error(e.message);
      setError(RESET_PASSWORD_ERROR_MESSAGE);
    }
    setLoading(false);
  };

  return (
    <section>
      <Container>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Esqueci minha senha</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Resetar senha
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
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
