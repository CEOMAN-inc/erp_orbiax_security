import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@orbiax.com",
      role: "Administrator",
      status: "active",
      lastLogin: "2025-01-14 16:45:00",
      createdAt: "2024-03-15",
      permissions: ["all"]
    },
    {
      id: 2,
      name: "María González",
      email: "maria.gonzalez@orbiax.com",
      role: "Administrativo",
      status: "active",
      lastLogin: "2025-01-14 14:30:00",
      createdAt: "2024-05-20",
      permissions: ["contracts", "finances", "crm"]
    },
    {
      id: 3,
      name: "José Martínez",
      email: "jose.martinez@orbiax.com",
      role: "Supervisor",
      status: "active",
      lastLogin: "2025-01-14 12:15:00",
      createdAt: "2024-07-10",
      permissions: ["personnel", "operations", "services"]
    },
    {
      id: 4,
      name: "Ana López",
      email: "ana.lopez@orbiax.com",
      role: "Guarda",
      status: "inactive",
      lastLogin: "2025-01-10 08:00:00",
      createdAt: "2024-09-05",
      permissions: ["attendance", "incidents"]
    }
  ];

  const roleOptions = [
    { value: "", label: "Todos los roles" },
    { value: "Administrator", label: "Administrator" },
    { value: "Administrativo", label: "Administrativo" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Guarda", label: "Guarda" }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = !selectedRole || user?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-success/20 text-success`;
    }
    return `${baseClasses} bg-muted/20 text-muted-foreground`;
  };

  const getRoleBadge = (role) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    const roleColors = {
      'Administrator': 'bg-primary/20 text-primary',
      'Administrativo': 'bg-secondary/20 text-secondary',
      'Supervisor': 'bg-accent/20 text-accent',
      'Guarda': 'bg-warning/20 text-warning'
    };
    return `${baseClasses} ${roleColors?.[role] || 'bg-muted/20 text-muted-foreground'}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Gestión de Usuarios</h2>
          <p className="text-muted-foreground">Administra cuentas de usuario y permisos del sistema</p>
        </div>
        <Button 
          variant="default" 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => setShowAddUserModal(true)}
        >
          Agregar Usuario
        </Button>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            placeholder="Filtrar por rol"
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
          />
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Filter">
              Filtros Avanzados
            </Button>
            <Button variant="ghost" iconName="Download">
              Exportar
            </Button>
          </div>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedUsers?.length} usuario(s) seleccionado(s)
            </span>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('activate')}
              >
                Activar
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('deactivate')}
              >
                Desactivar
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleBulkAction('delete')}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="text-left p-4">
                  <Checkbox
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={handleSelectAll}
                    indeterminate={selectedUsers?.length > 0 && selectedUsers?.length < filteredUsers?.length}
                  />
                </th>
                <th className="text-left p-4 font-medium text-foreground">Usuario</th>
                <th className="text-left p-4 font-medium text-foreground">Rol</th>
                <th className="text-left p-4 font-medium text-foreground">Estado</th>
                <th className="text-left p-4 font-medium text-foreground">Último Acceso</th>
                <th className="text-left p-4 font-medium text-foreground">Fecha Creación</th>
                <th className="text-left p-4 font-medium text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-b border-border hover:bg-muted/10">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleSelectUser(user?.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={getRoleBadge(user?.role)}>
                      {user?.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={getStatusBadge(user?.status)}>
                      {user?.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(user.lastLogin)?.toLocaleString('es-ES')}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(user.createdAt)?.toLocaleDateString('es-ES')}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEditUser(user)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        iconName="MoreHorizontal"
                      >
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Agregar Usuario</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowAddUserModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <Input
                label="Nombre completo"
                type="text"
                placeholder="Ingrese el nombre completo"
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="usuario@orbiax.com"
                required
              />
              <Select
                label="Rol"
                placeholder="Seleccionar rol"
                options={roleOptions?.slice(1)}
                required
              />
              <Input
                label="Contraseña temporal"
                type="password"
                placeholder="Contraseña temporal"
                required
              />
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button 
                variant="outline"
                onClick={() => setShowAddUserModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="default">
                Crear Usuario
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;