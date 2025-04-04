let navigateFunction = null;

export const setNavigateFunction = (navigate) => {
  navigateFunction = navigate;
};

export const redirectToLogin = async () => {
  if (navigateFunction) {
    alert("Se ha cerrado la sesión...")
    await LimpiarDatosLocalStorage();
    navigateFunction("/login");
  } else {
    console.warn("⚠️ No se pudo redirigir, usando fallback...");
    window.location.href = "/login"; // Fallback si no hay navegación activa
  }
};
