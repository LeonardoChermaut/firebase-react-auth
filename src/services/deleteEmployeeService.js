import { db, deleteDocument, document } from "../db/firebase";
import { DELETE_ERROR_MESSAGE, DELETE_SUCCESS_MESSAGE } from "../utils";
import { showMessageRequest } from "../utils/utils";

export const deleteEmployeeService = async (id) => {
  try {
    const employeeRef = document(db, "employee", id);
    await deleteDocument(employeeRef);
    showMessageRequest(DELETE_SUCCESS_MESSAGE);
    return { success: true };
  } catch (error) {
    showMessageRequest(DELETE_ERROR_MESSAGE);
    console.error(error);
    return { success: false };
  }
};
