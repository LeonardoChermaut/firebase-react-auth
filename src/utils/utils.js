import Swal from "sweetalert2";
import {
  schemaSwal,
  schemaAlert,
  schemaSettings,
  schemaAlertTimer,
  GLOBAL_ERROR_MESSAGE,
} from "./index";

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

export const showMessageRequest = (param) => {
  const message = param || GLOBAL_ERROR_MESSAGE;
  return Swal.fire(schemaSettings.title(message), schemaSettings);
};

export const alertConfirmResquest = async () => {
  const alert = Swal.mixin(schemaSwal, schemaSwal.customClass);
  const { isConfirmed } = await alert.fire(schemaAlert);
  return isConfirmed;
};

export const showMessageWelcome = () => {
  return Swal.fire(schemaAlertTimer);
};
