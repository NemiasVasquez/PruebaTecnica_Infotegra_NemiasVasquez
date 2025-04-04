import axios from 'axios';
import { baseUrls } from './baseUrl';
import { LimpiarDatosLocalStorage } from './ConfiguraconRutas';
import { redirectToLogin } from './AuthHelper';
import { obtenerHoraActual } from '../Scripts/Functions/Formato/fechas';
import { useLoader } from '../Elements/Loader/LoaderProvider';

let currentBaseUrlIndex = 0;

const createApiInstance = (baseURL) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
};

let api = createApiInstance(baseUrls[currentBaseUrlIndex]);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ERR_NETWORK' && currentBaseUrlIndex < baseUrls.length - 1) {
      console.warn(`⚠️ Falló conexión con ${baseUrls[currentBaseUrlIndex]}, probando siguiente URL...`);
      currentBaseUrlIndex++;
      api = createApiInstance(baseUrls[currentBaseUrlIndex]);
      return api.request(error.config);
    }

    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Token expirado. Redirigiendo al login...");
      await redirectToLogin();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;

// 🔹 LOGIN
export const login = async (dni, password) => {
  const formData = new FormData();
  formData.append("usuario", dni);
  formData.append("password", password);

  try {
    const response = await api.post("/auth/login", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nombre", response.data.nombre);
      localStorage.setItem("usuario", response.data.usuario);
      localStorage.setItem("listaPermisos", JSON.stringify(response.data.listaPermisos));
      localStorage.setItem("idUsuario", response.data.idUsuario);
    }

    return response.data;
  } catch (error) {
    await LimpiarDatosLocalStorage();

    if (error) {
      alert(error.response.data.alert || "Credenciales erróneas.");
    } else {
      alert("Error de conexión con el servidor.");
    }
  }
};

// 🔹 LOGOUT
// 🔹 LOGOUT
export const logout = async () => {
  await api.post('/logout'); // Asegura que la API responda antes de continuar
  await LimpiarDatosLocalStorage(); // Limpia los datos
  window.location.href = "/login";
};


// 🔹 OBTENER DATOS
export const obtenerDataProtegida = async (endpoint) => {
  try {
    const response = await api.post(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error al obtener información:", error);
    alert(error.response.data.alert || "Error al obtener información.");
  } finally {
  }
};

// 🔹 ENVIAR FORMULARIO
export const enviarFormulario = async (endpoint, formData) => {
  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert(error.response.data.alert || "Error al enviar el formulario");

  } finally {
  }
};

