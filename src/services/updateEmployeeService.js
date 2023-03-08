import { db, document, updateDocUser } from "../db/firebase";
import { showMessageRequest } from "../utils";

export const updateEmployeeService = async (updatedEmployee) => {
  try {
    const employeeRef = document(db, "employee", updatedEmployee.id);
    await updateDocUser(employeeRef, updatedEmployee);
    showMessageRequest("Funcionário atualizado com sucesso");
    return { success: true };
  } catch (error) {
    showMessageRequest("Erro ao atualizar funcionário");
    console.error(error);
    return { success: false };
  }
};
