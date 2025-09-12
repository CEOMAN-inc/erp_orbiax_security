import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarToolbar = ({ 
  currentWeek, 
  onWeekChange, 
  onCreateShiftTemplate, 
  onBulkAssignment, 
  onExportSchedule,
  filters,
  onFiltersChange 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const departments = [
    { value: 'all', label: 'Todos los Departamentos' },
    { value: 'security', label: 'Seguridad' },
    { value: 'surveillance', label: 'Vigilancia' },
    { value: 'patrol', label: 'Patrullaje' },
    { value: 'reception', label: 'Recepción' }
  ];

  const locations = [
    { value: 'all', label: 'Todas las Ubicaciones' },
    { value: 'main-office', label: 'Oficina Principal' },
    { value: 'warehouse', label: 'Almacén' },
    { value: 'parking', label: 'Estacionamiento' },
    { value: 'entrance', label: 'Entrada Principal' },
    { value: 'perimeter', label: 'Perímetro' }
  ];

  const shiftTypes = [
    { value: 'all', label: 'Todos los Turnos' },
    { value: 'regular', label: 'Regular' },
    { value: 'overtime', label: 'Horas Extra' },
    { value: 'holiday', label: 'Festivo' },
    { value: 'night', label: 'Nocturno' }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF', icon: 'FileText' },
    { value: 'excel', label: 'Excel', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV', icon: 'Database' }
  ];

  const formatWeekRange = () => {
    const startDate = new Date(currentWeek);
    const endDate = new Date(startDate);
    endDate?.setDate(startDate?.getDate() + 6);
    
    return `${startDate?.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: 'short' 
    })} - ${endDate?.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })}`;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate?.setDate(newDate?.getDate() + (direction * 7));
    onWeekChange(newDate);
  };

  const goToCurrentWeek = () => {
    const today = new Date();
    const monday = new Date(today);
    monday?.setDate(today?.getDate() - today?.getDay() + 1);
    onWeekChange(monday);
  };

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const handleExport = (format) => {
    onExportSchedule(format);
    setShowExportOptions(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.department !== 'all') count++;
    if (filters?.location !== 'all') count++;
    if (filters?.shiftType !== 'all') count++;
    if (filters?.dateRange?.start || filters?.dateRange?.end) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Main Toolbar */}
      <div className="flex items-center justify-between mb-4">
        {/* Week Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateWeek(-1)}
              title="Semana Anterior"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            
            <div className="text-center min-w-[200px]">
              <h2 className="text-lg font-semibold text-foreground">
                {formatWeekRange()}
              </h2>
              <p className="text-xs text-muted-foreground">
                Semana {Math.ceil((new Date(currentWeek) - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000))}
              </p>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateWeek(1)}
              title="Semana Siguiente"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            onClick={goToCurrentWeek}
            className="text-sm"
          >
            Hoy
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Filter"
              iconPosition="left"
            >
              Filtros
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={onCreateShiftTemplate}
            iconName="Template"
            iconPosition="left"
          >
            Plantilla de Turno
          </Button>

          <Button
            variant="outline"
            onClick={onBulkAssignment}
            iconName="Users"
            iconPosition="left"
          >
            Asignación Masiva
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowExportOptions(!showExportOptions)}
              iconName="Download"
              iconPosition="left"
            >
              Exportar
            </Button>

            {showExportOptions && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-command z-50">
                <div className="p-2">
                  {exportFormats?.map((format) => (
                    <button
                      key={format?.value}
                      onClick={() => handleExport(format?.value)}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                    >
                      <Icon name={format?.icon} size={16} />
                      <span>Exportar como {format?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Filters Panel */}
      {showFilters && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Departamento
              </label>
              <select
                value={filters?.department || 'all'}
                onChange={(e) => handleFilterChange('department', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {departments?.map(dept => (
                  <option key={dept?.value} value={dept?.value}>{dept?.label}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ubicación
              </label>
              <select
                value={filters?.location || 'all'}
                onChange={(e) => handleFilterChange('location', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {locations?.map(location => (
                  <option key={location?.value} value={location?.value}>{location?.label}</option>
                ))}
              </select>
            </div>

            {/* Shift Type Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo de Turno
              </label>
              <select
                value={filters?.shiftType || 'all'}
                onChange={(e) => handleFilterChange('shiftType', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {shiftTypes?.map(type => (
                  <option key={type?.value} value={type?.value}>{type?.label}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rango de Fechas
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters?.dateRange?.start || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...filters?.dateRange,
                    start: e?.target?.value
                  })}
                  className="flex-1 px-2 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="date"
                  value={filters?.dateRange?.end || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...filters?.dateRange,
                    end: e?.target?.value
                  })}
                  className="flex-1 px-2 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {getActiveFiltersCount() > 0 ? 
                `${getActiveFiltersCount()} filtro(s) activo(s)` : 
                'Sin filtros aplicados'
              }
            </div>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFiltersChange({
                  department: 'all',
                  location: 'all',
                  shiftType: 'all',
                  dateRange: {}
                })}
              >
                Limpiar Filtros
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarToolbar;