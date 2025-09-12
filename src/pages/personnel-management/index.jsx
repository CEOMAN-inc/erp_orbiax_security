import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';

import PersonnelTable from './components/PersonnelTable';
import PersonnelFilters from './components/PersonnelFilters';
import PersonnelStats from './components/PersonnelStats';
import PersonnelModal from './components/PersonnelModal';
import BulkActionsBar from './components/BulkActionsBar';

const PersonnelManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    department: '',
    status: '',
    certificationStatus: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    employee: null,
    mode: 'view'
  });

  // Mock employee data
  const mockEmployees = [
    {
      id: 1,
      name: "Carlos Rodríguez Martínez",
      email: "carlos.rodriguez@orbiax.com",
      phone: "+57 300 123 4567",
      role: "Guardia de Seguridad",
      department: "Operaciones",
      status: "Activo",
      hireDate: "15/03/2023",
      certificationStatus: "Vigente",
      address: "Calle 45 #12-34, Bogotá",
      emergencyContact: "María Rodríguez",
      emergencyPhone: "+57 301 234 5678"
    },
    {
      id: 2,
      name: "Ana María González López",
      email: "ana.gonzalez@orbiax.com",
      phone: "+57 310 234 5678",
      role: "Supervisor",
      department: "Operaciones",
      status: "Activo",
      hireDate: "20/01/2022",
      certificationStatus: "Por Vencer",
      address: "Carrera 15 #67-89, Medellín",
      emergencyContact: "Luis González",
      emergencyPhone: "+57 311 345 6789"
    },
    {
      id: 3,
      name: "Miguel Ángel Torres Ruiz",
      email: "miguel.torres@orbiax.com",
      phone: "+57 320 345 6789",
      role: "Coordinador",
      department: "Operaciones",
      status: "Activo",
      hireDate: "10/06/2021",
      certificationStatus: "Vigente",
      address: "Avenida 68 #23-45, Cali",
      emergencyContact: "Carmen Torres",
      emergencyPhone: "+57 321 456 7890"
    },
    {
      id: 4,
      name: "Laura Patricia Herrera Silva",
      email: "laura.herrera@orbiax.com",
      phone: "+57 315 456 7890",
      role: "Administrador",
      department: "Administración",
      status: "Activo",
      hireDate: "05/09/2020",
      certificationStatus: "Vigente",
      address: "Calle 100 #45-67, Barranquilla",
      emergencyContact: "Pedro Herrera",
      emergencyPhone: "+57 316 567 8901"
    },
    {
      id: 5,
      name: "Javier Eduardo Morales Castro",
      email: "javier.morales@orbiax.com",
      phone: "+57 325 567 8901",
      role: "Guardia de Seguridad",
      department: "Operaciones",
      status: "Suspendido",
      hireDate: "12/11/2023",
      certificationStatus: "Vencida",
      address: "Carrera 7 #34-56, Bucaramanga",
      emergencyContact: "Rosa Morales",
      emergencyPhone: "+57 326 678 9012"
    },
    {
      id: 6,
      name: "Diana Carolina Vásquez Peña",
      email: "diana.vasquez@orbiax.com",
      phone: "+57 330 678 9012",
      role: "Jefe de Operaciones",
      department: "Operaciones",
      status: "Activo",
      hireDate: "18/04/2019",
      certificationStatus: "Vigente",
      address: "Calle 85 #12-78, Pereira",
      emergencyContact: "Carlos Vásquez",
      emergencyPhone: "+57 331 789 0123"
    },
    {
      id: 7,
      name: "Roberto Andrés Jiménez Ortiz",
      email: "roberto.jimenez@orbiax.com",
      phone: "+57 335 789 0123",
      role: "Guardia de Seguridad",
      department: "Operaciones",
      status: "Inactivo",
      hireDate: "22/08/2022",
      certificationStatus: "Por Vencer",
      address: "Avenida 30 #56-78, Manizales",
      emergencyContact: "Elena Jiménez",
      emergencyPhone: "+57 336 890 1234"
    },
    {
      id: 8,
      name: "Claudia Esperanza Ramírez Díaz",
      email: "claudia.ramirez@orbiax.com",
      phone: "+57 340 890 1234",
      role: "Supervisor",
      department: "Recursos Humanos",
      status: "Activo",
      hireDate: "14/02/2021",
      certificationStatus: "Vigente",
      address: "Calle 50 #89-12, Ibagué",
      emergencyContact: "Fernando Ramírez",
      emergencyPhone: "+57 341 901 2345"
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Certificación por vencer",
      message: "Ana María González - Certificación vence en 15 días",
      time: "Hace 2 horas",
      type: "alert",
      read: false
    },
    {
      id: 2,
      title: "Nuevo empleado registrado",
      message: "Carlos Rodríguez ha sido agregado al sistema",
      time: "Hace 1 día",
      type: "info",
      read: false
    }
  ];

  // Filter and search employees
  const filteredEmployees = useMemo(() => {
    let filtered = mockEmployees;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(employee =>
        employee?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        employee?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        employee?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        employee?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    Object.entries(filters)?.forEach(([key, value]) => {
      if (value) {
        filtered = filtered?.filter(employee => employee?.[key] === value);
      }
    });

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'hireDate') {
          aValue = new Date(aValue.split('/').reverse().join('-'));
          bValue = new Date(bValue.split('/').reverse().join('-'));
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [mockEmployees, searchQuery, filters, sortConfig]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSelectEmployee = (employeeId, isSelected) => {
    if (isSelected) {
      setSelectedEmployees(prev => [...prev, employeeId]);
    } else {
      setSelectedEmployees(prev => prev?.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedEmployees(filteredEmployees?.map(emp => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedEmployees([]);
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      role: '',
      department: '',
      status: '',
      certificationStatus: ''
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewEmployee = (employee) => {
    setModalState({
      isOpen: true,
      employee,
      mode: 'view'
    });
  };

  const handleEditEmployee = (employee) => {
    setModalState({
      isOpen: true,
      employee,
      mode: 'edit'
    });
  };

  const handleCreateEmployee = () => {
    setModalState({
      isOpen: true,
      employee: null,
      mode: 'create'
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      employee: null,
      mode: 'view'
    });
  };

  const handleSaveEmployee = (employeeData) => {
    console.log('Saving employee:', employeeData);
    // Here you would typically save to your backend
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for employees:', selectedEmployees);
    // Here you would handle the bulk action
    setSelectedEmployees([]);
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleTenantChange = (tenant) => {
    console.log('Tenant changed:', tenant);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
        notifications={mockNotifications}
        onNotificationClick={handleNotificationClick}
        onTenantChange={handleTenantChange}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16 pb-20 lg:pb-6`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Personal</h1>
              <p className="text-muted-foreground mt-2">
                Administra empleados, certificaciones y asignaciones de equipo
              </p>
            </div>
            <Button
              onClick={handleCreateEmployee}
              iconName="UserPlus"
              iconPosition="left"
              className="gradient-bg"
            >
              Agregar Empleado
            </Button>
          </div>

          {/* Statistics */}
          <PersonnelStats employees={mockEmployees} />

          {/* Filters */}
          <PersonnelFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            employeeCount={filteredEmployees?.length}
          />

          {/* Bulk Actions */}
          <BulkActionsBar
            selectedCount={selectedEmployees?.length}
            onClearSelection={handleClearSelection}
            onBulkAction={handleBulkAction}
          />

          {/* Personnel Table */}
          <PersonnelTable
            employees={filteredEmployees}
            selectedEmployees={selectedEmployees}
            onSelectEmployee={handleSelectEmployee}
            onSelectAll={handleSelectAll}
            onEditEmployee={handleEditEmployee}
            onViewEmployee={handleViewEmployee}
            sortConfig={sortConfig}
            onSort={handleSort}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Personnel Modal */}
          <PersonnelModal
            employee={modalState?.employee}
            isOpen={modalState?.isOpen}
            onClose={handleCloseModal}
            onSave={handleSaveEmployee}
            mode={modalState?.mode}
          />
        </div>
      </main>
    </div>
  );
};

export default PersonnelManagement;