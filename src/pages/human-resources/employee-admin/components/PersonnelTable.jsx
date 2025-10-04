import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';

const PersonnelTable = ({ employees, onEdit, onViewDetails }) => {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Activo': return 'bg-success/20 text-success';
      case 'Inactivo': return 'bg-error/20 text-error';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getCertificationBadge = (status) => {
    switch (status) {
      case 'Vigente': return 'bg-success/20 text-success';
      case 'Por Vencer': return 'bg-warning/20 text-warning';
      case 'Vencida': return 'bg-error/20 text-error';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 w-12"><Checkbox /></th>
              <th className="p-4 text-left text-sm font-medium">Empleado</th>
              <th className="p-4 text-left text-sm font-medium">Cargo</th>
              <th className="p-4 text-left text-sm font-medium">Departamento</th>
              <th className="p-4 text-center text-sm font-medium">Estado</th>
              <th className="p-4 text-center text-sm font-medium">Certificaciones</th>
              <th className="p-4 text-left text-sm font-medium">Fecha Ingreso</th>
              <th className="p-4 text-center text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-muted/30">
                <td className="p-4"><Checkbox /></td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.email || `doc-${employee.id}@orbiax.com`}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm">{employee.role}</td>
                <td className="p-4 text-sm text-muted-foreground">{employee.department}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCertificationBadge(employee.certificationStatus)}`}>
                    {employee.certificationStatus}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{employee.hireDate}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button variant="ghost" size="icon" title="Ver Perfil" onClick={() => onViewDetails(employee.id)}>
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Editar Empleado" onClick={() => onEdit(employee.id)}>
                      <Icon name="Edit" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonnelTable;