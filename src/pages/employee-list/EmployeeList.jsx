import React, { useEffect, useState } from "react";
import { employeeCollection, getDocument } from "../../db/firebase";
import { ButtonAction, TableEmployee, TitleTableEmployee, ContainerTableEmployee } from "./Employee.List.styled";
import { Col } from "react-bootstrap";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async () => {
      const snapshot = await getDocument(employeeCollection);
      const employees = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employees);
    })();
  }, []);

  return (
    <section>
      <ContainerTableEmployee fluid>
        <TitleTableEmployee>Funcionários Cadastrados</TitleTableEmployee>
        <TableEmployee responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Data de Contratação</th>
              <th>Status</th>
              <th>Foto</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.cpf}</td>
                <td>{employee.hiringDate}</td>
                <td>{employee.status ? "Ativo" : "Inativo"}</td>
                <td>
                  {employee.photo && (
                    <img
                      src={employee.photo}
                      alt="Foto do funcionário"
                      width="1000"
                      height="1000"
                    />
                  )}
                </td>
                <td>
                  <div>
                    {employee.address.street}, {employee.address.number}
                  </div>
                  <div>
                    {employee.address.neighborhood}, {employee.address.city} -{" "}
                    {employee.address.state}
                  </div>
                  <div>CEP: {employee.address.cep}</div>
                </td>
                <Col>
                  <ButtonAction variant="primary" size="sm">
                    Editar
                  </ButtonAction>
                  <ButtonAction variant="danger" size="sm">
                    Excluir
                  </ButtonAction>
                </Col>
              </tr>
            ))}
          </tbody>
        </TableEmployee>
      </ContainerTableEmployee>
    </section>
  );
};
