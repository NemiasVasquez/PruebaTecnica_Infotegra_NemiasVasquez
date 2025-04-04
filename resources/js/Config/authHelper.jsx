import { LimpiarDatosLocalStorage } from "./ConfiguraconRutas";

let navigateFunction = null;

export const setNavigateFunction = (navigate) => {
  navigateFunction = navigate;
};

export const redirectToLogin = async () => {
    await LimpiarDatosLocalStorage(); // Limpia antes de redirigir
    window.location.href = "/login"; // Usa redirección directa
};
