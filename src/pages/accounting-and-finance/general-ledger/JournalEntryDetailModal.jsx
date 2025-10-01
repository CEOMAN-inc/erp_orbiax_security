import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const JournalEntryDetailModal = ({ isOpen, onClose, entry }) => {
  if (!isOpen || !entry) return null;

  const { totalDebits, totalCredits } = entry.movements.reduce(
    (acc, mov) => {
      acc.totalDebits += mov.debit;
      acc.totalCredits += mov.credit;
      return acc;
    },
    { totalDebits: 0, totalCredits: 0 }
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Detalle del Asiento: {entry.ref}</h2>
            <p className="text-sm text-muted-foreground">Registrado el {new Date(entry.date).toLocaleDateString('es-CO')}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium text-foreground">Descripción General</h3>
            <p className="text-sm text-muted-foreground">{entry.description}</p>
          </div>

          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted/20">
                <tr>
                  <th className="p-3 text-left font-medium text-sm">Cuenta</th>
                  <th className="p-3 text-right font-medium text-sm">Débito</th>
                  <th className="p-3 text-right font-medium text-sm">Crédito</th>
                </tr>
              </thead>
              <tbody>
                {entry.movements.map((mov, index) => (
                  <tr key={index} className="border-b border-border last:border-b-0">
                    <td className="p-3 text-sm">{mov.account}</td>
                    <td className="p-3 text-right text-sm font-mono">
                      {mov.debit > 0 ? mov.debit.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '-'}
                    </td>
                    <td className="p-3 text-right text-sm font-mono">
                      {mov.credit > 0 ? mov.credit.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border mt-auto">
          <div className="flex space-x-6 text-sm">
              <div>Total Débitos: <span className="font-bold font-mono text-foreground">{totalDebits.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
              <div>Total Créditos: <span className="font-bold font-mono text-foreground">{totalCredits.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
          </div>
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryDetailModal;