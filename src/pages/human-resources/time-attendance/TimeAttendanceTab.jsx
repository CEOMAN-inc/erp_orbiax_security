import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

// Importa todos los componentes del submódulo
import TimeClock from './components/TimeClock';
import TimesheetView from './components/TimesheetView';
import LeaveRequestModal from './components/LeaveRequestModal';
import ApprovalQueue from './components/ApprovalQueue';
import TeamCalendar from './components/TeamCalendar';
import AttendanceDashboard from './components/AttendanceDashboard'; // <-- NUEVA IMPORTACIÓN

const TimeAttendanceTab = () => {
  const [userRole, setUserRole] = useState('supervisor'); // Cambia a 'employee' para ver la otra vista
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [supervisorView, setSupervisorView] = useState('approvals');

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Gestión Humana', path: '/time-attendance' },
    { label: 'Tiempos y Asistencias', path: '/time-attendance', current: true },
  ];

  const handleSaveLeaveRequest = (requestData) => {
    console.log("Solicitud para guardar:", requestData);
    setIsLeaveModalOpen(false);
    alert("Solicitud de ausencia enviada para aprobación.");
  };

  const renderEmployeeView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <TimeClock />
        {/* --- USANDO EL NUEVO DASHBOARD --- */}
        <AttendanceDashboard userRole="employee" />
      </div>
      <div className="lg:col-span-2">
        <TimesheetView />
      </div>
    </div>
  );

  const renderSupervisorView = () => (
    <div className="space-y-6">
      {/* --- USANDO EL NUEVO DASHBOARD --- */}
      <AttendanceDashboard userRole="supervisor" />
      
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button onClick={() => setSupervisorView('approvals')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${supervisorView === 'approvals' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            <Icon name="ClipboardCheck" /><span>Cola de Aprobaciones</span>
          </button>
          <button onClick={() => setSupervisorView('calendar')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${supervisorView === 'calendar' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            <Icon name="Calendar" /><span>Calendario de Equipo</span>
          </button>
        </nav>
      </div>

      {supervisorView === 'approvals' ? <ApprovalQueue /> : <TeamCalendar />}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-foreground">Control de Tiempos y Asistencias</h2>
            <p className="text-muted-foreground mt-1">
              {userRole === 'employee' ? 'Registra tus horas trabajadas y gestiona tus ausencias.' : 'Gestiona las solicitudes de ausencia y la asistencia de tu equipo.'}
            </p>
          </div>
          {userRole === 'employee' && (
            <Button onClick={() => setIsLeaveModalOpen(true)} iconName="CalendarPlus">
              Solicitar Ausencia
            </Button>
          )}
        </div>
      </div>

      {userRole === 'employee' ? renderEmployeeView() : renderSupervisorView()}
      
      <LeaveRequestModal 
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onSave={handleSaveLeaveRequest}
      />
    </div>
  );
};

export default TimeAttendanceTab;