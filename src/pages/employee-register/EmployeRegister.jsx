import React, { useState } from "react";
import { cepMask, cpfMask } from "../../utils/utils";
import {
  ContainerRegisterEmployee,
  TitleRegister,
} from "./Employee.Register.styled";
import {
  showMessageRequest,
  EMPLOYEE_ADD_ERROR_MESSAGE,
  EMPLOYEE_ADD_SUCCESS_MESSAGE,
} from "../../utils/index";
import { Form as EmployeeForm } from "../../components/form/Form";
import { createEmployeeService } from "../../services";

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
};

export const EmployeeRegister = () => {
  const [employee, setEmployee] = useState(INITIAL_EMPLOYEE_VALUE);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createEmployeeService(employee, setLoading);
      showMessageRequest(EMPLOYEE_ADD_SUCCESS_MESSAGE);
      setEmployee(INITIAL_EMPLOYEE_VALUE);
    } catch (error) {
      showMessageRequest(EMPLOYEE_ADD_ERROR_MESSAGE);
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      photo: file,
    }));
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const photoBlob = new Blob([reader.result], { type: file.type });
      setEmployee((prevEmployee) => ({
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
        ...prevEmployee.address,
        [name]: formattedValue,
      },
    }));
  };

  return (
    <ContainerRegisterEmployee>
      <TitleRegister>Cadastro de Funcionários</TitleRegister>
      <EmployeeForm
        employee={employee}
        loading={loading}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onAddressChange={handleAddressChange}
      />
    </ContainerRegisterEmployee>
  );
};
