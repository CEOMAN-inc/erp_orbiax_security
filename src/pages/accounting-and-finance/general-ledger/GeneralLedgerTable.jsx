import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const GeneralLedgerTable = ({ groupedEntries, onViewDetails, onEdit, onAnnul, onPost }) => {
  let runningBalance = 0;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Contabilizado':
        return 'bg-success/20 text-success';
      case 'Borrador':
        return 'bg-warning/20 text-warning';
      case 'Anulado':
        return 'bg-error/20 text-error';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border-t border-border rounded-b-lg overflow-hidden mt-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-foreground">Fecha</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Referencia</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Descripción</th>
              <th className="p-4 text-center text-sm font-medium text-foreground">Estado</th>
              <th className="p-4 text-right text-sm font-medium text-foreground">Débito</th>
              <th className="p-4 text-right text-sm font-medium text-foreground">Crédito</th>
              <th className="p-4 text-center text-sm font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {groupedEntries.map((group) => {
              const totalDebit = group.movements.reduce((sum, mov) => sum + mov.debit, 0);
              const totalCredit = group.movements.reduce((sum, mov) => sum + mov.credit, 0);

              return (
                <tr key={group.journalEntryId} className="hover:bg-muted/30">
                  <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{new Date(group.date).toLocaleDateString('es-CO')}</td>
                  <td className="p-4 text-sm text-muted-foreground font-mono">{group.ref}</td>
                  <td className="p-4 text-sm text-foreground max-w-xs truncate" title={group.description}>{group.description}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(group.status)}`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm text-foreground font-mono whitespace-nowrap">
                    {totalDebit > 0 ? totalDebit.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '-'}
                  </td>
                  <td className="p-4 text-right text-sm text-foreground font-mono whitespace-nowrap">
                    {totalCredit > 0 ? totalCredit.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '-'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="icon" title="Ver Detalle" onClick={() => onViewDetails(group)}>
                        <Icon name="Eye" size={16} />
                      </Button>
                      {group.status === 'Borrador' && (
                        <Button variant="ghost" size="icon" title="Editar Asiento" onClick={() => onEdit(group)}>
                          <Icon name="Edit" size={16} />
                        </Button>
                      )}
                      {group.status === 'Contabilizado' && (
                        <Button variant="ghost" size="icon" title="Anular Asiento" onClick={() => onAnnul(group)}>
                          <Icon name="Undo2" size={16} />
                        </Button>
                      )}
                      {group.status === 'Borrador' && (
                        <Button variant="ghost" size="icon" title="Contabilizar" onClick={() => onPost(group)}>
                          <Icon name="CheckCircle" size={16} className="text-success" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralLedgerTable;