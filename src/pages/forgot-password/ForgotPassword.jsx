import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/index";
import { Link } from "react-router-dom";
import { Container } from "../../components";
import {
  MESSAGE_EMAIL_SEND_RECOVER,
  MESSAGE_RESET_PASSWORD_ERROR,
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
      setMessage(MESSAGE_EMAIL_SEND_RECOVER);
    } catch (e) {
      console.error(e.message);
      setError(MESSAGE_RESET_PASSWORD_ERROR);
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
