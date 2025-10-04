import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Button from 'components/ui/Button';

const PersonnelFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-card p-4 border border-border rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <Input label="Buscar por Nombre" placeholder="Carlos Rodríguez..." />
        <Select label="Cargo" options={[{value: '', label: 'Todos los cargos'}]} />
        <Select label="Departamento" options={[{value: '', label: 'Todos los departamentos'}]} />
        <Select label="Estado" options={[{value: '', label: 'Todos los estados'}]} />
        <Button variant="outline">Aplicar Filtros</Button>
      </div>
    </div>
  );
};

export default PersonnelFilters;