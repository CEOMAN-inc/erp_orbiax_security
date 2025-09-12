import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyCalendar = ({ 
  currentWeek, 
  shifts = [], 
  onShiftUpdate, 
  onShiftCreate, 
  onShiftDelete,
  selectedPersonnel 
}) => {
  const [draggedShift, setDraggedShift] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictDetails, setConflictDetails] = useState(null);
  const calendarRef = useRef(null);

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const weekDays = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  const getWeekDates = () => {
    const dates = [];
    const startDate = new Date(currentWeek);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date?.setDate(startDate?.getDate() + i);
      dates?.push(date);
    }
    
    return dates;
  };

  const weekDates = getWeekDates();

  const getShiftsForSlot = (dayIndex, timeSlot) => {
    const targetDate = weekDates?.[dayIndex];
    const dateStr = targetDate?.toISOString()?.split('T')?.[0];
    
    return shifts?.filter(shift => {
      const shiftDate = shift?.date;
      const shiftStartTime = shift?.startTime;
      
      return shiftDate === dateStr && shiftStartTime === timeSlot;
    });
  };

  const handleDragStart = (e, shift) => {
    setDraggedShift(shift);
    e.dataTransfer.effectAllowed = 'move';
    e?.dataTransfer?.setData('application/json', JSON.stringify(shift));
  };

  const handleDragOver = (e, dayIndex, timeSlot) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot({ dayIndex, timeSlot });
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e, dayIndex, timeSlot) => {
    e?.preventDefault();
    setDragOverSlot(null);

    try {
      const droppedData = JSON.parse(e?.dataTransfer?.getData('application/json'));
      const targetDate = weekDates?.[dayIndex]?.toISOString()?.split('T')?.[0];
      
      // Check if it's a personnel being assigned to a new shift
      if (droppedData?.name && !droppedData?.shiftId) {
        const newShift = {
          id: `shift_${Date.now()}`,
          personnelId: droppedData?.id,
          personnelName: droppedData?.name,
          date: targetDate,
          startTime: timeSlot,
          endTime: getEndTime(timeSlot),
          location: 'Por Asignar',
          type: 'regular',
          status: 'scheduled'
        };
        
        // Check for conflicts
        const conflicts = checkForConflicts(newShift);
        if (conflicts?.length > 0) {
          setConflictDetails({ shift: newShift, conflicts });
          setShowConflictModal(true);
          return;
        }
        
        onShiftCreate(newShift);
      } 
      // Moving existing shift
      else if (draggedShift) {
        const updatedShift = {
          ...draggedShift,
          date: targetDate,
          startTime: timeSlot,
          endTime: getEndTime(timeSlot)
        };
        
        // Check for conflicts
        const conflicts = checkForConflicts(updatedShift, draggedShift?.id);
        if (conflicts?.length > 0) {
          setConflictDetails({ shift: updatedShift, conflicts });
          setShowConflictModal(true);
          return;
        }
        
        onShiftUpdate(updatedShift);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
    
    setDraggedShift(null);
  };

  const getEndTime = (startTime) => {
    const [hours, minutes] = startTime?.split(':')?.map(Number);
    const endHours = hours + 8; // 8-hour shifts by default
    return `${endHours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}`;
  };

  const checkForConflicts = (newShift, excludeShiftId = null) => {
    return shifts?.filter(shift => {
      if (excludeShiftId && shift?.id === excludeShiftId) return false;
      
      return shift?.personnelId === newShift?.personnelId &&
             shift?.date === newShift?.date &&
             (
               (shift?.startTime <= newShift?.startTime && shift?.endTime > newShift?.startTime) ||
               (shift?.startTime < newShift?.endTime && shift?.endTime >= newShift?.endTime) ||
               (shift?.startTime >= newShift?.startTime && shift?.endTime <= newShift?.endTime)
             );
    });
  };

  const getShiftTypeColor = (type) => {
    switch (type) {
      case 'regular': return 'bg-primary text-primary-foreground';
      case 'overtime': return 'bg-warning text-warning-foreground';
      case 'holiday': return 'bg-accent text-accent-foreground';
      case 'night': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const handleShiftClick = (shift) => {
    // Open shift details modal or navigate to shift details
    console.log('Shift clicked:', shift);
  };

  const handleSlotDoubleClick = (dayIndex, timeSlot) => {
    if (selectedPersonnel) {
      const targetDate = weekDates?.[dayIndex]?.toISOString()?.split('T')?.[0];
      const newShift = {
        id: `shift_${Date.now()}`,
        personnelId: selectedPersonnel?.id,
        personnelName: selectedPersonnel?.name,
        date: targetDate,
        startTime: timeSlot,
        endTime: getEndTime(timeSlot),
        location: 'Por Asignar',
        type: 'regular',
        status: 'scheduled'
      };
      
      const conflicts = checkForConflicts(newShift);
      if (conflicts?.length > 0) {
        setConflictDetails({ shift: newShift, conflicts });
        setShowConflictModal(true);
        return;
      }
      
      onShiftCreate(newShift);
    }
  };

  return (
    <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden">
      {/* Calendar Header */}
      <div className="grid grid-cols-8 border-b border-border bg-muted/20">
        <div className="p-4 text-sm font-medium text-muted-foreground">
          Hora
        </div>
        {weekDays?.map((day, index) => (
          <div key={day} className={`p-4 text-center border-l border-border ${isToday(weekDates?.[index]) ? 'bg-primary/10' : ''}`}>
            <div className="text-sm font-medium text-foreground">{day}</div>
            <div className={`text-xs mt-1 ${isToday(weekDates?.[index]) ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
              {formatDate(weekDates?.[index])}
            </div>
          </div>
        ))}
      </div>
      {/* Calendar Body */}
      <div className="overflow-auto max-h-[calc(100vh-300px)]" ref={calendarRef}>
        {timeSlots?.map((timeSlot) => (
          <div key={timeSlot} className="grid grid-cols-8 border-b border-border min-h-[80px]">
            {/* Time Column */}
            <div className="p-4 text-sm font-medium text-muted-foreground bg-muted/10 border-r border-border flex items-center">
              {timeSlot}
            </div>
            
            {/* Day Columns */}
            {weekDays?.map((day, dayIndex) => {
              const slotsShifts = getShiftsForSlot(dayIndex, timeSlot);
              const isDropTarget = dragOverSlot?.dayIndex === dayIndex && dragOverSlot?.timeSlot === timeSlot;
              
              return (
                <div
                  key={`${day}-${timeSlot}`}
                  className={`p-2 border-l border-border relative transition-colors duration-200 ${
                    isDropTarget ? 'bg-primary/20 border-primary' : 'hover:bg-muted/20'
                  } ${isToday(weekDates?.[dayIndex]) ? 'bg-primary/5' : ''}`}
                  onDragOver={(e) => handleDragOver(e, dayIndex, timeSlot)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, dayIndex, timeSlot)}
                  onDoubleClick={() => handleSlotDoubleClick(dayIndex, timeSlot)}
                >
                  {slotsShifts?.map((shift) => (
                    <div
                      key={shift?.id}
                      className={`p-2 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 hover:shadow-md mb-1 ${getShiftTypeColor(shift?.type)}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, shift)}
                      onClick={() => handleShiftClick(shift)}
                      title={`${shift?.personnelName}\n${shift?.location}\n${shift?.startTime} - ${shift?.endTime}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{shift?.personnelName}</span>
                        {shift?.type === 'overtime' && (
                          <Icon name="Clock" size={12} className="flex-shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="text-xs opacity-80 truncate mt-1">
                        {shift?.location}
                      </div>
                    </div>
                  ))}
                  {/* Drop Zone Indicator */}
                  {isDropTarget && (
                    <div className="absolute inset-0 border-2 border-dashed border-primary bg-primary/10 rounded-md flex items-center justify-center">
                      <Icon name="Plus" size={16} className="text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Conflict Modal */}
      {showConflictModal && conflictDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Conflicto de Horario</h3>
            </div>
            
            <p className="text-muted-foreground mb-4">
              El personal {conflictDetails?.shift?.personnelName} ya tiene asignado otro turno en este horario:
            </p>
            
            <div className="space-y-2 mb-6">
              {conflictDetails?.conflicts?.map((conflict) => (
                <div key={conflict?.id} className="p-3 bg-error/10 border border-error/20 rounded-md">
                  <div className="text-sm font-medium text-foreground">
                    {conflict?.startTime} - {conflict?.endTime}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {conflict?.location}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConflictModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // Force assign despite conflict
                  if (conflictDetails?.shift?.id?.startsWith('shift_')) {
                    onShiftCreate(conflictDetails?.shift);
                  } else {
                    onShiftUpdate(conflictDetails?.shift);
                  }
                  setShowConflictModal(false);
                }}
                className="flex-1"
              >
                Asignar de Todas Formas
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;