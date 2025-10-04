import React from 'react';
import Icon from 'components/AppIcon';

const PayrollDashboard = ({ lastPayroll }) => {
  const stats = [
    { title: 'Costo Total (Última Nómina)', value: (lastPayroll.totalCost || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'Wallet', color: 'text-primary' },
    { title: 'Próxima Fecha de Pago', value: '15/10/2025', icon: 'CalendarClock', color: 'text-success' },
    { title: 'Empleados en Nómina', value: lastPayroll.employeeCount || 0, icon: 'Users', color: 'text-secondary' },
    { title: 'Retenciones del Mes', value: (lastPayroll.totalDeductions || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'FileMinus', color: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(card => (
        <div key={card.title} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-lg">
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-xl font-bold text-foreground">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayrollDashboard;