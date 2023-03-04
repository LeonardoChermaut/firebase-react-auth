import React, { useEffect, useState } from "react";
import { db } from "../../db/firebase";
import { collection, getDocs } from "firebase/firestore";

export const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeCollection = collection(db, "funcionarios");
      const snapshot = await getDocs(employeeCollection);
      const employeeData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployee(employeeData);
    };
    fetchEmployeeData();
  }, []);

  return (
    <div>
      <h2>Funcionários cadastrados:</h2>
      <ul>
        {employee.map((empl) => (
          <li key={empl.id}>
            <strong>Nome:</strong> {empl.nome}, <strong>Email:</strong>
            {empl.email}, <strong>CPF:</strong> {empl.cpf}
            <strong>Situação:</strong> {empl.ativo ? "Ativo" : "Desativado"}
          </li>
        ))}
      </ul>
    </div>
  );
};
