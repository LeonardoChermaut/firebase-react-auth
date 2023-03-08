import { employeeCollection, getDocument } from "../db/firebase";

export const getEmployeeService = async (setEmployees, setIsLoading) => {
  try {
    const snapshot = await getDocument(employeeCollection);
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmployees(employees);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
