import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const CompanyLookup = () => {
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!documentType || !documentNumber.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post('/auth/company-lookup', { 
        doc_type: documentType, 
        doc_number: documentNumber 
      });
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'La empresa no fue encontrada o los datos son incorrectos.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const documentTypes = [
      { value: '', label: 'Selecciona tu tipo de documento', disabled: true },
      { value: 'NIT', label: 'NIT' },
      { value: 'CC', label: 'Cédula de Ciudadanía' },
      { value: 'CE', label: 'Cédula de Extranjería' },
  ];

  return (
    <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Identificación de la Empresa</h2>
        <p className="text-sm text-muted-foreground mb-6">Ingresa el documento de tu empresa para comenzar.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
            <Select
                label="Tipo de Documento"
                options={documentTypes}
                value={documentType}
                onChange={(value) => setDocumentType(value)}
                required
            />
            <Input
                label="Número de Documento"
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder="Ej: 900123456-7"
                error={error ? ' ' : null}
                required
            />
            {error && (
                <p className="text-sm text-error text-center -mt-4">{error}</p>
            )}
            <Button type="submit" fullWidth loading={isLoading}>
                Continuar
            </Button>
        </form>
    </div>
  );
};

export default CompanyLookup;