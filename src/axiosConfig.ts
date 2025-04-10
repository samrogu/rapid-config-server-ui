import axios from 'axios';

// Configurar el interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el token de localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agrega el encabezado Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Maneja errores en la configuración de la solicitud
  }
);

export default axios;