import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonnelPanel = ({ 
  personnel = [], 
  onPersonnelSelect, 
  selectedPersonnel = null,
  isCollapsed = false,
  onToggleCollapse 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  const roles = [
    { value: 'all', label: 'Todos los Roles' },
    { value: 'guard', label: 'Guardia' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'admin', label: 'Administrador' }
  ];

  const availabilityFilters = [
    { value: 'all', label: 'Todos' },
    { value: 'available', label: 'Disponible' },
    { value: 'assigned', label: 'Asignado' },
    { value: 'unavailable', label: 'No Disponible' }
  ];

  const filteredPersonnel = personnel?.filter(person => {
    const matchesSearch = person?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         person?.id?.toString()?.includes(searchQuery);
    const matchesRole = filterRole === 'all' || person?.role === filterRole;
    const matchesAvailability = filterAvailability === 'all' || person?.availability === filterAvailability;
    
    return matchesSearch && matchesRole && matchesAvailability;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'bg-success text-success-foreground';
      case 'assigned': return 'bg-warning text-warning-foreground';
      case 'unavailable': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return 'Crown';
      case 'supervisor': return 'Shield';
      case 'guard': return 'User';
      default: return 'User';
    }
  };

  const getCertificationStatus = (certifications) => {
    const expiringSoon = certifications?.filter(cert => {
      const daysUntilExpiry = Math.ceil((new Date(cert.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    });
    
    const expired = certifications?.filter(cert => new Date(cert.expiryDate) < new Date());
    
    if (expired?.length > 0) return { status: 'expired', count: expired?.length };
    if (expiringSoon?.length > 0) return { status: 'expiring', count: expiringSoon?.length };
    return { status: 'valid', count: 0 };
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-r border-border h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            title="Expandir Panel de Personal"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
          {filteredPersonnel?.slice(0, 10)?.map((person) => (
            <button
              key={person?.id}
              onClick={() => onPersonnelSelect(person)}
              className={`w-full h-12 rounded-lg border-2 border-dashed transition-all duration-200 flex items-center justify-center ${
                selectedPersonnel?.id === person?.id
                  ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted'
              }`}
              title={person?.name}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {person?.name?.split(' ')?.map(n => n?.[0])?.join('')?.substring(0, 2)}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Personal Disponible</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            title="Colapsar Panel"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar personal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {roles?.map(role => (
              <option key={role?.value} value={role?.value}>{role?.label}</option>
            ))}
          </select>

          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {availabilityFilters?.map(filter => (
              <option key={filter?.value} value={filter?.value}>{filter?.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Personnel List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredPersonnel?.map((person) => {
          const certStatus = getCertificationStatus(person?.certifications);
          
          return (
            <div
              key={person?.id}
              className={`p-4 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 ${
                selectedPersonnel?.id === person?.id
                  ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted'
              }`}
              onClick={() => onPersonnelSelect(person)}
              draggable
              onDragStart={(e) => {
                e?.dataTransfer?.setData('application/json', JSON.stringify(person));
                e.dataTransfer.effectAllowed = 'move';
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {person?.name?.split(' ')?.map(n => n?.[0])?.join('')?.substring(0, 2)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">{person?.name}</h4>
                    <Icon name={getRoleIcon(person?.role)} size={14} className="text-muted-foreground flex-shrink-0" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">ID: {person?.id}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(person?.availability)}`}>
                      {person?.availability === 'available' ? 'Disponible' :
                       person?.availability === 'assigned' ? 'Asignado' : 'No Disponible'}
                    </span>
                    
                    {certStatus?.status !== 'valid' && (
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        certStatus?.status === 'expired' ? 'bg-error text-error-foreground' : 'bg-warning text-warning-foreground'
                      }`}>
                        <Icon name="AlertTriangle" size={12} className="inline mr-1" />
                        {certStatus?.status === 'expired' ? 'Vencido' : 'Por Vencer'}
                      </div>
                    )}
                  </div>
                  
                  {person?.currentShift && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} className="inline mr-1" />
                      {person?.currentShift}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredPersonnel?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No se encontró personal</p>
          </div>
        )}
      </div>
      {/* Summary */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Disponible</p>
            <p className="text-sm font-semibold text-success">
              {personnel?.filter(p => p?.availability === 'available')?.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Asignado</p>
            <p className="text-sm font-semibold text-warning">
              {personnel?.filter(p => p?.availability === 'assigned')?.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">No Disponible</p>
            <p className="text-sm font-semibold text-error">
              {personnel?.filter(p => p?.availability === 'unavailable')?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonnelPanel;