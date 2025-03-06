import axios from 'axios';
import { baseUrls } from './baseUrl';
import { LimpiarDatosLocalStorage } from './ConfiguraconRutas';

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

const retryRequest = async (error) => {
  if (error.code === 'ERR_NETWORK' && currentBaseUrlIndex < baseUrls.length - 1) {
    console.warn(`⚠️ Falló conexión con ${baseUrls[currentBaseUrlIndex]}, probando siguiente URL...`);

    currentBaseUrlIndex++; 
    
    api = createApiInstance(baseUrls[currentBaseUrlIndex]); 

    return api.request(error.config);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(response => response, retryRequest);

// 🔹 LOGIN
export const login = async (dni, password) => {
  const formData = new FormData();
  formData.append('documento_identidad', dni);
  formData.append('password', password);

  try {
    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('nombre', response.data.nombre);
    }

    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response?.data || { error: 'Error de conexión con el servidor' };
  }
};

// 🔹 LOGOUT
export const logout = async () => {
  try {
    await api.post('/logout');
    await LimpiarDatosLocalStorage(); 
    window.location.href = '/login'; 
  } catch (error) {
    return error.response?.data || { error: 'Error de conexión con el servidor' };
  }
};

export const obtenerDataProtegida = async (endpoint) => {
  try {
    const response = await api.post(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'No se pudo obtener la información' };
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
    throw error.response?.data || { error: 'Error al enviar el formulario' };
  }
};


export default api;
