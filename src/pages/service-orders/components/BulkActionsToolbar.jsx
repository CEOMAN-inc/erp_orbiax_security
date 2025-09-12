import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsToolbar = ({ 
  selectedCount = 0, 
  onClearSelection, 
  onBulkStatusUpdate,
  onBulkAssignPersonnel,
  onBulkExport,
  onBulkDelete 
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  if (selectedCount === 0) return null;

  const bulkActions = [
    {
      id: 'status-update',
      label: 'Actualizar Estado',
      icon: 'RefreshCw',
      onClick: onBulkStatusUpdate,
      color: 'text-primary'
    },
    {
      id: 'assign-personnel',
      label: 'Asignar Personal',
      icon: 'Users',
      onClick: onBulkAssignPersonnel,
      color: 'text-secondary'
    },
    {
      id: 'export',
      label: 'Exportar Selección',
      icon: 'Download',
      onClick: onBulkExport,
      color: 'text-foreground'
    },
    {
      id: 'delete',
      label: 'Eliminar Selección',
      icon: 'Trash2',
      onClick: onBulkDelete,
      color: 'text-error',
      separator: true
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-2xl shadow-command backdrop-blur-command p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">{selectedCount}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount === 1 ? 'orden seleccionada' : 'órdenes seleccionadas'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkStatusUpdate}
              className="hidden sm:flex"
            >
              <Icon name="RefreshCw" size={16} />
              Estado
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkAssignPersonnel}
              className="hidden sm:flex"
            >
              <Icon name="Users" size={16} />
              Personal
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              className="hidden sm:flex"
            >
              <Icon name="Download" size={16} />
              Exportar
            </Button>

            {/* More Actions Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
              >
                <Icon name="MoreVertical" size={16} />
                <span className="hidden sm:inline ml-2">Más</span>
              </Button>

              {isActionsOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-popover border border-border rounded-lg shadow-command z-50">
                  <div className="p-2">
                    {bulkActions?.map((action) => (
                      <React.Fragment key={action?.id}>
                        {action?.separator && <div className="border-t border-border my-1" />}
                        <button
                          onClick={() => {
                            action?.onClick && action?.onClick();
                            setIsActionsOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors ${action?.color}`}
                        >
                          <Icon name={action?.icon} size={16} />
                          <span>{action?.label}</span>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Selection */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
              <span className="hidden sm:inline ml-2">Limpiar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;