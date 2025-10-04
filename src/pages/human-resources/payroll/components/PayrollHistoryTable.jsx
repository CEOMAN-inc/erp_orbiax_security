import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const PayrollHistoryTable = ({ payrollRuns, onViewDetails }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pagada': return 'bg-success/20 text-success';
      case 'En Revisión': return 'bg-warning/20 text-warning';
      case 'Abierta': return 'bg-primary/20 text-primary';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Período</th>
              <th className="p-4 text-left text-sm font-medium">Fecha de Pago</th>
              <th className="p-4 text-center text-sm font-medium">N° Empleados</th>
              <th className="p-4 text-right text-sm font-medium">Costo Total</th>
              <th className="p-4 text-center text-sm font-medium">Estado</th>
              <th className="p-4 text-center text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payrollRuns.map((run) => (
              <tr key={run.id} className="hover:bg-muted/30">
                <td className="p-4 font-medium">{run.periodName}</td>
                <td className="p-4 text-sm text-muted-foreground">{run.paymentDate}</td>
                <td className="p-4 text-center text-sm">{run.employeeCount}</td>
                <td className="p-4 text-right font-mono">{run.totalCost.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(run.status)}`}>
                    {run.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" onClick={() => onViewDetails(run)}>Ver Detalles</Button>
                    <Button variant="ghost" size="icon" title="Descargar Recibos"><Icon name="Download" size={16} /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollHistoryTable;