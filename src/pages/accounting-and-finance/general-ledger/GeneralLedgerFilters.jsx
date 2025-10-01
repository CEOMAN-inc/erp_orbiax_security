import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Button from 'components/ui/Button';

const GeneralLedgerFilters = ({ filters, onFilterChange, onExport }) => {
  
  const handleInputChange = (key, value) => {
    onFilterChange(prev => ({ ...prev, [key]: value }));
  };
  
  const accountOptions = [
    { value: '', label: 'Todas las cuentas' },
    { value: '1105 - Caja', label: '1105 - Caja' },
    { value: '1110 - Bancos', label: '1110 - Bancos' },
    { value: '2205 - Proveedores Nacionales', label: '2205 - Proveedores Nacionales' },
    { value: '4135 - Ingresos por Ventas', label: '4135 - Ingresos por Ventas' },
    { value: '5135 - Servicios Públicos', label: '5135 - Servicios Públicos' },
    { value: '6205 - Compra de Mercancía', label: '6205 - Compra de Mercancía' },
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'Contabilizado', label: 'Contabilizado' },
    { value: 'Borrador', label: 'Borrador' },
    { value: 'Anulado', label: 'Anulado' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
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
          searchable
        />
        <Select
          label="Estado"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleInputChange('status', value)}
        />
        <Input
          label="Descripción"
          type="text"
          placeholder="Buscar..."
          value={filters.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
        <Button variant="outline" onClick={onExport} iconName="Download">Exportar</Button>
      </div>
    </div>
  );
};

export default GeneralLedgerFilters;