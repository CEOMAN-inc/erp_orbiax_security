import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetCard = ({ asset, onEdit, onAssign, onMaintenance, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-success text-success-foreground';
      case 'En Mantenimiento':
        return 'bg-warning text-warning-foreground';
      case 'Fuera de Servicio':
        return 'bg-error text-error-foreground';
      case 'En Reparación':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Armas':
        return 'Shield';
      case 'Vehículos':
        return 'Car';
      case 'Equipos':
        return 'HardHat';
      case 'Tecnología':
        return 'Laptop';
      default:
        return 'Package';
    }
  };

  const isMaintenanceOverdue = asset?.nextMaintenance && new Date(asset.nextMaintenance) < new Date();

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-command transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name={getCategoryIcon(asset?.category)} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{asset?.name}</h3>
            <p className="text-sm text-muted-foreground">{asset?.code}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset?.status)}`}>
            {asset?.status}
          </span>
          {isMaintenanceOverdue && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              Mantenimiento Vencido
            </span>
          )}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Categoría:</span>
          <span className="text-foreground font-medium">{asset?.category}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Ubicación:</span>
          <span className="text-foreground">{asset?.location}</span>
        </div>

        {asset?.assignedTo && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Asignado a:</span>
            <span className="text-foreground">{asset?.assignedTo}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Próximo Mantenimiento:</span>
          <span className={`${isMaintenanceOverdue ? 'text-error' : 'text-foreground'}`}>
            {asset?.nextMaintenance ? new Date(asset.nextMaintenance)?.toLocaleDateString('es-CO') : 'No programado'}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(asset)}
          className="flex-1"
        >
          Ver Detalles
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(asset)}
          iconName="Edit"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAssign(asset)}
          iconName="UserPlus"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMaintenance(asset)}
          iconName="Wrench"
        />
      </div>
    </div>
  );
};

export default AssetCard;