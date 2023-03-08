import { addDocument, document, employeeCollection, getDownload, reference, storage, updateDocUser, upload } from "../db/firebase";
import { EMPLOYEE_ADD_ERROR_MESSAGE, EMPLOYEE_ADD_SUCCESS_MESSAGE, showMessageRequest } from "../utils";

export const createEmployeeService = async (employee, setLoading) => {
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