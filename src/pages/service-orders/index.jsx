import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import StatusOverviewPanel from './components/StatusOverviewPanel';
import ServiceOrderFilters from './components/ServiceOrderFilters';
import ServiceOrdersTable from './components/ServiceOrdersTable';
import ServiceOrderModal from './components/ServiceOrderModal';
import BulkActionsToolbar from './components/BulkActionsToolbar';

const ServiceOrdersPage = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for service orders
  const mockServiceOrders = [
    {
      id: 1,
      orderNumber: 'SO-2025-001',
      client: 'Banco Nacional',
      clientContact: 'Ana Pérez - Gerente Seguridad',
      location: 'Sucursal Centro',
      address: 'Carrera 7 # 32-16, Bogotá',
      serviceType: 'Vigilancia Nocturna',
      schedule: '18:00 - 06:00',
      status: 'activo',
      priority: 'alta',
      value: 2500000,
      assignedPersonnel: [
        { id: 1, name: 'Carlos Rodríguez', role: 'Supervisor' },
        { id: 2, name: 'María González', role: 'Guardia' },
        { id: 3, name: 'José Martínez', role: 'Guardia' }
      ],
      startDate: '2025-01-12',
      endDate: '2025-02-12',
      description: `Servicio de vigilancia nocturna para sucursal bancaria ubicada en el centro de la ciudad. 
      Requiere personal armado con experiencia en seguridad bancaria. Horario de 18:00 a 06:00 horas.
      Incluye patrullaje perimetral cada 2 horas y monitoreo de sistemas de alarma.`
    },
    {
      id: 2,
      orderNumber: 'SO-2025-002',
      client: 'Centro Comercial Plaza',
      clientContact: 'Luis García - Jefe Seguridad',
      location: 'Plaza Norte',
      address: 'Calle 127 # 15-32, Bogotá',
      serviceType: 'Vigilancia Diurna',
      schedule: '06:00 - 22:00',
      status: 'pendiente',
      priority: 'media',
      value: 3200000,
      assignedPersonnel: [
        { id: 4, name: 'Andrea López', role: 'Supervisora' },
        { id: 5, name: 'Roberto Silva', role: 'Guardia' }
      ],
      startDate: '2025-01-15',
      endDate: '2025-03-15',
      description: 'Servicio de vigilancia diurna para centro comercial con alto flujo de visitantes.'
    },
    {
      id: 3,
      orderNumber: 'SO-2025-003',
      client: 'Empresa Logística',
      clientContact: 'Carmen Ruiz - Directora Operaciones',
      location: 'Bodega Principal',
      address: 'Zona Industrial Fontibón, Bogotá',
      serviceType: 'Escolta de Valores',
      schedule: '24/7',
      status: 'urgente',
      priority: 'alta',
      value: 4500000,
      assignedPersonnel: [
        { id: 6, name: 'Miguel Torres', role: 'Jefe Escolta' },
        { id: 7, name: 'Patricia Morales', role: 'Escolta' },
        { id: 8, name: 'Fernando Castro', role: 'Escolta' },
        { id: 9, name: 'Sandra Jiménez', role: 'Escolta' }
      ],
      startDate: '2025-01-10',
      endDate: '2025-01-25',
      description: 'Servicio de escolta para transporte de valores de alta cuantía.'
    },
    {
      id: 4,
      orderNumber: 'SO-2025-004',
      client: 'Residencial Norte',
      clientContact: 'Diego Herrera - Administrador',
      location: 'Conjunto Residencial',
      address: 'Carrera 45 # 85-20, Bogotá',
      serviceType: 'Vigilancia Residencial',
      schedule: '24/7',
      status: 'completado',
      priority: 'baja',
      value: 1800000,
      assignedPersonnel: [
        { id: 10, name: 'Alejandro Vega', role: 'Guardia' },
        { id: 11, name: 'Mónica Restrepo', role: 'Guardia' }
      ],
      startDate: '2024-12-01',
      endDate: '2025-01-01',
      description: 'Servicio de vigilancia para conjunto residencial de estrato alto.'
    },
    {
      id: 5,
      orderNumber: 'SO-2025-005',
      client: 'Hospital Central',
      clientContact: 'Dr. Ricardo Mendoza - Director',
      location: 'Hospital Principal',
      address: 'Avenida 68 # 45-67, Bogotá',
      serviceType: 'Vigilancia Hospitalaria',
      schedule: '24/7',
      status: 'activo',
      priority: 'media',
      value: 2800000,
      assignedPersonnel: [
        { id: 12, name: 'Claudia Vargas', role: 'Supervisora' },
        { id: 13, name: 'Andrés Ramírez', role: 'Guardia' },
        { id: 14, name: 'Beatriz Sánchez', role: 'Guardia' }
      ],
      startDate: '2025-01-08',
      endDate: '2025-04-08',
      description: 'Servicio de vigilancia especializada para instalaciones hospitalarias.'
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: 'Nueva orden urgente',
      message: 'SO-2025-003 requiere asignación inmediata',
      time: '5 min',
      type: 'incident',
      read: false
    },
    {
      id: 2,
      title: 'Personal asignado',
      message: 'Carlos Rodríguez asignado a SO-2025-001',
      time: '15 min',
      type: 'alert',
      read: false
    },
    {
      id: 3,
      title: 'Orden completada',
      message: 'SO-2025-004 finalizada exitosamente',
      time: '1 hora',
      type: 'success',
      read: true
    }
  ];

  // Mock user
  const mockUser = {
    name: 'Supervisor Operaciones',
    avatar: null
  };

  // Mock metrics
  const mockMetrics = {
    activeServices: mockServiceOrders?.filter(order => order?.status === 'activo')?.length,
    pendingAssignments: mockServiceOrders?.filter(order => order?.status === 'pendiente')?.length,
    completedOrders: mockServiceOrders?.filter(order => order?.status === 'completado')?.length,
    totalRevenue: mockServiceOrders?.reduce((sum, order) => sum + order?.value, 0)
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleAssignPersonnel = (order) => {
    console.log('Assign personnel to order:', order?.orderNumber);
    // Navigate to personnel assignment or open modal
  };

  const handleStatusUpdate = (order) => {
    console.log('Update status for order:', order?.orderNumber);
    // Open status update modal
  };

  const handleCreateOrder = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleBulkStatusUpdate = () => {
    console.log('Bulk status update for orders:', selectedOrders);
  };

  const handleBulkAssignPersonnel = () => {
    console.log('Bulk assign personnel for orders:', selectedOrders);
  };

  const handleBulkExport = () => {
    console.log('Export orders:', selectedOrders);
  };

  const handleBulkDelete = () => {
    console.log('Delete orders:', selectedOrders);
  };

  const handleClearSelection = () => {
    setSelectedOrders([]);
  };

  const handleModalSave = (orderData) => {
    console.log('Save order:', orderData);
    setIsModalOpen(false);
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleTenantChange = (tenant) => {
    console.log('Tenant changed:', tenant);
  };

  // Filter orders based on current filters and search
  const filteredOrders = mockServiceOrders?.filter(order => {
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery?.toLowerCase();
      const matchesSearch = 
        order?.orderNumber?.toLowerCase()?.includes(searchLower) ||
        order?.client?.toLowerCase()?.includes(searchLower) ||
        order?.location?.toLowerCase()?.includes(searchLower) ||
        order?.serviceType?.toLowerCase()?.includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Apply status filter
    if (filters?.status && order?.status !== filters?.status) return false;

    // Apply client filter
    if (filters?.client && !order?.client?.toLowerCase()?.includes(filters?.client)) return false;

    // Apply service type filter
    if (filters?.serviceType && order?.serviceType?.toLowerCase() !== filters?.serviceType) return false;

    // Apply priority filter
    if (filters?.priority && order?.priority !== filters?.priority) return false;

    // Apply date range filter
    if (filters?.dateRange?.start && order?.startDate < filters?.dateRange?.start) return false;
    if (filters?.dateRange?.end && order?.endDate > filters?.dateRange?.end) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
        notifications={mockNotifications}
        onNotificationClick={handleNotificationClick}
        user={mockUser}
        onTenantChange={handleTenantChange}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16 pb-20 lg:pb-8`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Órdenes de Servicio</h1>
              <p className="text-muted-foreground">
                Gestiona y supervisa todas las órdenes de servicio de seguridad
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/roster-calendar')}
              >
                <Icon name="Calendar" size={16} />
                Ver Calendario
              </Button>
              <Button
                variant="default"
                onClick={handleCreateOrder}
              >
                <Icon name="Plus" size={16} />
                Crear Orden de Servicio
              </Button>
            </div>
          </div>

          {/* Status Overview */}
          <StatusOverviewPanel metrics={mockMetrics} />

          {/* Filters */}
          <ServiceOrderFilters
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            activeFilters={filters}
            onClearFilters={handleClearFilters}
          />

          {/* Service Orders Table */}
          <ServiceOrdersTable
            serviceOrders={filteredOrders}
            onRowClick={handleRowClick}
            onEdit={handleEditOrder}
            onAssignPersonnel={handleAssignPersonnel}
            onStatusUpdate={handleStatusUpdate}
            selectedOrders={selectedOrders}
            onSelectionChange={setSelectedOrders}
          />

          {/* Bulk Actions Toolbar */}
          <BulkActionsToolbar
            selectedCount={selectedOrders?.length}
            onClearSelection={handleClearSelection}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkAssignPersonnel={handleBulkAssignPersonnel}
            onBulkExport={handleBulkExport}
            onBulkDelete={handleBulkDelete}
          />

          {/* Service Order Modal */}
          <ServiceOrderModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            serviceOrder={selectedOrder}
            onSave={handleModalSave}
          />
        </div>
      </main>
    </div>
  );
};

export default ServiceOrdersPage;