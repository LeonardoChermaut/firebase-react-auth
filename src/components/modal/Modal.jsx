import React, { useState } from "react";
import { Modal as ModalEdit } from "react-bootstrap";
import { Button } from "../index";
import { Form as EmployeeForm } from "../index";

export const Modal = ({ employee, onClose, onSave }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave();
    handleClose();
  };

  return (
    <section>
      <ModalEdit show={show} onHide={handleClose}>
        <ModalEdit.Header closeButton>
          <ModalEdit.Title>Editar funcionário</ModalEdit.Title>
        </ModalEdit.Header>
        <ModalEdit.Body>
          <EmployeeForm employee={employee} onSubmit={handleSubmit} />
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </ModalEdit.Body>
      </ModalEdit>
    </section>
  );
};
