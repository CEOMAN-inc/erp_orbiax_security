import React from 'react';

const GeneralLedgerTable = ({ entries }) => {
  let runningBalance = 0;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-foreground">Fecha</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Cuenta</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Descripción</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Referencia</th>
              <th className="p-4 text-right text-sm font-medium text-foreground">Débito</th>
              <th className="p-4 text-right text-sm font-medium text-foreground">Crédito</th>
              <th className="p-4 text-right text-sm font-medium text-foreground">Saldo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((entry) => {
              runningBalance += entry.debit - entry.credit;
              return (
                <tr key={entry.id} className="hover:bg-muted/30">
                  <td className="p-4 text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString('es-CO')}</td>
                  <td className="p-4 text-sm text-foreground">{entry.account}</td>
                  <td className="p-4 text-sm text-muted-foreground">{entry.description}</td>
                  <td className="p-4 text-sm text-muted-foreground font-mono">{entry.ref}</td>
                  <td className="p-4 text-right text-sm text-foreground font-mono">
                    {entry.debit > 0 ? entry.debit.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '-'}
                  </td>
                  <td className="p-4 text-right text-sm text-foreground font-mono">
                    {entry.credit > 0 ? entry.credit.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '-'}
                  </td>
                  <td className="p-4 text-right text-sm text-foreground font-mono font-semibold">
                    {runningBalance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
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