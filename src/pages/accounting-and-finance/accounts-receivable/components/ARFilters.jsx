import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Button from 'components/ui/Button';

const ARFilters = ({ onFilterChange }) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'Emitida', label: 'Emitida' },
    { value: 'Pagada', label: 'Pagada' },
    { value: 'Vencida', label: 'Vencida' },
    { value: 'Anulada', label: 'Anulada' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <Input label="Desde (Vencimiento)" type="date" />
        <Input label="Hasta (Vencimiento)" type="date" />
        <Select label="Cliente" options={[{ value: '', label: 'Todos los clientes' }]} searchable />
        <Select label="Estado" options={statusOptions} />
        <Button variant="outline">Aplicar Filtros</Button>
      </div>
    </div>
  );
};

export default ARFilters;