import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const IncidentFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  personnelOptions = []
}) => {
  const severityOptions = [
    { value: '', label: 'Todas las severidades' },
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'open', label: 'Abierto' },
    { value: 'in-progress', label: 'En Progreso' },
    { value: 'resolved', label: 'Resuelto' },
    { value: 'closed', label: 'Cerrado' }
  ];

  const typeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'security', label: 'Seguridad' },
    { value: 'safety', label: 'Seguridad Laboral' },
    { value: 'equipment', label: 'Equipamiento' },
    { value: 'personnel', label: 'Personal' },
    { value: 'client', label: 'Cliente' },
    { value: 'other', label: 'Otro' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== null && value !== undefined
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filtros</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpiar Filtros
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Severidad"
          options={severityOptions}
          value={filters?.severity || ''}
          onChange={(value) => handleFilterChange('severity', value)}
        />

        <Select
          label="Estado"
          options={statusOptions}
          value={filters?.status || ''}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          label="Tipo de Incidente"
          options={typeOptions}
          value={filters?.type || ''}
          onChange={(value) => handleFilterChange('type', value)}
        />

        <Select
          label="Asignado a"
          options={[
            { value: '', label: 'Todos los asignados' },
            { value: 'unassigned', label: 'Sin asignar' },
            ...personnelOptions
          ]}
          value={filters?.assignedTo || ''}
          onChange={(value) => handleFilterChange('assignedTo', value)}
          searchable
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Fecha Desde"
          type="date"
          value={filters?.dateFrom || ''}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
        />

        <Input
          label="Fecha Hasta"
          type="date"
          value={filters?.dateTo || ''}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
        />

        <Input
          label="Buscar"
          type="search"
          placeholder="Buscar por título, descripción, ubicación..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default IncidentFilters;