import { auth } from "../../db/firebase";

export const updateProfile = async (email, password) => {
  const user = auth.currentUser;
  const promises = [];

  if (email && email !== user.email) {
    promises.push(user.updateEmail(email));
  }
  if (password) {
    promises.push(user.updatePassword(password));
  }

  try {
    await Promise.all(promises);
    return "Perfil atualizado com sucesso.";
  } catch (error) {
    throw new Error("Ocorreu um erro ao atualizar seu perfil");
  }
};
