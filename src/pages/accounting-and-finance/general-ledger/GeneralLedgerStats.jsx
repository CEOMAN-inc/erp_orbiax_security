import React from 'react';
import Icon from 'components/AppIcon';

const GeneralLedgerStats = ({ entries }) => {
  const totalDebits = entries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = entries.reduce((sum, entry) => sum + entry.credit, 0);
  const balance = totalDebits - totalCredits;

  const stats = [
    { title: 'Total Débitos', value: totalDebits, icon: 'ArrowDownCircle', color: 'text-primary' },
    { title: 'Total Créditos', value: totalCredits, icon: 'ArrowUpCircle', color: 'text-accent' },
    { title: 'Saldo Actual', value: balance, icon: 'Scale', color: 'text-success' },
    { title: 'N° Transacciones', value: entries.length, icon: 'FileText', color: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {stat.value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
              </p>
            </div>
            <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneralLedgerStats;