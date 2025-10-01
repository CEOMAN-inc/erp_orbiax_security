import React from 'react';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const APDashboard = ({ invoices }) => {
  const stats = {
    totalBalance: invoices.reduce((sum, inv) => sum + inv.balance, 0),
    overdue: invoices.filter(inv => inv.status === 'Vencida').reduce((sum, inv) => sum + inv.balance, 0),
    dueNext7Days: 550000, // Valor de ejemplo
    activeProviders: new Set(invoices.map(inv => inv.provider)).size,
  };

  const agingData = [
    { name: 'Corriente', valor: 1500000 },
    { name: '1-30 Días', valor: 350000 },
    { name: '31-60 Días', valor: 150000 },
    { name: '60+ Días', valor: 50000 },
  ];

  const statCards = [
    { title: 'Saldo Total por Pagar', value: stats.totalBalance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'Scale', color: 'text-primary' },
    { title: 'Facturas Vencidas', value: stats.overdue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'AlertTriangle', color: 'text-error' },
    { title: 'Pagos Próximos (7 Días)', value: stats.dueNext7Days.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'CalendarClock', color: 'text-warning' },
    { title: 'Proveedores Activos', value: stats.activeProviders, icon: 'Users', color: 'text-success' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map(card => (
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
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Antigüedad de Saldos</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agingData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} width={80} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'var(--color-muted)' }} formatter={(value) => [value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), 'Saldo']} />
              <Bar dataKey="valor" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default APDashboard;