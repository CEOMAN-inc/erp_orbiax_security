import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RoleSpecificWidget = ({ userRole = 'admin' }) => {
  const weeklyRosterData = [
    { day: 'Lun', coverage: 85 },
    { day: 'Mar', coverage: 92 },
    { day: 'Mié', coverage: 78 },
    { day: 'Jue', coverage: 88 },
    { day: 'Vie', coverage: 95 },
    { day: 'Sáb', coverage: 82 },
    { day: 'Dom', coverage: 76 }
  ];

  const serviceDistributionData = [
    { name: 'Vigilancia', value: 45, color: '#7c3aed' },
    { name: 'Escolta', value: 25, color: '#0ea5e9' },
    { name: 'Eventos', value: 20, color: '#ec4899' },
    { name: 'Otros', value: 10, color: '#10b981' }
  ];

  const contractRenewals = [
    { client: 'Centro Comercial Plaza', daysLeft: 15, value: '$45.000.000' },
    { client: 'Edificio Corporativo Norte', daysLeft: 8, value: '$32.000.000' },
    { client: 'Residencial Los Pinos', daysLeft: 22, value: '$28.000.000' }
  ];

  const teamAssignments = [
    { zone: 'Zona Norte', assigned: 12, required: 15, status: 'warning' },
    { zone: 'Zona Sur', assigned: 18, required: 18, status: 'success' },
    { zone: 'Zona Centro', assigned: 8, required: 12, status: 'error' },
    { zone: 'Zona Este', assigned: 14, required: 16, status: 'warning' }
  ];

  const guardSchedule = [
    { date: '2025-01-13', shift: 'Mañana', location: 'Centro Comercial Plaza', hours: '06:00 - 14:00' },
    { date: '2025-01-14', shift: 'Tarde', location: 'Edificio Corporativo Norte', hours: '14:00 - 22:00' },
    { date: '2025-01-15', shift: 'Noche', location: 'Residencial Los Pinos', hours: '22:00 - 06:00' }
  ];

  const equipmentStatus = [
    { item: 'Radio Motorola', status: 'assigned', condition: 'good' },
    { item: 'Linterna LED', status: 'assigned', condition: 'good' },
    { item: 'Chaleco Antibalas', status: 'pending', condition: 'maintenance' }
  ];

  const renderAdminWidget = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Financial Dashboard */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Distribución de Servicios</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceDistributionData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {serviceDistributionData?.map((item) => (
            <div key={item?.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-sm text-muted-foreground">{item?.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Renewals */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Renovaciones Próximas</h3>
        <div className="space-y-4">
          {contractRenewals?.map((contract, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">{contract?.client}</p>
                <p className="text-xs text-muted-foreground">{contract?.value}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  contract?.daysLeft <= 10 ? 'text-error' : 
                  contract?.daysLeft <= 20 ? 'text-warning' : 'text-success'
                }`}>
                  {contract?.daysLeft} días
                </p>
                <p className="text-xs text-muted-foreground">restantes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSupervisorWidget = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Team Assignments */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Asignaciones por Zona</h3>
        <div className="space-y-4">
          {teamAssignments?.map((assignment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">{assignment?.zone}</p>
                <p className="text-xs text-muted-foreground">
                  {assignment?.assigned} de {assignment?.required} asignados
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  assignment?.status === 'success' ? 'bg-success' :
                  assignment?.status === 'warning' ? 'bg-warning' : 'bg-error'
                }`} />
                <span className="text-sm font-medium text-foreground">
                  {Math.round((assignment?.assigned / assignment?.required) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Roster Coverage */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Cobertura Semanal</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyRosterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Cobertura']}
              />
              <Bar dataKey="coverage" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderGuardWidget = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* My Schedule */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mi Horario</h3>
        <div className="space-y-4">
          {guardSchedule?.map((schedule, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {new Date(schedule.date)?.getDate()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(schedule.date)?.toLocaleDateString('es-ES', { weekday: 'short' })}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{schedule?.location}</p>
                <p className="text-xs text-muted-foreground">{schedule?.shift} • {schedule?.hours}</p>
              </div>
              <Icon name="Clock" size={16} className="text-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Status */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Estado del Equipo</h3>
        <div className="space-y-4">
          {equipmentStatus?.map((equipment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">{equipment?.item}</p>
                <p className="text-xs text-muted-foreground capitalize">{equipment?.condition}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  equipment?.status === 'assigned' ? 'bg-success' :
                  equipment?.status === 'pending' ? 'bg-warning' : 'bg-error'
                }`} />
                <span className="text-sm text-muted-foreground capitalize">
                  {equipment?.status === 'assigned' ? 'Asignado' :
                   equipment?.status === 'pending' ? 'Pendiente' : 'No asignado'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdministrativeWidget = () => (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Resumen Administrativo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="FileText" size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold text-foreground">24</p>
          <p className="text-sm text-muted-foreground">Contratos Activos</p>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="DollarSign" size={24} className="mx-auto mb-2 text-success" />
          <p className="text-2xl font-bold text-foreground">$125M</p>
          <p className="text-sm text-muted-foreground">Facturación Mensual</p>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Package" size={24} className="mx-auto mb-2 text-secondary" />
          <p className="text-2xl font-bold text-foreground">156</p>
          <p className="text-sm text-muted-foreground">Activos Gestionados</p>
        </div>
      </div>
    </div>
  );

  const renderWidget = () => {
    switch (userRole) {
      case 'admin':
        return renderAdminWidget();
      case 'supervisor':
        return renderSupervisorWidget();
      case 'guard':
        return renderGuardWidget();
      case 'administrative':
        return renderAdministrativeWidget();
      default:
        return renderAdminWidget();
    }
  };

  return (
    <div className="space-y-6">
      {renderWidget()}
    </div>
  );
};

export default RoleSpecificWidget;