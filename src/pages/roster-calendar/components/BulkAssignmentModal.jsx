import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BulkAssignmentModal = ({ 
  isOpen, 
  onClose, 
  onAssign, 
  personnel = [], 
  availableSlots = [] 
}) => {
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [assignmentType, setAssignmentType] = useState('manual'); // manual, auto, template
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    role: 'all',
    availability: 'available'
  });

  const assignmentTypes = [
    { value: 'manual', label: 'Asignación Manual', description: 'Seleccionar personal y horarios específicos' },
    { value: 'auto', label: 'Asignación Automática', description: 'El sistema asigna automáticamente basado en disponibilidad' },
    { value: 'template', label: 'Usar Plantilla', description: 'Aplicar una plantilla de turno existente' }
  ];

  const templates = [
    { id: 'template_1', name: 'Turno Matutino Seguridad', shifts: 15 },
    { id: 'template_2', name: 'Turno Nocturno Vigilancia', shifts: 12 },
    { id: 'template_3', name: 'Fin de Semana Completo', shifts: 20 }
  ];

  const departments = [
    { value: 'all', label: 'Todos los Departamentos' },
    { value: 'security', label: 'Seguridad' },
    { value: 'surveillance', label: 'Vigilancia' },
    { value: 'patrol', label: 'Patrullaje' }
  ];

  const roles = [
    { value: 'all', label: 'Todos los Roles' },
    { value: 'guard', label: 'Guardia' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'admin', label: 'Administrador' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'available', label: 'Disponible' },
    { value: 'assigned', label: 'Asignado' }
  ];

  const filteredPersonnel = personnel?.filter(person => {
    const matchesDepartment = filters?.department === 'all' || person?.department === filters?.department;
    const matchesRole = filters?.role === 'all' || person?.role === filters?.role;
    const matchesAvailability = filters?.availability === 'all' || person?.availability === filters?.availability;
    
    return matchesDepartment && matchesRole && matchesAvailability;
  });

  const handlePersonnelToggle = (personId) => {
    setSelectedPersonnel(prev => 
      prev?.includes(personId)
        ? prev?.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleSlotToggle = (slotId) => {
    setSelectedSlots(prev => 
      prev?.includes(slotId)
        ? prev?.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleSelectAllPersonnel = () => {
    if (selectedPersonnel?.length === filteredPersonnel?.length) {
      setSelectedPersonnel([]);
    } else {
      setSelectedPersonnel(filteredPersonnel?.map(p => p?.id));
    }
  };

  const handleSelectAllSlots = () => {
    if (selectedSlots?.length === availableSlots?.length) {
      setSelectedSlots([]);
    } else {
      setSelectedSlots(availableSlots?.map(s => s?.id));
    }
  };

  const handleAssign = () => {
    const assignmentData = {
      type: assignmentType,
      personnel: selectedPersonnel,
      slots: selectedSlots,
      template: selectedTemplate
    };

    onAssign(assignmentData);
    onClose();
  };

  const getPersonnelAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'text-success';
      case 'assigned': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatSlotTime = (slot) => {
    const date = new Date(slot.date)?.toLocaleDateString('es-CO', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit' 
    });
    return `${date} ${slot?.startTime}-${slot?.endTime}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Asignación Masiva de Turnos</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Asigne múltiples turnos a varios miembros del personal de forma eficiente
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Assignment Type Selection */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-medium text-foreground mb-4">Tipo de Asignación</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assignmentTypes?.map(type => (
              <label
                key={type?.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  assignmentType === type?.value
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="assignmentType"
                  value={type?.value}
                  checked={assignmentType === type?.value}
                  onChange={(e) => setAssignmentType(e?.target?.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    assignmentType === type?.value
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                  }`}>
                    {assignmentType === type?.value && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <h4 className="font-medium text-foreground">{type?.label}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{type?.description}</p>
              </label>
            ))}
          </div>

          {assignmentType === 'template' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Seleccionar Plantilla
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e?.target?.value)}
                className="w-full max-w-md px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Seleccione una plantilla...</option>
                {templates?.map(template => (
                  <option key={template?.id} value={template?.id}>
                    {template?.name} ({template?.shifts} turnos)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {assignmentType === 'manual' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Personnel Selection */}
              <div className="border-r border-border flex flex-col">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">
                      Seleccionar Personal ({selectedPersonnel?.length})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAllPersonnel}
                    >
                      {selectedPersonnel?.length === filteredPersonnel?.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
                    </Button>
                  </div>

                  {/* Personnel Filters */}
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={filters?.department}
                      onChange={(e) => setFilters(prev => ({ ...prev, department: e?.target?.value }))}
                      className="px-2 py-1 bg-input border border-border rounded text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      {departments?.map(dept => (
                        <option key={dept?.value} value={dept?.value}>{dept?.label}</option>
                      ))}
                    </select>

                    <select
                      value={filters?.role}
                      onChange={(e) => setFilters(prev => ({ ...prev, role: e?.target?.value }))}
                      className="px-2 py-1 bg-input border border-border rounded text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      {roles?.map(role => (
                        <option key={role?.value} value={role?.value}>{role?.label}</option>
                      ))}
                    </select>

                    <select
                      value={filters?.availability}
                      onChange={(e) => setFilters(prev => ({ ...prev, availability: e?.target?.value }))}
                      className="px-2 py-1 bg-input border border-border rounded text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      {availabilityOptions?.map(option => (
                        <option key={option?.value} value={option?.value}>{option?.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {filteredPersonnel?.map(person => (
                    <label
                      key={person?.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedPersonnel?.includes(person?.id)
                          ? 'border-primary bg-primary/10' :'border-border hover:bg-muted'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPersonnel?.includes(person?.id)}
                        onChange={() => handlePersonnelToggle(person?.id)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {person?.name?.split(' ')?.map(n => n?.[0])?.join('')?.substring(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{person?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {person?.role} • {person?.department}
                        </div>
                        <div className={`text-xs ${getPersonnelAvailabilityColor(person?.availability)}`}>
                          {person?.availability === 'available' ? 'Disponible' :
                           person?.availability === 'assigned' ? 'Asignado' : 'No Disponible'}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div className="flex flex-col">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">
                      Horarios Disponibles ({selectedSlots?.length})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAllSlots}
                    >
                      {selectedSlots?.length === availableSlots?.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {availableSlots?.map(slot => (
                    <label
                      key={slot?.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSlots?.includes(slot?.id)
                          ? 'border-primary bg-primary/10' :'border-border hover:bg-muted'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSlots?.includes(slot?.id)}
                        onChange={() => handleSlotToggle(slot?.id)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{slot?.location}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatSlotTime(slot)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {slot?.department} • {slot?.type}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {assignmentType === 'auto' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Icon name="Zap" size={64} className="mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-medium text-foreground mb-2">Asignación Automática</h3>
                <p className="text-muted-foreground mb-6">
                  El sistema asignará automáticamente el personal disponible a los horarios vacantes
                  basándose en certificaciones, disponibilidad y preferencias.
                </p>
                <div className="bg-muted/20 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Personal Disponible:</span>
                    <span className="font-medium text-foreground">
                      {personnel?.filter(p => p?.availability === 'available')?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Horarios Vacantes:</span>
                    <span className="font-medium text-foreground">{availableSlots?.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {assignmentType === 'template' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Icon name="Template" size={64} className="mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-medium text-foreground mb-2">Aplicar Plantilla</h3>
                <p className="text-muted-foreground mb-6">
                  Seleccione una plantilla de turno para aplicar automáticamente
                  los horarios y asignaciones predefinidas.
                </p>
                {selectedTemplate && (
                  <div className="bg-muted/20 rounded-lg p-4 max-w-md mx-auto">
                    <div className="font-medium text-foreground mb-2">
                      {templates?.find(t => t?.id === selectedTemplate)?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {templates?.find(t => t?.id === selectedTemplate)?.shifts} turnos serán creados
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {assignmentType === 'manual' && (
              <>
                {selectedPersonnel?.length} personal seleccionado • {selectedSlots?.length} horarios seleccionados
              </>
            )}
            {assignmentType === 'auto' && (
              <>
                Asignación automática para {personnel?.filter(p => p?.availability === 'available')?.length} personal disponible
              </>
            )}
            {assignmentType === 'template' && selectedTemplate && (
              <>
                Plantilla seleccionada: {templates?.find(t => t?.id === selectedTemplate)?.name}
              </>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              onClick={handleAssign}
              disabled={
                (assignmentType === 'manual' && (selectedPersonnel?.length === 0 || selectedSlots?.length === 0)) ||
                (assignmentType === 'template' && !selectedTemplate)
              }
            >
              Asignar Turnos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkAssignmentModal;