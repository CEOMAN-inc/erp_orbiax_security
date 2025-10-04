import React, { useState, useMemo } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';

// Componentes del submódulo
import PersonnelTable from './components/PersonnelTable';
import PersonnelFilters from './components/PersonnelFilters';
import PersonnelStats from './components/PersonnelStats';
import PersonnelModal from './components/PersonnelModal';
import BulkActionsBar from './components/BulkActionsBar';

const mockEmployeesData = [
    { id: 1, name: "Carlos Rodríguez", role: "Guardia de Seguridad", department: "Operaciones", status: "Activo", hireDate: "15/03/2023", certificationStatus: "Vigente" },
    { id: 2, name: "Ana María González", role: "Supervisor", department: "Operaciones", status: "Activo", hireDate: "20/01/2022", certificationStatus: "Por Vencer" },
    { id: 3, name: "Javier Morales", role: "Guardia de Seguridad", department: "Operaciones", status: "Inactivo", hireDate: "12/11/2023", certificationStatus: "Vencida" },
];

const EmployeeAdminTab = () => {
  const [employees, setEmployees] = useState(mockEmployeesData);
  const [filters, setFilters] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [modalState, setModalState] = useState({ isOpen: false, employeeId: null, mode: 'view' });

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Gestión Humana', path: '/personnel-management' },
    { label: 'Administración de Personal', path: '/personnel-management', current: true },
  ];
  
  const filteredEmployees = useMemo(() => employees, [employees, filters]);

  const handleCreateEmployee = () => setModalState({ isOpen: true, employeeId: null, mode: 'create' });
  const handleViewEmployee = (id) => setModalState({ isOpen: true, employeeId: id, mode: 'view' });
  const handleEditEmployee = (id) => setModalState({ isOpen: true, employeeId: id, mode: 'edit' });
  const handleCloseModal = () => setModalState({ isOpen: false, employeeId: null, mode: 'view' });

  const handleSaveEmployee = (employeeData) => {
    console.log("Guardando empleado:", employeeData);
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-foreground">Administración de Personal</h2>
            <p className="text-muted-foreground mt-1">Registro centralizado de la información de cada empleado.</p>
          </div>
          <Button onClick={handleCreateEmployee} iconName="UserPlus">Agregar Empleado</Button>
        </div>
      </div>

      <PersonnelStats employees={employees} />
      <PersonnelFilters filters={filters} onFilterChange={setFilters} />
      <BulkActionsBar selectedCount={selectedEmployees.length} />
      <PersonnelTable 
        employees={filteredEmployees}
        onViewDetails={handleViewEmployee}
        onEdit={handleEditEmployee}
      />

      <PersonnelModal 
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEmployee}
        employeeId={modalState.employeeId}
        mode={modalState.mode}
      />
    </div>
  );
};

export default EmployeeAdminTab;