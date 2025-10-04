import React from 'react';
import Icon from 'components/AppIcon';

const AttendanceDashboard = ({ userRole }) => {

  // --- VISTA PARA EL EMPLEADO ---
  if (userRole === 'employee') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Horas Trabajadas (Hoy)</p>
          <p className="text-2xl font-bold text-primary">4.5h</p>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-sm text-muted-foreground">Saldo de Vacaciones</p>
          <p className="text-2xl font-bold text-foreground">8.5 días</p>
        </div>
      </div>
    );
  }

  // --- VISTA PARA EL SUPERVISOR ---
  if (userRole === 'supervisor') {
    const supervisorStats = [
      { title: 'Solicitudes Pendientes', value: '3', icon: 'ClipboardList', color: 'text-warning' },
      { title: 'Empleados Ausentes Hoy', value: '2', icon: 'UserX', color: 'text-error' },
      { title: 'Horas Extra (Semana)', value: '35.5h', icon: 'Clock', color: 'text-primary' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supervisorStats.map(stat => (
          <div key={stat.title} className="bg-card p-4 border border-border rounded-lg flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-lg">
                <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null; // No mostrar nada si el rol no coincide
};

export default AttendanceDashboard;