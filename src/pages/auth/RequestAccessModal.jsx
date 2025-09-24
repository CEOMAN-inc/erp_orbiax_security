import React, { useState } from 'react';
import apiClient from '../../services/api';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const RequestAccessModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      // Simulación de llamada al backend para solicitar acceso
      // En un caso real, aquí harías: await apiClient.post('/auth/request-invitation', { email });
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage('Tu solicitud ha sido enviada al administrador de tu empresa. Recibirás un correo una vez que sea aprobada.');
      setEmail(''); // Limpia el campo
    } catch (error) {
      setMessage('Error al enviar la solicitud. Por favor, intenta más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md m-auto relative shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Solicitar Acceso</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Ingresa tu correo corporativo. Se enviará una solicitud de acceso al administrador de tu empresa.
            </p>
          </div>

          {message ? (
            <div className="text-center p-4 bg-success/10 text-success rounded-lg">
              <p>{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@empresa.com"
                required
              />
              <Button type="submit" fullWidth loading={isLoading}>
                Enviar Solicitud
              </Button>
            </form>
          )}
        </div>
        <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2"
        >
            <Icon name="X" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default RequestAccessModal;