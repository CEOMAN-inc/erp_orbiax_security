import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const TeamCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // Octubre 2025 para coincidir con los datos
  
  // --- ESTADO PARA CONTROLAR EL POPOVER DE DETALLES ---
  const [popover, setPopover] = useState({ visible: false, data: null, position: { x: 0, y: 0 } });

  const approvedLeaves = [
    { id: 1, employeeId: 1, employeeName: 'Carlos Rodríguez', startDate: '2025-10-10', endDate: '2025-10-15', type: 'Vacaciones', reason: 'Viaje familiar programado.' },
    { id: 2, employeeId: 3, employeeName: 'Javier Morales', startDate: '2025-10-22', endDate: '2025-10-22', type: 'Permiso', reason: 'Cita médica personal.' },
    { id: 3, employeeId: 2, employeeName: 'Ana María González', startDate: '2025-10-28', endDate: '2025-10-29', type: 'Incapacidad', reason: 'Incapacidad por gripe.' },
  ];

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setPopover({ visible: false, data: null }); // Oculta el popover al cambiar de mes
  };

  // --- FUNCIÓN PARA MOSTRAR EL POPOVER ---
  const handleLeaveClick = (leave, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setPopover({
      visible: true,
      data: leave,
      position: { x: rect.left, y: rect.bottom + 5 } // Posiciona el popover debajo del evento
    });
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'Vacaciones': return 'bg-primary/80 hover:bg-primary text-primary-foreground';
      case 'Incapacidad': return 'bg-error/80 hover:bg-error text-error-foreground';
      case 'Permiso': return 'bg-warning/80 hover:bg-warning text-warning-foreground';
      default: return 'bg-muted';
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="border-t border-l border-border bg-muted/20"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const leavesForDay = approvedLeaves.filter(l => dateString >= l.startDate && dateString <= l.endDate);

      days.push(
        <div key={day} className="border-t border-l border-border p-2 min-h-[120px] relative">
          <span className="font-semibold">{day}</span>
          <div className="mt-1 space-y-1">
            {leavesForDay.map((leave) => (
              <button 
                key={leave.id} 
                className={`w-full text-left p-1 rounded-md text-xs truncate transition-transform hover:scale-105 ${getLeaveTypeColor(leave.type)}`}
                onClick={(e) => handleLeaveClick(leave, e)}
              >
                {leave.employeeName}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-card border border-border rounded-lg mt-6">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <div className="space-x-2">
          <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}><Icon name="ChevronLeft" /></Button>
          <Button variant="outline" size="icon" onClick={() => changeMonth(1)}><Icon name="ChevronRight" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7">
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-l border-border first:border-l-0">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-b border-r border-border" onClick={() => setPopover({ visible: false, data: null })}>
        {renderCalendarDays()}
      </div>

      {/* --- CÓDIGO DEL POPOVER DE DETALLES --- */}
      {popover.visible && (
        <div 
          className="fixed z-50 bg-card border border-border rounded-lg shadow-lg p-4 w-64 animate-slideIn"
          style={{ left: `${popover.position.x}px`, top: `${popover.position.y}px` }}
          onClick={e => e.stopPropagation()} // Evita que el popover se cierre si se hace clic dentro de él
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{popover.data.employeeName}</h4>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setPopover({ visible: false, data: null })}><Icon name="X" size={16}/></Button>
          </div>
          <p className={`font-bold text-sm ${getLeaveTypeColor(popover.data.type).split(' ')[1]}`}>{popover.data.type}</p>
          <p className="text-xs text-muted-foreground">{popover.data.startDate} al {popover.data.endDate}</p>
          {popover.data.reason && <p className="text-xs mt-2 border-t pt-2">{popover.data.reason}</p>}
          <Button variant="link" size="sm" className="p-0 h-auto mt-3" onClick={() => alert(`Navegando al perfil del empleado ${popover.data.employeeId}...`)}>
            Ver Perfil Completo
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeamCalendar;