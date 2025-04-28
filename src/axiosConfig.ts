import axios from 'axios';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create();

// Configurar el interceptor de solicitudes
axiosInstance.interceptors.request.use(
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

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la retornamos
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Si el token está vencido, no es válido o no tiene permisos, redirigimos al login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token'); // Eliminamos el token inválido
        window.location.href = '/login'; // Redirigimos al inicio de sesión
      }
    }
    return Promise.reject(error); // Rechazamos el error para manejarlo localmente si es necesario
  }
);

export default axiosInstance;