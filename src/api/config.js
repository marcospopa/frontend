import axios from 'axios';

// Crear instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:3001', // URL del JSON Server
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para peticiones
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Enviando petición:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Error en petición:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta recibida:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error en respuesta:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;