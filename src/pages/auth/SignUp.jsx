import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await apiClient.post('/auth/signup', formData);
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error durante el registro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Crear Cuenta</h2>
      <p className="text-sm text-muted-foreground mb-6">Completa el formulario para registrarte.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nombre Completo" name="name" type="text" onChange={handleChange} required />
        <Input label="Correo Electrónico" name="email" type="email" onChange={handleChange} required />
        <Input label="Contraseña" name="password" type="password" onChange={handleChange} required />
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" fullWidth loading={isLoading}>
          Registrarse
        </Button>
      </form>
       <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;