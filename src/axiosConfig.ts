import axios from 'axios';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create();

// Configurar el interceptor
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
    if (error.response?.status === 401) {
      // Si el token está vencido o no es válido, redirigimos al inicio de sesión
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token'); // Eliminamos el token vencido
        window.location.href = '/login'; // Redirigimos al inicio de sesión
      }
    }
    return Promise.reject(error); // Rechazamos el error para manejarlo localmente si es necesario
  }
);

export default axiosInstance;