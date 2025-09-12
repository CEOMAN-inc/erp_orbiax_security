import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ServiceOrderFilters = ({ 
  onFilterChange, 
  onSearch, 
  activeFilters = {},
  onClearFilters 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    client: '',
    serviceType: '',
    priority: '',
    dateRange: { start: '', end: '' },
    ...activeFilters
  });

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'activo', label: 'Activo' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'urgente', label: 'Urgente' }
  ];

  const serviceTypeOptions = [
    { value: '', label: 'Todos los servicios' },
    { value: 'vigilancia', label: 'Vigilancia' },
    { value: 'escolta', label: 'Escolta' },
    { value: 'evento', label: 'Evento Especial' },
    { value: 'patrullaje', label: 'Patrullaje' },
    { value: 'monitoreo', label: 'Monitoreo' }
  ];

  const priorityOptions = [
    { value: '', label: 'Todas las prioridades' },
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Media' },
    { value: 'baja', label: 'Baja' }
  ];

  const clientOptions = [
    { value: '', label: 'Todos los clientes' },
    { value: 'banco-nacional', label: 'Banco Nacional' },
    { value: 'centro-comercial', label: 'Centro Comercial Plaza' },
    { value: 'empresa-logistica', label: 'Empresa Logística' },
    { value: 'residencial-norte', label: 'Residencial Norte' },
    { value: 'hospital-central', label: 'Hospital Central' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...filters?.dateRange, [type]: value };
    const newFilters = { ...filters, dateRange: newDateRange };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearch && onSearch(searchQuery);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      client: '',
      serviceType: '',
      priority: '',
      dateRange: { start: '', end: '' }
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onClearFilters && onClearFilters();
    onFilterChange && onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.status) count++;
    if (filters?.client) count++;
    if (filters?.serviceType) count++;
    if (filters?.priority) count++;
    if (filters?.dateRange?.start || filters?.dateRange?.end) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Buscar por orden, cliente, ubicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </form>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={16} />
            <span>Filtros</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </Button>

          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
              Limpiar
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4 progressive-disclosure">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
              <select
                value={filters?.status}
                onChange={(e) => handleFilterChange('status', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {statusOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Client Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cliente</label>
              <select
                value={filters?.client}
                onChange={(e) => handleFilterChange('client', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {clientOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tipo de Servicio</label>
              <select
                value={filters?.serviceType}
                onChange={(e) => handleFilterChange('serviceType', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {serviceTypeOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Prioridad</label>
              <select
                value={filters?.priority}
                onChange={(e) => handleFilterChange('priority', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {priorityOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Fecha Inicio</label>
              <Input
                type="date"
                value={filters?.dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Fecha Fin</label>
              <Input
                type="date"
                value={filters?.dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceOrderFilters;