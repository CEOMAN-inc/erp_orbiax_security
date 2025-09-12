import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonnelStats = ({ employees }) => {
  const totalEmployees = employees?.length;
  const activeEmployees = employees?.filter(emp => emp?.status === 'Activo')?.length;
  const expiredCertifications = employees?.filter(emp => emp?.certificationStatus === 'Vencida')?.length;
  const expiringCertifications = employees?.filter(emp => emp?.certificationStatus === 'Por Vencer')?.length;

  const roleDistribution = employees?.reduce((acc, emp) => {
    acc[emp.role] = (acc?.[emp?.role] || 0) + 1;
    return acc;
  }, {});

  const departmentDistribution = employees?.reduce((acc, emp) => {
    acc[emp.department] = (acc?.[emp?.department] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    {
      id: 'total',
      title: 'Total Empleados',
      value: totalEmployees,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      id: 'active',
      title: 'Empleados Activos',
      value: activeEmployees,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      id: 'expiring',
      title: 'Certificaciones por Vencer',
      value: expiringCertifications,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    {
      id: 'expired',
      title: 'Certificaciones Vencidas',
      value: expiredCertifications,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className={`bg-card border ${stat?.borderColor} rounded-lg p-6 hover:shadow-command transition-all duration-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
      {/* Role Distribution */}
      <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Distribución por Cargo</h4>
        <div className="space-y-3">
          {Object.entries(roleDistribution)?.map(([role, count]) => (
            <div key={role} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{role}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${(count / totalEmployees) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Department Distribution */}
      <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Distribución por Departamento</h4>
        <div className="space-y-3">
          {Object.entries(departmentDistribution)?.map(([department, count]) => (
            <div key={department} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{department}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
                    style={{ width: `${(count / totalEmployees) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonnelStats;