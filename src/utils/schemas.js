export const schemaSwal = {
  title: "Realmente deseja continuar?",
  text: "Essa ação será irreversível",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sim, deletar!",
};

export const schemaSettings = {
  position: "top-end",
  title: (message) => {
    return `${message}`;
  },
  showConfirmButton: false,
  timer: 1500,
};

export const schemaAlertTimer = {
  title: "Bem-vindo!",
  position: "top-end",
  text: "Que bom te ver novamente",
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
  icon: "success",
};

export const schemaAlert = {
  title: "Deseja prosseguir?",
  text: "Essa ação será irreversível",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Sim, deletar!",
  cancelButtonText: "Não, cancelar!",
  reverseButtons: true,
};
