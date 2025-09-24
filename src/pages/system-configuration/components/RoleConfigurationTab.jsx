import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoleConfigurationTab = () => {
  const [selectedRole, setSelectedRole] = useState('Administrator');

  const roles = [
    {
      id: 'Administrator',
      name: 'Administrator',
      description: 'Acceso completo al sistema con permisos administrativos',
      color: 'primary',
      userCount: 3
    },
    {
      id: 'Administrativo',
      name: 'Administrativo',
      description: 'Gestión de contratos, finanzas y relaciones con clientes',
      color: 'secondary',
      userCount: 8
    },
    {
      id: 'Supervisor',
      name: 'Supervisor',
      description: 'Supervisión de personal y operaciones de campo',
      color: 'accent',
      userCount: 15
    },
    {
      id: 'Guarda',
      name: 'Guarda',
      description: 'Acceso básico para personal de seguridad en campo',
      color: 'warning',
      userCount: 45
    }
  ];

  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'LayoutDashboard',
      permissions: ['view', 'export']
    },
    {
      id: 'personal',
      name: 'Personal',
      icon: 'Users',
      permissions: ['view', 'create', 'edit', 'delete', 'assign']
    },
    {
      id: 'servicios',
      name: 'Servicios',
      icon: 'Shield',
      permissions: ['view', 'create', 'edit', 'delete', 'assign']
    },
    {
      id: 'operaciones',
      name: 'Operaciones',
      icon: 'Activity',
      permissions: ['view', 'create', 'edit', 'delete', 'approve']
    },
    {
      id: 'contratos',
      name: 'Contratos',
      icon: 'FileText',
      permissions: ['view', 'create', 'edit', 'delete', 'approve']
    },
    {
      id: 'finanzas',
      name: 'Finanzas',
      icon: 'DollarSign',
      permissions: ['view', 'create', 'edit', 'delete', 'approve']
    },
    {
      id: 'crm',
      name: 'CRM',
      icon: 'Users2',
      permissions: ['view', 'create', 'edit', 'delete', 'export']
    },
    {
      id: 'configuracion',
      name: 'Configuración',
      icon: 'Settings',
      permissions: ['view', 'edit', 'delete', 'manage']
    }
  ];

  const rolePermissions = {
    'Administrator': {
      dashboard: ['view', 'export'],
      personal: ['view', 'create', 'edit', 'delete', 'assign'],
      servicios: ['view', 'create', 'edit', 'delete', 'assign'],
      operaciones: ['view', 'create', 'edit', 'delete', 'approve'],
      contratos: ['view', 'create', 'edit', 'delete', 'approve'],
      finanzas: ['view', 'create', 'edit', 'delete', 'approve'],
      crm: ['view', 'create', 'edit', 'delete', 'export'],
      configuracion: ['view', 'edit', 'delete', 'manage']
    },
    'Administrativo': {
      dashboard: ['view', 'export'],
      personal: ['view'],
      servicios: ['view'],
      operaciones: ['view'],
      contratos: ['view', 'create', 'edit', 'delete'],
      finanzas: ['view', 'create', 'edit', 'delete'],
      crm: ['view', 'create', 'edit', 'delete', 'export'],
      configuracion: []
    },
    'Supervisor': {
      dashboard: ['view', 'export'],
      personal: ['view', 'edit', 'assign'],
      servicios: ['view', 'create', 'edit', 'assign'],
      operaciones: ['view', 'create', 'edit', 'approve'],
      contratos: ['view'],
      finanzas: ['view'],
      crm: ['view'],
      configuracion: []
    },
    'Guarda': {
      dashboard: ['view'],
      personal: ['view'],
      servicios: ['view'],
      operaciones: ['view', 'create'],
      contratos: [],
      finanzas: [],
      crm: [],
      configuracion: []
    }
  };

  const getPermissionLabel = (permission) => {
    const labels = {
      view: 'Ver',
      create: 'Crear',
      edit: 'Editar',
      delete: 'Eliminar',
      assign: 'Asignar',
      approve: 'Aprobar',
      export: 'Exportar',
      manage: 'Gestionar'
    };
    return labels?.[permission] || permission;
  };

  const getRoleColor = (color) => {
    const colors = {
      primary: 'bg-primary/20 text-primary border-primary/30',
      secondary: 'bg-secondary/20 text-secondary border-secondary/30',
      accent: 'bg-accent/20 text-accent border-accent/30',
      warning: 'bg-warning/20 text-warning border-warning/30'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Configuración de Roles</h2>
        <p className="text-muted-foreground">Define permisos y accesos por rol de usuario</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role Selector */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4">Roles del Sistema</h3>
            <div className="space-y-2">
              {roles?.map((role) => (
                <button
                  key={role?.id}
                  onClick={() => setSelectedRole(role?.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedRole === role?.id 
                      ? getRoleColor(role?.color)
                      : 'border-border hover:bg-muted/10'
                  }`}
                >
                  <div className="font-medium text-foreground">{role?.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{role?.description}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {role?.userCount} usuario(s)
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Permisos para {roles?.find(r => r?.id === selectedRole)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {roles?.find(r => r?.id === selectedRole)?.description}
                  </p>
                </div>
                <Button variant="outline" iconName="Save">
                  Guardar Cambios
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-medium text-foreground">Módulo</th>
                      <th className="text-center py-3 font-medium text-foreground">Ver</th>
                      <th className="text-center py-3 font-medium text-foreground">Crear</th>
                      <th className="text-center py-3 font-medium text-foreground">Editar</th>
                      <th className="text-center py-3 font-medium text-foreground">Eliminar</th>
                      <th className="text-center py-3 font-medium text-foreground">Especiales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules?.map((module) => {
                      const currentPermissions = rolePermissions?.[selectedRole]?.[module.id] || [];
                      
                      return (
                        <tr key={module.id} className="border-b border-border">
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <Icon name={module.icon} size={20} />
                              <span className="font-medium text-foreground">{module.name}</span>
                            </div>
                          </td>
                          <td className="text-center py-4">
                            <Checkbox
                              checked={currentPermissions?.includes('view')}
                              onChange={() => {}}
                            />
                          </td>
                          <td className="text-center py-4">
                            <Checkbox
                              checked={currentPermissions?.includes('create')}
                              onChange={() => {}}
                            />
                          </td>
                          <td className="text-center py-4">
                            <Checkbox
                              checked={currentPermissions?.includes('edit')}
                              onChange={() => {}}
                            />
                          </td>
                          <td className="text-center py-4">
                            <Checkbox
                              checked={currentPermissions?.includes('delete')}
                              onChange={() => {}}
                            />
                          </td>
                          <td className="text-center py-4">
                            <div className="flex justify-center space-x-2">
                              {module.permissions?.filter(p => !['view', 'create', 'edit', 'delete']?.includes(p))?.map(permission => (
                                  <div key={permission} className="flex flex-col items-center">
                                    <Checkbox
                                      checked={currentPermissions?.includes(permission)}
                                      onChange={() => {}}
                                    />
                                    <span className="text-xs text-muted-foreground mt-1">
                                      {getPermissionLabel(permission)}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {roles?.map((role) => (
          <div key={role?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{role?.userCount}</div>
                <div className="text-sm text-muted-foreground">Usuarios {role?.name}</div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRoleColor(role?.color)}`}>
                <Icon name="Users" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleConfigurationTab;