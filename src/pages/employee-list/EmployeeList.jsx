import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import { Button, Modal } from "../../components/index";
import { FaEdit, FaTrash } from "react-icons/fa";
import { alertConfirmResquest } from "../../utils/utils";
import loadingLottie from "../../assets/loading-lottie.json";
import {
  deleteEmployeeService,
  getEmployeeService,
  updateEmployeeService,
} from "../../services";
import {
  showMessageRequest,
  DELETE_ERROR_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  UPDATED_ERROR_MESSAGE,
  UPDATED_SUCCSESS_MESSAGE,
} from "../../utils/index";
import {
  TableEmployee,
  TitleTableEmployee,
  ContainerTableEmployee,
  FigureImage,
  Div,
} from "./Employee.List.styled";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const editingEmployee = useRef(null);

  const handleUpdateEmployee = async (updatedEmployee) => {
    const result = await updateEmployeeService(updatedEmployee);
    if (result.success) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      );
      setEmployees(updatedEmployees);
      editingEmployee.current = null;
      setEditingEmployeeId(null);
      showMessageRequest(UPDATED_SUCCSESS_MESSAGE);
    } else {
      showMessageRequest(UPDATED_ERROR_MESSAGE, "error");
    }
  };

  const handleEditEmployee = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    editingEmployee.current = employee;
    setEditingEmployeeId(id);
  };

  const handleCloseModal = () => {
    setEditingEmployeeId(null);
    editingEmployee.current = null;
  };

  const handleDeleteEmployee = async (id) => {
    const confirmed = await alertConfirmResquest();
    if (!confirmed) {
      return;
    }
    const result = await deleteEmployeeService(id);
    if (result.success) {
      const updatedEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(updatedEmployees);
      showMessageRequest(DELETE_SUCCESS_MESSAGE);
    } else {
      showMessageRequest(DELETE_ERROR_MESSAGE, "error");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      await getEmployeeService(setEmployees, setIsLoading);
    };
    fetchEmployees();
  }, []);

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
              <TableEmployee responsive variant="dark" striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Contratação</th>
                    <th>Endereço</th>
                    <th>Status</th>
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
                            height={90}
                          />
                        )}
                      </td>
                      <td>
                        <Div>{employee.name}</Div>
                      </td>
                      <td>{employee.email}</td>
                      <td>
                        <Div>{employee.cpf}</Div>
                      </td>
                      <td>{employee.hiringDate}</td>
                      <td>
                        <Div>
                          {employee.address.street}, {employee.address.number}
                          {employee.address.neighborhood},{" "}
                          {employee.address.city} - {employee.address.state}
                          <br></br>
                          Cep: {employee.address.cep}
                        </Div>
                      </td>
                      <td>{employee.status ? "Ativo" : "Inativo"}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          onClick={() => handleEditEmployee(employee.id)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableEmployee>
            ) : (
              <div className="w-100 text-center mt-2">
                Não há funcionários cadastrados
              </div>
            )}
          </>
        )}
        {editingEmployeeId && (
          <Modal
            employee={employees.find(
              (employee) => employee.id === editingEmployeeId
            )}
            onClose={handleCloseModal}
            onSave={handleUpdateEmployee}
            onInputChange={handleUpdateEmployee}
          />
        )}
      </ContainerTableEmployee>
    </section>
  );
};
