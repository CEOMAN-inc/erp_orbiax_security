import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AssetFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  assetCounts,
  onExport 
}) => {
  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'Armas', label: 'Armas' },
    { value: 'Vehículos', label: 'Vehículos' },
    { value: 'Equipos', label: 'Equipos' },
    { value: 'Tecnología', label: 'Tecnología' }
  ];

  const statuses = [
    { value: '', label: 'Todos los estados' },
    { value: 'Activo', label: 'Activo' },
    { value: 'En Mantenimiento', label: 'En Mantenimiento' },
    { value: 'Fuera de Servicio', label: 'Fuera de Servicio' },
    { value: 'En Reparación', label: 'En Reparación' }
  ];

  const locations = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'Sede Principal', label: 'Sede Principal' },
    { value: 'Almacén Norte', label: 'Almacén Norte' },
    { value: 'Almacén Sur', label: 'Almacén Sur' },
    { value: 'Base Operativa 1', label: 'Base Operativa 1' },
    { value: 'Base Operativa 2', label: 'Base Operativa 2' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
            >
              Limpiar Filtros
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
          >
            Exportar
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Buscar por nombre, código o descripción..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={filters?.category}
            onChange={(e) => onFilterChange('category', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories?.map(category => (
              <option key={category?.value} value={category?.value}>
                {category?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filters?.status}
            onChange={(e) => onFilterChange('status', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {statuses?.map(status => (
              <option key={status?.value} value={status?.value}>
                {status?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <select
            value={filters?.location}
            onChange={(e) => onFilterChange('location', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {locations?.map(location => (
              <option key={location?.value} value={location?.value}>
                {location?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Assignment Filter */}
        <div>
          <select
            value={filters?.assignment}
            onChange={(e) => onFilterChange('assignment', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Todas las asignaciones</option>
            <option value="assigned">Asignados</option>
            <option value="unassigned">No asignados</option>
          </select>
        </div>

        {/* Maintenance Filter */}
        <div>
          <select
            value={filters?.maintenance}
            onChange={(e) => onFilterChange('maintenance', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Todo mantenimiento</option>
            <option value="overdue">Mantenimiento vencido</option>
            <option value="upcoming">Próximo mantenimiento</option>
            <option value="scheduled">Mantenimiento programado</option>
          </select>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Activos</p>
              <p className="text-lg font-semibold text-foreground">{assetCounts?.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Activos</p>
              <p className="text-lg font-semibold text-foreground">{assetCounts?.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Wrench" size={20} className="text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">En Mantenimiento</p>
              <p className="text-lg font-semibold text-foreground">{assetCounts?.maintenance}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Mantenimiento Vencido</p>
              <p className="text-lg font-semibold text-foreground">{assetCounts?.overdue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetFilters;