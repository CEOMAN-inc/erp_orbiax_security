import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShiftTemplateModal = ({ isOpen, onClose, onSave, existingTemplate = null }) => {
  const [template, setTemplate] = useState({
    name: existingTemplate?.name || '',
    description: existingTemplate?.description || '',
    startTime: existingTemplate?.startTime || '08:00',
    endTime: existingTemplate?.endTime || '16:00',
    location: existingTemplate?.location || '',
    department: existingTemplate?.department || 'security',
    shiftType: existingTemplate?.shiftType || 'regular',
    requiredPersonnel: existingTemplate?.requiredPersonnel || 1,
    requiredCertifications: existingTemplate?.requiredCertifications || [],
    daysOfWeek: existingTemplate?.daysOfWeek || [],
    isRecurring: existingTemplate?.isRecurring || false,
    recurringPattern: existingTemplate?.recurringPattern || 'weekly'
  });

  const [errors, setErrors] = useState({});

  const departments = [
    { value: 'security', label: 'Seguridad' },
    { value: 'surveillance', label: 'Vigilancia' },
    { value: 'patrol', label: 'Patrullaje' },
    { value: 'reception', label: 'Recepción' }
  ];

  const shiftTypes = [
    { value: 'regular', label: 'Regular' },
    { value: 'overtime', label: 'Horas Extra' },
    { value: 'holiday', label: 'Festivo' },
    { value: 'night', label: 'Nocturno' }
  ];

  const certifications = [
    { value: 'basic-security', label: 'Seguridad Básica' },
    { value: 'armed-guard', label: 'Guardia Armado' },
    { value: 'first-aid', label: 'Primeros Auxilios' },
    { value: 'fire-safety', label: 'Seguridad Contra Incendios' },
    { value: 'crowd-control', label: 'Control de Multitudes' }
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Lunes' },
    { value: 'tuesday', label: 'Martes' },
    { value: 'wednesday', label: 'Miércoles' },
    { value: 'thursday', label: 'Jueves' },
    { value: 'friday', label: 'Viernes' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' }
  ];

  const recurringPatterns = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quincenal' },
    { value: 'monthly', label: 'Mensual' }
  ];

  const validateTemplate = () => {
    const newErrors = {};

    if (!template?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!template?.location?.trim()) {
      newErrors.location = 'La ubicación es requerida';
    }

    if (template?.requiredPersonnel < 1) {
      newErrors.requiredPersonnel = 'Debe requerir al menos 1 persona';
    }

    if (template?.startTime >= template?.endTime) {
      newErrors.endTime = 'La hora de fin debe ser posterior a la hora de inicio';
    }

    if (template?.isRecurring && template?.daysOfWeek?.length === 0) {
      newErrors.daysOfWeek = 'Seleccione al menos un día para turnos recurrentes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateTemplate()) {
      onSave({
        ...template,
        id: existingTemplate?.id || `template_${Date.now()}`
      });
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setTemplate(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDayToggle = (day) => {
    const updatedDays = template?.daysOfWeek?.includes(day)
      ? template?.daysOfWeek?.filter(d => d !== day)
      : [...template?.daysOfWeek, day];
    
    handleInputChange('daysOfWeek', updatedDays);
  };

  const handleCertificationToggle = (cert) => {
    const updatedCerts = template?.requiredCertifications?.includes(cert)
      ? template?.requiredCertifications?.filter(c => c !== cert)
      : [...template?.requiredCertifications, cert];
    
    handleInputChange('requiredCertifications', updatedCerts);
  };

  const calculateShiftDuration = () => {
    const start = new Date(`2000-01-01T${template.startTime}`);
    const end = new Date(`2000-01-01T${template.endTime}`);
    const diff = (end - start) / (1000 * 60 * 60);
    return diff > 0 ? diff : 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {existingTemplate ? 'Editar Plantilla de Turno' : 'Nueva Plantilla de Turno'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure los detalles de la plantilla para crear turnos automáticamente
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

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre de la Plantilla"
                type="text"
                value={template?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                placeholder="Ej: Turno Matutino Seguridad"
                required
              />

              <Input
                label="Ubicación"
                type="text"
                value={template?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                error={errors?.location}
                placeholder="Ej: Entrada Principal"
                required
              />
            </div>

            <Input
              label="Descripción"
              type="text"
              value={template?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Descripción opcional del turno"
            />
          </div>

          {/* Schedule Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Configuración de Horario</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Hora de Inicio"
                type="time"
                value={template?.startTime}
                onChange={(e) => handleInputChange('startTime', e?.target?.value)}
              />

              <Input
                label="Hora de Fin"
                type="time"
                value={template?.endTime}
                onChange={(e) => handleInputChange('endTime', e?.target?.value)}
                error={errors?.endTime}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Duración
                </label>
                <div className="px-3 py-2 bg-muted rounded-lg text-sm text-muted-foreground">
                  {calculateShiftDuration()} horas
                </div>
              </div>
            </div>
          </div>

          {/* Department and Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Clasificación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Departamento
                </label>
                <select
                  value={template?.department}
                  onChange={(e) => handleInputChange('department', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {departments?.map(dept => (
                    <option key={dept?.value} value={dept?.value}>{dept?.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Turno
                </label>
                <select
                  value={template?.shiftType}
                  onChange={(e) => handleInputChange('shiftType', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {shiftTypes?.map(type => (
                    <option key={type?.value} value={type?.value}>{type?.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personnel Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Requisitos de Personal</h3>
            
            <Input
              label="Personal Requerido"
              type="number"
              value={template?.requiredPersonnel}
              onChange={(e) => handleInputChange('requiredPersonnel', parseInt(e?.target?.value) || 1)}
              error={errors?.requiredPersonnel}
              min="1"
              max="10"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Certificaciones Requeridas
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {certifications?.map(cert => (
                  <label key={cert?.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={template?.requiredCertifications?.includes(cert?.value)}
                      onChange={() => handleCertificationToggle(cert?.value)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{cert?.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Recurring Configuration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isRecurring"
                checked={template?.isRecurring}
                onChange={(e) => handleInputChange('isRecurring', e?.target?.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="isRecurring" className="text-lg font-medium text-foreground">
                Turno Recurrente
              </label>
            </div>

            {template?.isRecurring && (
              <div className="space-y-4 pl-6 border-l-2 border-primary/20">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Patrón de Recurrencia
                  </label>
                  <select
                    value={template?.recurringPattern}
                    onChange={(e) => handleInputChange('recurringPattern', e?.target?.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {recurringPatterns?.map(pattern => (
                      <option key={pattern?.value} value={pattern?.value}>{pattern?.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Días de la Semana
                  </label>
                  {errors?.daysOfWeek && (
                    <p className="text-sm text-error mb-2">{errors?.daysOfWeek}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {daysOfWeek?.map(day => (
                      <label key={day?.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={template?.daysOfWeek?.includes(day?.value)}
                          onChange={() => handleDayToggle(day?.value)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{day?.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
          >
            {existingTemplate ? 'Actualizar Plantilla' : 'Crear Plantilla'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShiftTemplateModal;