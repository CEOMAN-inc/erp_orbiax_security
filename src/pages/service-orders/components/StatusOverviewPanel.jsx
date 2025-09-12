import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusOverviewPanel = ({ metrics = {} }) => {
  const defaultMetrics = {
    activeServices: 45,
    pendingAssignments: 12,
    completedOrders: 128,
    totalRevenue: 2450000,
    ...metrics
  };

  const metricCards = [
    {
      id: 'active',
      title: 'Servicios Activos',
      value: defaultMetrics?.activeServices,
      icon: 'Shield',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      id: 'pending',
      title: 'Asignaciones Pendientes',
      value: defaultMetrics?.pendingAssignments,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+3',
      changeType: 'neutral'
    },
    {
      id: 'completed',
      title: 'Órdenes Completadas',
      value: defaultMetrics?.completedOrders,
      icon: 'CheckCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+15%',
      changeType: 'positive'
    },
    {
      id: 'revenue',
      title: 'Ingresos Totales',
      value: `$${defaultMetrics?.totalRevenue?.toLocaleString('es-CO')} COP`,
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+12%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-2xl p-6 hover:shadow-command transition-all duration-200 micro-interaction"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric?.bgColor} rounded-xl flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className={`text-sm font-medium ${
              metric?.changeType === 'positive' ? 'text-success' : 
              metric?.changeType === 'negative' ? 'text-error' : 'text-muted-foreground'
            }`}>
              {metric?.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {typeof metric?.value === 'number' ? metric?.value?.toLocaleString('es-CO') : metric?.value}
            </p>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusOverviewPanel;