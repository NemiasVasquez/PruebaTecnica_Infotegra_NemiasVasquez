import axios from 'axios';
import { baseUrls } from './baseUrl';

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
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ERR_NETWORK' && currentBaseUrlIndex < baseUrls.length - 1) {
      console.warn(`Falló conexión con ${baseUrls[currentBaseUrlIndex]}, probando siguiente URL...`);
      currentBaseUrlIndex++;
      api = createApiInstance(baseUrls[currentBaseUrlIndex]);
      return api.request(error.config);
    }

    if (error.response && error.response.status === 401) {
      console.warn("Token expirado. Redirigiendo al login...");
      await redirectToLogin();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
