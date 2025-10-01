import React from 'react';
import Icon from 'components/AppIcon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CMDashboard = () => {
  const stats = {
    totalBalance: 258300000,
    netCashFlow: -15200000,
    unreconciled: 18,
    projectedLiquidity: 275500000,
  };

  const cashFlowData = [
    { name: 'Sem 1', Ingresos: 4000, Egresos: 2400 },
    { name: 'Sem 2', Ingresos: 3000, Egresos: 1398 },
    { name: 'Sem 3', Ingresos: 2000, Egresos: 9800 },
    { name: 'Sem 4', Ingresos: 2780, Egresos: 3908 },
  ];

  const statCards = [
    { title: 'Saldo Total en Bancos', value: stats.totalBalance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'Landmark', color: 'text-primary' },
    { title: 'Flujo de Caja Neto (30d)', value: stats.netCashFlow.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'ArrowRightLeft', color: stats.netCashFlow > 0 ? 'text-success' : 'text-error' },
    { title: 'Transacciones sin Conciliar', value: stats.unreconciled, icon: 'HelpCircle', color: 'text-warning' },
    { title: 'Liquidez Proyectada (30d)', value: stats.projectedLiquidity.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'TrendingUp', color: 'text-success' },
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
        <h3 className="text-lg font-semibold text-foreground mb-4">Flujo de Caja Semanal</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'var(--color-muted)' }} formatter={(value) => value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Ingresos" fill="var(--color-success)" name="Ingresos" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Egresos" fill="var(--color-error)" name="Egresos" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CMDashboard;