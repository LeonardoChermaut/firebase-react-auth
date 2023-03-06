import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts";
import { Container } from "../../components";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { alertRequest, MESSAGE_PASSWORD_NOT_MATCH, MESSAGE_UPDATED_ERROR, MESSAGE_UPDATED_SUCCSESS } from "../../utils/index";

export const Profile = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserCredentials } = useAuth();

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { isValid: false, message: MESSAGE_PASSWORD_NOT_MATCH };
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
      alertRequest(MESSAGE_PASSWORD_NOT_MATCH)
      return;
    }
    if (email === currentUser.email && !password) {
      alertRequest(MESSAGE_UPDATED_ERROR);
      return;
    }
    
    try {
      setLoading(true);
      if (email !== currentUser.email || password) {
        await updateUserCredentials(email, password);
      }
      alertRequest(MESSAGE_UPDATED_SUCCSESS);
      history.push("/");
    } catch (error) {
      alertRequest(MESSAGE_UPDATED_ERROR);
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
              <Button disabled={loading} className="w-100" type="submit">
                Atualizar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/inicio">Cancelar</Link>
        </div>
      </Container>
    </section>
  );
};
