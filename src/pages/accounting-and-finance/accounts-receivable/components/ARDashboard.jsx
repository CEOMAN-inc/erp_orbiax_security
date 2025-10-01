import React from 'react';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ARDashboard = ({ invoices }) => {
  // Lógica de cálculo para las estadísticas
  const stats = {
    totalReceivable: invoices.reduce((sum, inv) => sum + inv.balance, 0),
    overdue: invoices.filter(inv => inv.status === 'Vencida').reduce((sum, inv) => sum + inv.balance, 0),
    dueNext30Days: invoices.filter(inv => {
        const dueDate = new Date(inv.dueDate);
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        return inv.status === 'Emitida' && dueDate > today && dueDate <= thirtyDaysFromNow;
    }).reduce((sum, inv) => sum + inv.balance, 0),
    avgCollectionDays: 35, // Dato de ejemplo para Días Promedio de Cobro (DSO)
  };

  // Datos de ejemplo para el gráfico de antigüedad
  const agingData = [
    { name: 'Corriente', valor: 1850000 },
    { name: '1-30 Días', valor: 450000 },
    { name: '31-60 Días', valor: 250000 },
    { name: '60+ Días', valor: 100000 },
  ];

  const statCards = [
    { title: 'Saldo Total por Cobrar', value: stats.totalReceivable.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'TrendingUp', color: 'text-primary' },
    { title: 'Cartera Vencida', value: stats.overdue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'AlertTriangle', color: 'text-error' },
    { title: 'Ingresos Proyectados (30 Días)', value: stats.dueNext30Days.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), icon: 'CalendarClock', color: 'text-warning' },
    { title: 'Días Promedio de Cobro', value: `${stats.avgCollectionDays} días`, icon: 'Activity', color: 'text-success' },
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
        <h3 className="text-lg font-semibold text-foreground mb-4">Antigüedad de Cartera</h3>
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

export default ARDashboard;