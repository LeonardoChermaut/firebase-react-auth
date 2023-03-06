import React, { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import { Col } from "react-bootstrap";
import { alertConfirmResquest } from "../../utils/utils";
import loadingLottie  from "../../assets/loading-lottie.json"
import { employeeCollection, getDocument, deleteDocument, document, db } from "../../db/firebase";
import { showMessageRequest, DELETE_ERROR_MESSAGE, DELETE_SUCCESS_MESSAGE } from "../../utils/index";
import { ButtonAction, TableEmployee, TitleTableEmployee, ContainerTableEmployee, FigureImage } from "./Employee.List.styled";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const snapshot = await getDocument(employeeCollection);
        const employees = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employees);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (id) => {
    const confirmed = await alertConfirmResquest();
    if (!confirmed) {
      return;
    }
    try {
      const employeeRef = document(db, "employee", id);
      await deleteDocument(employeeRef);
      const updatedEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(updatedEmployees);
      showMessageRequest(DELETE_SUCCESS_MESSAGE);
    } catch (error) {
      showMessageRequest(DELETE_ERROR_MESSAGE);
      console.error(error);
    }
  };

  return (
    <section>
      <ContainerTableEmployee fluid>
        <TitleTableEmployee>Funcionários Cadastrados</TitleTableEmployee>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Lottie
              options={{ animationData: loadingLottie }}
              height={500}
              width={500}
            />
          </div>
        ) : (
          <>
            {employees.length > 0 ? (
              <TableEmployee responsive striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Data de Contratação</th>
                    <th>Status</th>
                    <th>Endereço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>
                        {employee.photoUrl && (
                          <FigureImage
                            src={employee.photoUrl}
                            alt="Foto do funcionário"
                            width={100}
                            height={100}
                          />
                        )}
                      </td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.cpf}</td>
                      <td>{employee.hiringDate}</td>
                      <td>{employee.status ? "Ativo" : "Inativo"}</td>
                      <td>
                        <div>
                          {employee.address.street}, {employee.address.number}
                        </div>
                        <div>
                          {employee.address.neighborhood},{" "}
                          {employee.address.city} - {employee.address.state}
                        </div>
                        <div>CEP: {employee.address.cep}</div>
                      </td>
                      <Col>
                        <ButtonAction size="sm" variant="outline-primary">
                          Editar
                        </ButtonAction>
                        <ButtonAction
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          Excluir
                        </ButtonAction>
                      </Col>
                    </tr>
                  ))}
                </tbody>
              </TableEmployee>
            ) : (
              <div>Não há funcionários cadastrados</div>
            )}
          </>
        )}
      </ContainerTableEmployee>
    </section>
  );
};
