import React, { useState } from "react";
import { db, storage } from "../../db/firebase";
import { useAuth } from "../../contexts/authContext";
import { Form, Button } from "react-bootstrap";

const MAX_NAME_LENGTH = 50;
const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const CEP_REGEX = /^\d{5}-\d{3}$/;
const MAX_DATE_LENGTH = 10;
const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

export const EmployeeForm = () => {
  const { currentUser } = useAuth();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    hiringDate: "",
    cpf: "",
    address: {
      street: "",
      cep: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    status: "ativo",
    photo: null,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { photo, ...employeeData } = employee;
    const storageRef = storage.ref();
    const fileRef = storageRef.child(photo.name);
    const fileSnapshot = await fileRef.put(photo);
    const fileUrl = await fileSnapshot.ref.getDownloadURL();
    await db.collection("employees").add({
      ...employeeData,
      photo: fileUrl,
      userId: currentUser.uid,
    });
    setEmployee({
      name: "",
      email: "",
      hiringDate: "",
      cpf: "",
      address: {
        street: "",
        cep: "",
        neighborhood: "",
        city: "",
        state: "",
      },
      status: "ativo",
      photo: null,
    });
  };

  const handleCepChange = (e) => {
    const cep = e.target.value.replace(/[^\d]/g, "").slice(0, 8);
    const formattedCep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
    setEmployee((prevState) => ({
      ...prevState,
      address: { ...prevState.address, cep: formattedCep },
    }));
  };

  const handleNameChange = (e) => {
    const name = e.target.value.slice(0, MAX_NAME_LENGTH);
    setEmployee((prevState) => ({ ...prevState, name }));
  };

  const handleCpfChange = (e) => {
    const cpf = e.target.value.replace(/[^\d]/g, "").slice(0, 11);
    const formattedCpf = cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    setEmployee((prevState) => ({ ...prevState, cpf: formattedCpf }));
  };

  const handleHiringDateChange = (e) => {
    const hiringDate = e.target.value.slice(0, MAX_DATE_LENGTH);
    setEmployee((prevState) => ({ ...prevState, hiringDate }));
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setEmployee((prevState) => ({ ...prevState, photo }));
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          value={employee.name}
          onChange={handleNameChange}
          maxLength={MAX_NAME_LENGTH}
        />
      </Form.Group>
      <Form.Group controlId="formcep">
        <Form.Label>CEP</Form.Label>
        <Form.Control
          type="text"
          value={employee.address.cep}
          onChange={handleCepChange}
          maxLength={8}
          pattern={CEP_REGEX.source}
          required
        />
      </Form.Group>
      <Form.Group controlId="formNeighborhood">
        <Form.Label>Bairro</Form.Label>
        <Form.Control
          type="text"
          value={employee.address.neighborhood}
          onChange={(e) =>
            setEmployee((prevState) => ({
              ...prevState,
              address: {
                ...prevState.address,
                neighborhood: e.target.value,
              },
            }))
          }
          maxLength={50}
        />
      </Form.Group>
      <Form.Group controlId="formCity">
        <Form.Label>Cidade</Form.Label>
        <Form.Control
          type="text"
          value={employee.address.city}
          onChange={(e) =>
            setEmployee((prevState) => ({
              ...prevState,
              address: { ...prevState.address, city: e.target.value },
            }))
          }
          maxLength={50}
        />
      </Form.Group>
      <Form.Group controlId="formState">
        <Form.Label>Estado</Form.Label>
        <Form.Control
          type="text"
          value={employee.address.state}
          onChange={(e) =>
            setEmployee((prevState) => ({
              ...prevState,
              address: { ...prevState.address, state: e.target.value },
            }))
          }
          maxLength={2}
        />
      </Form.Group>
      <Form.Group controlId="formHiringDate">
        <Form.Label>Data de contratação</Form.Label>
        <Form.Control
          type="text"
          value={employee.hiringDate}
          onChange={handleHiringDateChange}
          maxLength={MAX_DATE_LENGTH}
          pattern={DATE_REGEX.source}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCpf">
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="text"
          value={employee.cpf}
          onChange={handleCpfChange}
          maxLength={14}
          pattern={CPF_REGEX.source}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={employee.email}
          onChange={(e) =>
            setEmployee((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          maxLength={50}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPhoto">
        <Form.Label>Foto</Form.Label>
        <Form.Control type="file" onChange={handlePhotoChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
};
