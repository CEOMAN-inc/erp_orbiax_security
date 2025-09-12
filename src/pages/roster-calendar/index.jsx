import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PersonnelPanel from './components/PersonnelPanel';
import WeeklyCalendar from './components/WeeklyCalendar';
import CalendarToolbar from './components/CalendarToolbar';
import ShiftTemplateModal from './components/ShiftTemplateModal';
import BulkAssignmentModal from './components/BulkAssignmentModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RosterCalendar = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPersonnelPanelCollapsed, setIsPersonnelPanelCollapsed] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday?.setDate(today?.getDate() - today?.getDay() + 1);
    return monday;
  });
  
  const [showShiftTemplateModal, setShowShiftTemplateModal] = useState(false);
  const [showBulkAssignmentModal, setShowBulkAssignmentModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  
  const [filters, setFilters] = useState({
    department: 'all',
    location: 'all',
    shiftType: 'all',
    dateRange: {}
  });

  // Mock data for personnel
  const [personnel] = useState([
    {
      id: 'P001',
      name: 'Carlos Rodríguez',
      role: 'supervisor',
      department: 'security',
      availability: 'available',
      currentShift: null,
      certifications: [
        { name: 'Seguridad Básica', expiryDate: '2024-12-15' },
        { name: 'Primeros Auxilios', expiryDate: '2024-06-20' }
      ]
    },
    {
      id: 'P002',
      name: 'María González',
      role: 'guard',
      department: 'surveillance',
      availability: 'available',
      currentShift: null,
      certifications: [
        { name: 'Vigilancia', expiryDate: '2024-11-30' },
        { name: 'Control de Acceso', expiryDate: '2023-12-01' }
      ]
    },
    {
      id: 'P003',
      name: 'José Martínez',
      role: 'guard',
      department: 'patrol',
      availability: 'assigned',
      currentShift: '06:00 - 14:00',
      certifications: [
        { name: 'Patrullaje', expiryDate: '2024-08-15' },
        { name: 'Manejo Defensivo', expiryDate: '2024-10-10' }
      ]
    },
    {
      id: 'P004',
      name: 'Ana López',
      role: 'admin',
      department: 'security',
      availability: 'available',
      currentShift: null,
      certifications: [
        { name: 'Administración', expiryDate: '2024-12-31' },
        { name: 'Gestión de Personal', expiryDate: '2024-09-15' }
      ]
    },
    {
      id: 'P005',
      name: 'Luis Herrera',
      role: 'guard',
      department: 'security',
      availability: 'unavailable',
      currentShift: null,
      certifications: [
        { name: 'Seguridad Básica', expiryDate: '2024-07-20' }
      ]
    },
    {
      id: 'P006',
      name: 'Carmen Silva',
      role: 'supervisor',
      department: 'surveillance',
      availability: 'available',
      currentShift: null,
      certifications: [
        { name: 'Supervisión', expiryDate: '2024-11-25' },
        { name: 'Sistemas de Seguridad', expiryDate: '2024-08-30' }
      ]
    }
  ]);

  // Mock data for shifts
  const [shifts, setShifts] = useState([
    {
      id: 'S001',
      personnelId: 'P003',
      personnelName: 'José Martínez',
      date: '2024-12-09',
      startTime: '06:00',
      endTime: '14:00',
      location: 'Entrada Principal',
      type: 'regular',
      status: 'scheduled'
    },
    {
      id: 'S002',
      personnelId: 'P001',
      personnelName: 'Carlos Rodríguez',
      date: '2024-12-10',
      startTime: '14:00',
      endTime: '22:00',
      location: 'Oficina Central',
      type: 'regular',
      status: 'scheduled'
    },
    {
      id: 'S003',
      personnelId: 'P002',
      personnelName: 'María González',
      date: '2024-12-11',
      startTime: '22:00',
      endTime: '06:00',
      location: 'Perímetro Norte',
      type: 'night',
      status: 'scheduled'
    }
  ]);

  // Mock available slots for bulk assignment
  const [availableSlots] = useState([
    {
      id: 'SLOT001',
      date: '2024-12-12',
      startTime: '08:00',
      endTime: '16:00',
      location: 'Almacén Principal',
      department: 'security',
      type: 'regular'
    },
    {
      id: 'SLOT002',
      date: '2024-12-13',
      startTime: '16:00',
      endTime: '00:00',
      location: 'Estacionamiento',
      department: 'patrol',
      type: 'regular'
    },
    {
      id: 'SLOT003',
      date: '2024-12-14',
      startTime: '00:00',
      endTime: '08:00',
      location: 'Recepción',
      department: 'surveillance',
      type: 'night'
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Certificación por Vencer',
      message: 'María González - Control de Acceso vence el 01/12/2023',
      time: '2 min',
      read: false
    },
    {
      id: 2,
      type: 'incident',
      title: 'Conflicto de Horario',
      message: 'Turno duplicado detectado para José Martínez',
      time: '15 min',
      read: false
    }
  ]);

  const handlePersonnelSelect = (person) => {
    setSelectedPersonnel(person);
  };

  const handleShiftCreate = (newShift) => {
    setShifts(prev => [...prev, newShift]);
    
    // Show success notification
    console.log('Turno creado:', newShift);
  };

  const handleShiftUpdate = (updatedShift) => {
    setShifts(prev => prev?.map(shift => 
      shift?.id === updatedShift?.id ? updatedShift : shift
    ));
    
    console.log('Turno actualizado:', updatedShift);
  };

  const handleShiftDelete = (shiftId) => {
    setShifts(prev => prev?.filter(shift => shift?.id !== shiftId));
    
    console.log('Turno eliminado:', shiftId);
  };

  const handleCreateShiftTemplate = () => {
    setEditingTemplate(null);
    setShowShiftTemplateModal(true);
  };

  const handleSaveShiftTemplate = (template) => {
    console.log('Plantilla guardada:', template);
    // Here you would save the template to your backend
  };

  const handleBulkAssignment = () => {
    setShowBulkAssignmentModal(true);
  };

  const handleBulkAssignmentSave = (assignmentData) => {
    console.log('Asignación masiva:', assignmentData);
    
    // Process bulk assignment based on type
    if (assignmentData?.type === 'manual') {
      // Create shifts for selected personnel and slots
      const newShifts = [];
      assignmentData?.personnel?.forEach(personnelId => {
        assignmentData?.slots?.forEach(slotId => {
          const person = personnel?.find(p => p?.id === personnelId);
          const slot = availableSlots?.find(s => s?.id === slotId);
          
          if (person && slot) {
            newShifts?.push({
              id: `shift_${Date.now()}_${Math.random()}`,
              personnelId: person?.id,
              personnelName: person?.name,
              date: slot?.date,
              startTime: slot?.startTime,
              endTime: slot?.endTime,
              location: slot?.location,
              type: slot?.type,
              status: 'scheduled'
            });
          }
        });
      });
      
      setShifts(prev => [...prev, ...newShifts]);
    }
  };

  const handleExportSchedule = (format) => {
    console.log(`Exportando horario en formato ${format}`);
    
    // Mock export functionality
    const exportData = {
      week: currentWeek?.toISOString()?.split('T')?.[0],
      shifts: shifts,
      personnel: personnel,
      format: format
    };
    
    // In a real app, this would trigger a download
    console.log('Datos de exportación:', exportData);
  };

  const handleTenantChange = (tenant) => {
    console.log('Cambio de tenant:', tenant);
  };

  const handleNotificationClick = (notification) => {
    console.log('Notificación clickeada:', notification);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentTenant="Orbiax Security"
        onTenantChange={handleTenantChange}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        user={{ name: "Admin User", avatar: null }}
      />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16 pb-20 lg:pb-0`}>
        <div className="p-6">
          <Breadcrumb />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Calendario de Turnos
            </h1>
            <p className="text-muted-foreground">
              Gestione los horarios y asignaciones de personal de seguridad con funcionalidad de arrastrar y soltar
            </p>
          </div>

          <CalendarToolbar
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            onCreateShiftTemplate={handleCreateShiftTemplate}
            onBulkAssignment={handleBulkAssignment}
            onExportSchedule={handleExportSchedule}
            filters={filters}
            onFiltersChange={setFilters}
          />

          <div className="flex gap-6 h-[calc(100vh-280px)]">
            <PersonnelPanel
              personnel={personnel}
              onPersonnelSelect={handlePersonnelSelect}
              selectedPersonnel={selectedPersonnel}
              isCollapsed={isPersonnelPanelCollapsed}
              onToggleCollapse={() => setIsPersonnelPanelCollapsed(!isPersonnelPanelCollapsed)}
            />

            <WeeklyCalendar
              currentWeek={currentWeek}
              shifts={shifts}
              onShiftUpdate={handleShiftUpdate}
              onShiftCreate={handleShiftCreate}
              onShiftDelete={handleShiftDelete}
              selectedPersonnel={selectedPersonnel}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <ShiftTemplateModal
        isOpen={showShiftTemplateModal}
        onClose={() => setShowShiftTemplateModal(false)}
        onSave={handleSaveShiftTemplate}
        existingTemplate={editingTemplate}
      />

      <BulkAssignmentModal
        isOpen={showBulkAssignmentModal}
        onClose={() => setShowBulkAssignmentModal(false)}
        onAssign={handleBulkAssignmentSave}
        personnel={personnel}
        availableSlots={availableSlots}
      />

      {/* Mobile Quick Actions */}
      <div className="lg:hidden fixed bottom-20 right-4 space-y-2">
        <Button
          variant="default"
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg"
          onClick={handleCreateShiftTemplate}
          title="Crear Plantilla"
        >
          <Icon name="Template" size={20} />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg"
          onClick={handleBulkAssignment}
          title="Asignación Masiva"
        >
          <Icon name="Users" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default RosterCalendar;