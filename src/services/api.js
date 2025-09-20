import axios from 'axios';

// Creamos una instancia de Axios que usaremos en toda la app
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // Usará /api como base
});

// Interceptor para añadir el token de autenticación a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;