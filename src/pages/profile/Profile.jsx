import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts";
import { updateProfile } from "../../services/index";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";

export const Profile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("As senhas não conferem");
    }

    try {
      setError("");
      setLoading(true);
      await updateProfile(emailRef.current.value, passwordRef.current.value);
      alert("Perfil atualizado com sucesso")
      setSuccess("Perfil atualizado com sucesso");
      history.push("/");
    } catch (error) {
      setError("Ocorreu um erro ao atualizar seu perfil");
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Atualizar perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleUpdateProfile}>
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
        <Link to="/">Cancelar</Link>
      </div>
    </>
  );
};
