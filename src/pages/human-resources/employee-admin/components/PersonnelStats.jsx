import React from 'react';
import Icon from 'components/AppIcon';

const PersonnelStats = ({ employees }) => {
  const total = employees.length;
  const active = employees.filter(e => e.status === 'Activo').length;
  const expiring = employees.filter(e => e.certificationStatus === 'Por Vencer').length;
  const expired = employees.filter(e => e.certificationStatus === 'Vencida').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-card p-4 border border-border rounded-lg"><p className="text-sm text-muted-foreground">Total Empleados</p><p className="text-2xl font-bold">{total}</p></div>
      <div className="bg-card p-4 border border-border rounded-lg"><p className="text-sm text-muted-foreground">Empleados Activos</p><p className="text-2xl font-bold text-success">{active}</p></div>
      <div className="bg-card p-4 border border-border rounded-lg"><p className="text-sm text-muted-foreground">Cert. por Vencer</p><p className="text-2xl font-bold text-warning">{expiring}</p></div>
      <div className="bg-card p-4 border border-border rounded-lg"><p className="text-sm text-muted-foreground">Cert. Vencidas</p><p className="text-2xl font-bold text-error">{expired}</p></div>
    </div>
  );
};

export default PersonnelStats;