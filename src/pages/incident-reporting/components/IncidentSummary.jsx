import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const IncidentSummary = ({ incidents = [] }) => {
  const getSummaryStats = () => {
    const total = incidents?.length;
    const open = incidents?.filter(i => i?.status === 'open')?.length;
    const inProgress = incidents?.filter(i => i?.status === 'in-progress')?.length;
    const resolved = incidents?.filter(i => i?.status === 'resolved')?.length;
    const closed = incidents?.filter(i => i?.status === 'closed')?.length;

    const critical = incidents?.filter(i => i?.severity === 'critical')?.length;
    const high = incidents?.filter(i => i?.severity === 'high')?.length;
    const medium = incidents?.filter(i => i?.severity === 'medium')?.length;
    const low = incidents?.filter(i => i?.severity === 'low')?.length;

    const resolvedIncidents = incidents?.filter(i => i?.resolutionTime);
    const avgResolutionTime = resolvedIncidents?.length > 0 
      ? Math.round(resolvedIncidents?.reduce((acc, i) => acc + parseFloat(i?.resolutionTime), 0) / resolvedIncidents?.length)
      : 0;

    return {
      total,
      open,
      inProgress,
      resolved,
      closed,
      critical,
      high,
      medium,
      low,
      avgResolutionTime
    };
  };

  const stats = getSummaryStats();

  const severityData = [
    { name: 'Crítica', value: stats?.critical, color: '#ef4444' },
    { name: 'Alta', value: stats?.high, color: '#f97316' },
    { name: 'Media', value: stats?.medium, color: '#eab308' },
    { name: 'Baja', value: stats?.low, color: '#22c55e' }
  ];

  const statusData = [
    { name: 'Abierto', value: stats?.open },
    { name: 'En Progreso', value: stats?.inProgress },
    { name: 'Resuelto', value: stats?.resolved },
    { name: 'Cerrado', value: stats?.closed }
  ];

  const typeData = incidents?.reduce((acc, incident) => {
    const type = incident?.type || 'other';
    const typeLabel = {
      'security': 'Seguridad',
      'safety': 'Seg. Laboral',
      'equipment': 'Equipamiento',
      'personnel': 'Personal',
      'client': 'Cliente',
      'other': 'Otro'
    }?.[type] || 'Otro';
    
    acc[typeLabel] = (acc?.[typeLabel] || 0) + 1;
    return acc;
  }, {});

  const typeChartData = Object.entries(typeData)?.map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Summary Cards */}
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total de Incidentes</h3>
            <Icon name="AlertTriangle" size={20} className="text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats?.total}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Incidentes Abiertos</h3>
            <Icon name="Clock" size={20} className="text-red-400" />
          </div>
          <p className="text-2xl font-bold text-red-400">{stats?.open}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">En Progreso</h3>
            <Icon name="Activity" size={20} className="text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-yellow-400">{stats?.inProgress}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tiempo Promedio</h3>
            <Icon name="Timer" size={20} className="text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats?.avgResolutionTime}h</p>
        </div>
      </div>
      {/* Severity Distribution */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Distribución por Severidad</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {severityData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {severityData?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-sm text-muted-foreground">{item?.name}: {item?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Status Distribution */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Estado de Incidentes</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IncidentSummary;