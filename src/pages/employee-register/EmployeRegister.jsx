import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { cepMask, cpfMask } from "../../utils/utils";
import { ButtonSend, ContainerRegisterEmployee, TitleRegister,} from "./Employee.Register.styled";
import { showMessageRequest, EMPLOYEE_ADD_ERROR_MESSAGE, EMPLOYEE_ADD_SUCCESS_MESSAGE } from "../../utils/index";
import { storage, upload, document, reference, getDownload, addDocument, updateDocUser, employeeCollection } from "../../db/firebase";

const INITIAL_EMPLOYEE_VALUE = {
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
}

export const EmployeeRegister = () => {
  const [employee, setEmployee] = useState(INITIAL_EMPLOYEE_VALUE);
  const [loading, setLoading] = useState(false);

  const addEmployee = async () => {
    setLoading(true);
    try {
      const employeeRef = await addDocument(employeeCollection, {
        cpf: employee.cpf,
        name: employee.name,
        email: employee.email,
        status: employee.status,
        address: employee.address,
        hiringDate: employee.hiringDate,
      });
  
      const photo = reference(storage, `employee/${employeeRef.id}/photo`);
      await upload(photo, employee.photo);
      const photoUrl = await getDownload(photo);
      
      const docRef = document(employeeCollection, employeeRef.id);
      await updateDocUser(docRef, { photoUrl });
      showMessageRequest(EMPLOYEE_ADD_SUCCESS_MESSAGE);
      setLoading(false);
    } catch (error) {
      showMessageRequest(EMPLOYEE_ADD_ERROR_MESSAGE);
      console.error(error);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    addEmployee()
        .then(() => {
        showMessageRequest(EMPLOYEE_ADD_SUCCESS_MESSAGE);
        setEmployee(INITIAL_EMPLOYEE_VALUE);
      })
      .catch((error) => {
        showMessageRequest(EMPLOYEE_ADD_ERROR_MESSAGE);
        console.error(error);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      photo: file,
    }));
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const photoBlob = new Blob([reader.result], { type: file.type });
      setEmployee(prevEmployee => ({
        ...prevEmployee,
        photo: photoBlob,
      }));
    };
  };
  
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = name === "cep" ? cepMask(value) : value;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      address: {
        ...prevEmployee.address, [name]: formattedValue}}));
  };

  return (
    <ContainerRegisterEmployee>
      <TitleRegister>Cadastro de Funcionários</TitleRegister>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxLength={30}
            value={employee.name}
            placeholder="Leonardo Chermaut"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            maxLength={50}
            value={employee.email}
            placeholder="leonardochermaut.jobs@gmail.com"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            name="cpf"
            maxLength={14}
            value={employee.cpf}
            placeholder="165.547.952-47"
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
            maxLength={9}
            placeholder="25965-265"
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
            value={employee.address.street}
            placeholder="Rua Marcos Salles Canano, 221"
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
        <Form.Label>Situação do Funcionário</Form.Label>
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
            accept="image/*"
            onChange={handleFileChange}/>
        </Form.Group>
        <ButtonSend disabled={loading} variant="success" type="submit">
        {loading ? "Enviando..." : "Enviar"}
        </ButtonSend>
      </Form>
    </ContainerRegisterEmployee>
  );
};
