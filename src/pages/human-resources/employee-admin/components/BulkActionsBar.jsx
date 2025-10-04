import React from 'react';
import Button from 'components/ui/Button';

const BulkActionsBar = ({ selectedCount }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mb-6 flex items-center justify-between">
      <span className="font-medium">{selectedCount} empleado(s) seleccionado(s)</span>
      <div className="space-x-2">
        <Button size="sm" variant="outline">Exportar</Button>
        <Button size="sm" variant="outline">Asignar a Turno</Button>
        <Button size="sm" variant="destructive">Desactivar</Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;