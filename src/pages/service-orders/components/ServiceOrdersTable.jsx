import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceOrdersTable = ({ 
  serviceOrders = [], 
  onRowClick, 
  onEdit, 
  onAssignPersonnel, 
  onStatusUpdate,
  selectedOrders = [],
  onSelectionChange 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(serviceOrders?.map(order => order?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      onSelectionChange([...selectedOrders, orderId]);
    } else {
      onSelectionChange(selectedOrders?.filter(id => id !== orderId));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'activo': { color: 'bg-success text-success-foreground', label: 'Activo' },
      'pendiente': { color: 'bg-warning text-warning-foreground', label: 'Pendiente' },
      'completado': { color: 'bg-primary text-primary-foreground', label: 'Completado' },
      'cancelado': { color: 'bg-error text-error-foreground', label: 'Cancelado' },
      'urgente': { color: 'bg-accent text-accent-foreground', label: 'Urgente' }
    };

    const config = statusConfig?.[status] || statusConfig?.['pendiente'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'alta') {
      return <Icon name="AlertTriangle" size={16} className="text-error" />;
    } else if (priority === 'media') {
      return <Icon name="Minus" size={16} className="text-warning" />;
    }
    return <Icon name="ArrowDown" size={16} className="text-muted-foreground" />;
  };

  const sortedOrders = React.useMemo(() => {
    if (!sortConfig?.key) return serviceOrders;

    return [...serviceOrders]?.sort((a, b) => {
      if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [serviceOrders, sortConfig]);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedOrders?.length === serviceOrders?.length && serviceOrders?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('orderNumber')}
              >
                <div className="flex items-center space-x-2">
                  <span>Orden</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('client')}
              >
                <div className="flex items-center space-x-2">
                  <span>Cliente</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Ubicación</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Servicio</th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-2">
                  <span>Estado</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Personal</th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('value')}
              >
                <div className="flex items-center space-x-2">
                  <span>Valor</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedOrders?.map((order) => (
              <tr 
                key={order?.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onRowClick && onRowClick(order)}
              >
                <td className="px-6 py-4" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedOrders?.includes(order?.id)}
                    onChange={(e) => handleSelectOrder(order?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(order?.priority)}
                    <span className="text-sm font-medium text-foreground">{order?.orderNumber}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order?.client}</p>
                    <p className="text-xs text-muted-foreground">{order?.clientContact}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-foreground">{order?.location}</p>
                    <p className="text-xs text-muted-foreground">{order?.address}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order?.serviceType}</p>
                    <p className="text-xs text-muted-foreground">{order?.schedule}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(order?.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {order?.assignedPersonnel?.slice(0, 3)?.map((person, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-card"
                          title={person?.name}
                        >
                          {person?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </div>
                      ))}
                    </div>
                    {order?.assignedPersonnel?.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{order?.assignedPersonnel?.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-foreground">
                    ${order?.value?.toLocaleString('es-CO')} COP
                  </p>
                </td>
                <td className="px-6 py-4" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit && onEdit(order)}
                      title="Editar orden"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAssignPersonnel && onAssignPersonnel(order)}
                      title="Asignar personal"
                    >
                      <Icon name="Users" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onStatusUpdate && onStatusUpdate(order)}
                      title="Actualizar estado"
                    >
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedOrders?.map((order) => (
          <div
            key={order?.id}
            className="bg-surface border border-border rounded-xl p-4 hover:shadow-command transition-all duration-200 cursor-pointer"
            onClick={() => onRowClick && onRowClick(order)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getPriorityIcon(order?.priority)}
                <span className="text-sm font-bold text-foreground">{order?.orderNumber}</span>
              </div>
              {getStatusBadge(order?.status)}
            </div>
            
            <div className="space-y-2 mb-4">
              <div>
                <p className="text-sm font-medium text-foreground">{order?.client}</p>
                <p className="text-xs text-muted-foreground">{order?.location}</p>
              </div>
              <div>
                <p className="text-sm text-foreground">{order?.serviceType}</p>
                <p className="text-xs text-muted-foreground">{order?.schedule}</p>
              </div>
              <p className="text-sm font-medium text-accent">
                ${order?.value?.toLocaleString('es-CO')} COP
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {order?.assignedPersonnel?.slice(0, 2)?.map((person, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold border border-card"
                    >
                      {person?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </div>
                  ))}
                </div>
                {order?.assignedPersonnel?.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{order?.assignedPersonnel?.length - 2}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-1" onClick={(e) => e?.stopPropagation()}>
                <Button variant="ghost" size="icon" onClick={() => onEdit && onEdit(order)}>
                  <Icon name="Edit" size={14} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onAssignPersonnel && onAssignPersonnel(order)}>
                  <Icon name="Users" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {serviceOrders?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="ClipboardList" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No hay órdenes de servicio</h3>
          <p className="text-muted-foreground mb-6">Comienza creando tu primera orden de servicio</p>
          <Button variant="default">
            <Icon name="Plus" size={16} />
            Crear Orden de Servicio
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceOrdersTable;