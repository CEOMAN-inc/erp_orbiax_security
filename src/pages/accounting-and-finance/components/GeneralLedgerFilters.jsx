import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Button from 'components/ui/Button';

const GeneralLedgerFilters = ({ filters, onFilterChange }) => {
  
  const handleInputChange = (key, value) => {
    onFilterChange(prev => ({ ...prev, [key]: value }));
  };
  
  // En una app real, estas opciones vendrían de la API (Plan de Cuentas)
  const accountOptions = [
    { value: '', label: 'Todas las cuentas' },
    { value: '1105 - Caja', label: '1105 - Caja' },
    { value: '1110 - Bancos', label: '1110 - Bancos' },
    { value: '2205 - Proveedores Nacionales', label: '2205 - Proveedores Nacionales' },
    { value: '4135 - Ingresos por Ventas', label: '4135 - Ingresos por Ventas' },
    { value: '5135 - Servicios Públicos', label: '5135 - Servicios Públicos' },
    { value: '6205 - Compra de Mercancía', label: '6205 - Compra de Mercancía' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          label="Desde"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => handleInputChange('dateFrom', e.target.value)}
        />
        <Input
          label="Hasta"
          type="date"
          value={filters.dateTo}
          onChange={(e) => handleInputChange('dateTo', e.target.value)}
        />
        <Select
          label="Cuenta"
          options={accountOptions}
          value={filters.account}
          onChange={(value) => handleInputChange('account', value)}
        />
        <Input
          label="Descripción"
          type="text"
          placeholder="Buscar por descripción..."
          value={filters.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
        <div className="flex items-end">
          <Button variant="outline" fullWidth>Aplicar Filtros</Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerFilters;