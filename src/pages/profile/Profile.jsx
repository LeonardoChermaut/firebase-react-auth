import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts";
import { Button, Container } from "../../components";
import { Link, useHistory } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import {
  showMessageRequest,
  PASSWORD_NOT_MATCH_MESSAGE,
  UPDATED_ERROR_MESSAGE,
  UPDATED_SUCCSESS_MESSAGE,
} from "../../utils/index";

export const Profile = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserCredentials } = useAuth();

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { isValid: false, message: PASSWORD_NOT_MATCH_MESSAGE };
    }
    return { isValid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = passwordConfirmRef.current.value.trim();
    const { isValid } = validatePassword(password, confirmPassword);
    if (!isValid) {
      showMessageRequest(PASSWORD_NOT_MATCH_MESSAGE);
      return;
    }
    if (email === currentUser.email && !password) {
      showMessageRequest(UPDATED_ERROR_MESSAGE);
      return;
    }

    try {
      setLoading(true);
      if (email !== currentUser.email || password) {
        await updateUserCredentials(email, password);
      }
      showMessageRequest(UPDATED_SUCCSESS_MESSAGE);
      history.push("/");
    } catch (error) {
      showMessageRequest(UPDATED_ERROR_MESSAGE);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Atualizar perfil</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="********"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirme a senha</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="********"
                />
              </Form.Group>
              <Button
                disabled={loading}
                type="submit"
                variant="outline-primary"
              >
                Atualizar
              </Button>
              <div className="w-100 text-center mt-2">
                <Link to="/inicio">Cancelar</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};
