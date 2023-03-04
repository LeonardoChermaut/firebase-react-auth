import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

export const Profile = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const { currentUser, updatePassword, updateEmail } = useAuth();

  const MESSAGE_PASSWORD_NOT_MATCH = `As senhas não conferem`;
  const MESSAGE_UPDATED_SUCCSESS = `Perfil atualizado com sucesso`;
  const MESSAGE_UPDATED_ERROR = `Ocorreu um erro ao atualizar seu perfil`;

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return alert(MESSAGE_PASSWORD_NOT_MATCH);

    try {
      const promises = [];
      setLoading(true);

      if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value));
      }

      if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value));
      }

      await Promise.all(promises);
      alert(MESSAGE_UPDATED_SUCCSESS);
      history.push("/");
    } catch (error) {
      alert(MESSAGE_UPDATED_ERROR);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
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
    </section>
  );
};
