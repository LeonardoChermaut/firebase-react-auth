import React, { useState } from "react";
import { db, storage } from "../../db/firebase";
import { Container, Form, Button } from "react-bootstrap";

export const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    status: true,
    photo: null,
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
  });

  const addEmployee = async () => {
    try {
      const employeeRef = db.collection("employee").doc();
      const photoRef = storage.child(`employee/${employeeRef.id}/photo`);
      await photoRef.put(employee.photo);
      await employeeRef.set({
        status: employee.status,
        name: employee.name,
        email: employee.email,
        hiringDate: employee.hiringDate,
        cpf: employee.cpf,
        address: employee.address,
        photoUrl: await photoRef.getDownloadURL(),
      });
    } catch (error) {
      console.log("Erro ao adicionar funcionário: ", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(employee);
    addEmployee()
      .then(() => {
        alert("Funcionário adicionado com sucesso!");
        setEmployee({
          status: true,
          photo: null,
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
        });
      })
      .catch((error) => {
        console.log("Erro ao adicionar funcionário: ", error);
      });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const maskedValue = name === "cpf" ? cpfMask(value) : value;
    setEmployee({
      ...employee,
      [name]: maskedValue,
    });
  };

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{3})/, "$1-$2");
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      address: { ...prevEmployee.address, [name]: formattedValue },
    }));
  };

  return (
    <Container>
      <h1>Cadastro de Funcionários</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Leonardo Chermaut"
            maxLength={30}
            value={employee.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="leonardochermaut.jobs@gmail.com"
            maxLength={50}
            value={employee.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            name="cpf"
            placeholder="165.547.999-47"
            maxLength={14}
            value={employee.cpf}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="hiringDate">
          <Form.Label>Data de Contratação</Form.Label>
          <Form.Control
            type="date"
            name="hiringDate"
            value={employee.hiringDate}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="address.cep">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            name="cep"
            placeholder="25965-265"
            maxLength={9}
            value={employee.address.cep}
            onChange={handleAddressChange}
          />
        </Form.Group>
        <Form.Group controlId="address.city">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            type="text"
            name="city"
            maxLength={30}
            placeholder="Teresópolis"
            value={employee.address.city}
            onChange={handleAddressChange}
          />
        </Form.Group>
        <Form.Group controlId="address.street">
          <Form.Label>Rua</Form.Label>
          <Form.Control
            type="text"
            name="street"
            maxLength={50}
            placeholder="Rua Marcos Salles Canano, 221"
            value={employee.address.street}
            onChange={handleAddressChange}
          />
        </Form.Group>

        <Form.Group controlId="address.neighborhood">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            type="text"
            maxLength={30}
            name="neighborhood"
            placeholder="Vila Muqui"
            value={employee.address.neighborhood}
            onChange={handleAddressChange}
          />
        </Form.Group>

        <Form.Group controlId="address.state">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            name="state"
            maxLength={2}
            placeholder="RJ"
            value={employee.address.state}
            onChange={handleAddressChange}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Check
            type="switch"
            label={employee.status ? "Ativo" : "Inativo"}
            name="status"
            checked={employee.status}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="photo">
          <Form.Label>Foto</Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={(event) =>
              setEmployee({
                ...employee,
                photo: event.target.files[0],
              })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};
