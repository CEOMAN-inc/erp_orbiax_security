import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const APTable = ({ invoices, onViewDetails, onRegisterPayment, onEdit }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pagada':
        return 'bg-success/20 text-success';
      case 'Pendiente':
        return 'bg-warning/20 text-warning';
      case 'Vencida':
        return 'bg-error/20 text-error';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-foreground">N° Factura</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Proveedor</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Fecha Emisión</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Fecha Vencimiento</th>
              <th className="p-4 text-center text-sm font-medium text-foreground">Estado</th>
              <th className="p-4 text-right text-sm font-medium text-foreground">Total</th>
              <th className="p-4 text-right text-sm font-medium text-foreground">Saldo Pendiente</th>
              <th className="p-4 text-center text-sm font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-muted/30">
                <td className="p-4 text-sm text-muted-foreground font-mono">{inv.id}</td>
                <td className="p-4 text-sm font-medium text-foreground">{inv.provider}</td>
                <td className="p-4 text-sm text-muted-foreground">{inv.issueDate}</td>
                <td className="p-4 text-sm text-muted-foreground">{inv.dueDate}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(inv.status)}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-right text-sm font-mono">{inv.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td className="p-4 text-right text-sm font-mono font-semibold">{inv.balance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button variant="ghost" size="icon" title="Ver Detalle" onClick={() => onViewDetails(inv)}>
                      <Icon name="Eye" size={16} />
                    </Button>
                    {inv.status !== 'Pagada' && (
                      <Button variant="ghost" size="icon" title="Registrar Pago" onClick={() => onRegisterPayment(inv)}>
                        <Icon name="DollarSign" size={16} />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" title="Editar" onClick={() => onEdit(inv)}>
                      <Icon name="Edit" size={16} />
                    </Button>
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

export default APTable;