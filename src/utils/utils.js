import { MESSAGE_GLOBAL_ERROR } from "./errorContants";

export const cpfMask = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .slice(0, 14);
};

export const cepMask = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
};

export const alertErrorRequest = (message) => {
  const error = message || MESSAGE_GLOBAL_ERROR;
  return alert(error);
};
