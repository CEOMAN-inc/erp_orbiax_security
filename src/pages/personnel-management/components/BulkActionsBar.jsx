import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount, 
  onClearSelection, 
  onBulkAction 
}) => {
  const [selectedAction, setSelectedAction] = useState('');

  const actionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'activate', label: 'Activar empleados' },
    { value: 'deactivate', label: 'Desactivar empleados' },
    { value: 'suspend', label: 'Suspender empleados' },
    { value: 'export', label: 'Exportar selección' },
    { value: 'assign-role', label: 'Asignar cargo' },
    { value: 'change-department', label: 'Cambiar departamento' }
  ];

  const handleExecuteAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount} empleado{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Limpiar selección
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Seleccionar acción..."
            className="w-64"
          />
          
          <Button
            onClick={handleExecuteAction}
            disabled={!selectedAction}
            iconName="Play"
            iconPosition="left"
          >
            Ejecutar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;