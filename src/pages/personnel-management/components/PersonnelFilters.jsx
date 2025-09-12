import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonnelFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  employeeCount 
}) => {
  const roleOptions = [
    { value: '', label: 'Todos los cargos' },
    { value: 'Guardia de Seguridad', label: 'Guardia de Seguridad' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Coordinador', label: 'Coordinador' },
    { value: 'Jefe de Operaciones', label: 'Jefe de Operaciones' },
    { value: 'Administrador', label: 'Administrador' }
  ];

  const departmentOptions = [
    { value: '', label: 'Todos los departamentos' },
    { value: 'Operaciones', label: 'Operaciones' },
    { value: 'Administración', label: 'Administración' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' },
    { value: 'Finanzas', label: 'Finanzas' },
    { value: 'Comercial', label: 'Comercial' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'Suspendido', label: 'Suspendido' }
  ];

  const certificationOptions = [
    { value: '', label: 'Todas las certificaciones' },
    { value: 'Vigente', label: 'Vigente' },
    { value: 'Por Vencer', label: 'Por Vencer' },
    { value: 'Vencida', label: 'Vencida' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Cargo"
          options={roleOptions}
          value={filters?.role}
          onChange={(value) => onFilterChange('role', value)}
          placeholder="Seleccionar cargo"
        />

        <Select
          label="Departamento"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange('department', value)}
          placeholder="Seleccionar departamento"
        />

        <Select
          label="Estado"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Seleccionar estado"
        />

        <Select
          label="Certificaciones"
          options={certificationOptions}
          value={filters?.certificationStatus}
          onChange={(value) => onFilterChange('certificationStatus', value)}
          placeholder="Estado certificaciones"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Resultados: {employeeCount} empleados</span>
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} />
              <span>Filtros activos</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonnelFilters;