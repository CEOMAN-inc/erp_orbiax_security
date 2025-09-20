import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('accessToken')); // Lee desde localStorage en el estado inicial
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error("Token inválido, cerrando sesión.", error);
      logout(); // Si /me falla, es un token inválido, así que limpiamos todo
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []); // <-- Se ejecuta solo UNA VEZ al cargar la aplicación

  const login = async (username, password) => {
    const response = await apiClient.post('/auth/login', { username, password });
    const { access_token } = response.data;

    localStorage.setItem('accessToken', access_token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    
    // En lugar de llamar a setToken, llamamos a la función que ya obtiene los datos del usuario
    await fetchUser(); // <-- Esperamos a que la información del usuario se obtenga
    
    setToken(access_token); // Actualizamos el estado del token al final
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user, // <-- La autenticación ahora depende de si tenemos datos de usuario
  };

  // Muestra un loader mientras se valida el token inicial
  if (isLoading) {
    return <div>Cargando aplicación...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};