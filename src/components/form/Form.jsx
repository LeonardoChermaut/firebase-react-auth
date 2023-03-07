import React from "react";
import { Form as FormEmployee } from "react-bootstrap";
import { Button } from "../index";

export const Form = ({ employee, loading, onSubmit, onInputChange, onFileChange, onAddressChange }) => {
  return (
    <FormEmployee onSubmit={onSubmit}>
      <FormEmployee.Group controlId="name">
        <FormEmployee.Label>Nome</FormEmployee.Label>
        <FormEmployee.Control
          type="text"
          name="name"
          minLength={5}
          maxLength={30}
          value={employee.name}
          placeholder="Digite seu nome"
          onChange={onInputChange}
          required
        />
      </FormEmployee.Group>

      <FormEmployee.Group controlId="email">
        <FormEmployee.Label>Email</FormEmployee.Label>
        <FormEmployee.Control
          type="email"
          name="email"
          minLength={10}
          maxLength={50}
          value={employee.email}
          placeholder="Digite seu melhor email"
          onChange={onInputChange}
          required
        />
      </FormEmployee.Group>
      <FormEmployee.Group controlId="cpf">
        <FormEmployee.Label>CPF</FormEmployee.Label>
        <FormEmployee.Control
          type="text"
          name="cpf"
          minLength={14}
          maxLength={14}
          value={employee.cpf}
          placeholder="Digite seu CPF"
          onChange={onInputChange}
          required
        />
      </FormEmployee.Group>

      <FormEmployee.Group controlId="hiringDate">
        <FormEmployee.Label>Data de Contratação</FormEmployee.Label>
        <FormEmployee.Control
          type="date"
          name="hiringDate"
          value={employee.hiringDate}
          onChange={onInputChange}
          required
        />
      </FormEmployee.Group>

      <FormEmployee.Group controlId="address.cep">
        <FormEmployee.Label>CEP</FormEmployee.Label>
        <FormEmployee.Control
          type="text"
          name="cep"
          minLength={9}
          maxLength={9}
          placeholder="Digite seu CEP"
          value={employee.address.cep}
          onChange={onAddressChange}
          required
        />
      </FormEmployee.Group>
      <FormEmployee.Group controlId="address.city">
        <FormEmployee.Label>Cidade</FormEmployee.Label>
        <FormEmployee.Control
          type="text"
          name="city"
          maxLength={30}
          placeholder="Digite sua cidade"
          value={employee.address.city}
          onChange={onAddressChange}
          required
        />
      </FormEmployee.Group>
      <FormEmployee.Group controlId="address.street">
        <FormEmployee.Label>Rua</FormEmployee.Label>
        <FormEmployee.Control
          type="text"
          name="street"
          maxLength={50}
          value={employee.address.street}
          onChange={onAddressChange}
          placeholder="Digite o nome da rua e o número"
          required
        />
      </FormEmployee.Group>

      <FormEmployee.Group controlId="address.neighborhood">
        <FormEmployee.Label>Bairro</FormEmployee.Label>
        <FormEmployee.Control
          type="text"
          maxLength={30}
          name="neighborhood"
          placeholder="Digite o nome do seu bairro"
          value={employee.address.neighborhood}
          onChange={onAddressChange}
          required
        />
      </FormEmployee.Group>

      <FormEmployee.Group controlId="address.state">
        <FormEmployee.Label>Estado</FormEmployee.Label>
        <FormEmployee.Control
          type="text"
          name="state"
          maxLength={2}
          placeholder="Digite a sigla do seu estado"
          value={employee.address.state}
          onChange={onAddressChange}
          required
        />
      </FormEmployee.Group>
      <FormEmployee.Group controlId="status">
        <FormEmployee.Label>Situação do Funcionário</FormEmployee.Label>
        <FormEmployee.Check
          type="switch"
          label={employee.status ? "Ativo" : "Inativo"}
          name="status"
          checked={employee.status}
          onChange={onInputChange}
        />
      </FormEmployee.Group>
      <FormEmployee.Group controlId="photo">
        <FormEmployee.Label>Foto</FormEmployee.Label>
        <FormEmployee.Control
          type="file"
          name="photo"
          accept="image/*"
          onChange={onFileChange}
          required
        />
      </FormEmployee.Group>
      < Button disabled={loading} variant="success" type="submit">
        {loading ? "Enviando..." : "Enviar"}
      </ Button>
    </FormEmployee>
  );
};
