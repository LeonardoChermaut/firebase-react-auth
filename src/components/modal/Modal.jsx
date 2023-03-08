import React, { useState } from "react";
import { Modal as ModalEdit } from "react-bootstrap";
import { Button } from "../index";
import { Form as EmployeeForm } from "../index";

export const Modal = ({ employee, onClose, onSave }) => {
  const [show, setShow] = useState(true);
  const [employeeData, setEmployee] = useState(employee);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employeeData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(employeeData);
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <section>
      <ModalEdit show={show} onHide={handleClose}>
        <ModalEdit.Header closeButton>
          <ModalEdit.Title>Editar funcionário</ModalEdit.Title>
        </ModalEdit.Header>
        <ModalEdit.Body>
          <EmployeeForm
            employee={employeeData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </ModalEdit.Body>
      </ModalEdit>
    </section>
  );
};
