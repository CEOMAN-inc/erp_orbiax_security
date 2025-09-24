import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
// import { Link } from 'react-router-dom'; // Ya no usamos Link para el registro
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import RequestAccessModal from './RequestAccessModal'; // <-- IMPORTA EL NUEVO MODAL

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- ESTADO PARA EL MODAL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(username, password);
      // La redirección la maneja el AuthContext
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Iniciar Sesión</h2>
        <p className="text-sm text-muted-foreground mb-6">Ingresa tus credenciales para acceder al sistema.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Usuario o Correo Electrónico"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" fullWidth loading={isLoading}>
            Acceder
          </Button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            ¿No tienes acceso?{' '}
            <button
              onClick={() => setIsModalOpen(true)} // <-- ABRE EL MODAL
              className="font-medium text-primary hover:underline focus:outline-none"
            >
              Solicita una invitación
            </button>
          </p>
        </div>
      </div>

      <RequestAccessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default LoginPage;