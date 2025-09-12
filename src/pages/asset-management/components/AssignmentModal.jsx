import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AssignmentModal = ({ asset, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    assignedToId: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    purpose: '',
    notes: '',
    handoverChecklist: {
      physicalCondition: false,
      documentation: false,
      accessories: false,
      training: false
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !asset) return null;

  const personnel = [
    { id: 1, name: 'María González', position: 'Supervisor de Seguridad', location: 'Sede Principal' },
    { id: 2, name: 'Pedro Martínez', position: 'Guardia de Seguridad', location: 'Base Operativa 1' },
    { id: 3, name: 'Ana Rodríguez', position: 'Coordinadora de Campo', location: 'Base Operativa 2' },
    { id: 4, name: 'Carlos López', position: 'Técnico de Seguridad', location: 'Almacén Norte' },
    { id: 5, name: 'Laura Fernández', position: 'Supervisora de Turno', location: 'Sede Principal' },
    { id: 6, name: 'Miguel Torres', position: 'Guardia de Seguridad', location: 'Base Operativa 1' }
  ];

  const locations = [
    { value: '', label: 'Seleccionar ubicación' },
    { value: 'Sede Principal', label: 'Sede Principal' },
    { value: 'Almacén Norte', label: 'Almacén Norte' },
    { value: 'Almacén Sur', label: 'Almacén Sur' },
    { value: 'Base Operativa 1', label: 'Base Operativa 1' },
    { value: 'Base Operativa 2', label: 'Base Operativa 2' }
  ];

  const purposes = [
    { value: '', label: 'Seleccionar propósito' },
    { value: 'Operación Regular', label: 'Operación Regular' },
    { value: 'Proyecto Especial', label: 'Proyecto Especial' },
    { value: 'Mantenimiento', label: 'Mantenimiento' },
    { value: 'Capacitación', label: 'Capacitación' },
    { value: 'Respaldo', label: 'Respaldo' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePersonnelSelect = (personnelId) => {
    const selectedPerson = personnel?.find(p => p?.id === parseInt(personnelId));
    if (selectedPerson) {
      setFormData(prev => ({
        ...prev,
        assignedTo: selectedPerson?.name,
        assignedToId: selectedPerson?.id,
        position: selectedPerson?.position,
        location: selectedPerson?.location
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        assignedTo: '',
        assignedToId: '',
        position: '',
        location: ''
      }));
    }
  };

  const handleChecklistChange = (item, checked) => {
    setFormData(prev => ({
      ...prev,
      handoverChecklist: {
        ...prev?.handoverChecklist,
        [item]: checked
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.assignedTo) {
      newErrors.assignedTo = 'Debe seleccionar una persona';
    }

    if (!formData?.startDate) {
      newErrors.startDate = 'La fecha de inicio es requerida';
    }

    if (!formData?.purpose) {
      newErrors.purpose = 'El propósito es requerido';
    }

    // Validate end date is after start date
    if (formData?.endDate && formData?.startDate) {
      if (new Date(formData.endDate) <= new Date(formData.startDate)) {
        newErrors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const assignmentData = {
        ...formData,
        assetId: asset?.id,
        assetName: asset?.name,
        assetCode: asset?.code,
        status: 'Activa',
        createdDate: new Date()?.toISOString()
      };
      
      await onSave(assignmentData);
      onClose();
      
      // Reset form
      setFormData({
        assignedTo: '',
        assignedToId: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        purpose: '',
        notes: '',
        handoverChecklist: {
          physicalCondition: false,
          documentation: false,
          accessories: false,
          training: false
        }
      });
    } catch (error) {
      console.error('Error creating assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const checklistItems = [
    { key: 'physicalCondition', label: 'Estado físico verificado', icon: 'CheckCircle' },
    { key: 'documentation', label: 'Documentación entregada', icon: 'FileText' },
    { key: 'accessories', label: 'Accesorios incluidos', icon: 'Package' },
    { key: 'training', label: 'Capacitación completada', icon: 'GraduationCap' }
  ];

  const isChecklistComplete = Object.values(formData?.handoverChecklist)?.every(Boolean);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Asignar Activo</h2>
            <p className="text-muted-foreground">{asset?.name} - {asset?.code}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Asset Information */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{asset?.name}</h3>
                  <p className="text-sm text-muted-foreground">{asset?.code} • {asset?.category} • {asset?.location}</p>
                </div>
              </div>
            </div>

            {/* Assignment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Asignar a <span className="text-error">*</span>
                </label>
                <select
                  value={formData?.assignedToId}
                  onChange={(e) => handlePersonnelSelect(e?.target?.value)}
                  className={`w-full px-3 py-2 bg-input border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors?.assignedTo ? 'border-error' : 'border-border'
                  }`}
                >
                  <option value="">Seleccionar persona</option>
                  {personnel?.map(person => (
                    <option key={person?.id} value={person?.id}>
                      {person?.name} - {person?.position}
                    </option>
                  ))}
                </select>
                {errors?.assignedTo && (
                  <p className="mt-1 text-sm text-error">{errors?.assignedTo}</p>
                )}
              </div>

              <Input
                label="Cargo"
                type="text"
                value={formData?.position}
                onChange={(e) => handleInputChange('position', e?.target?.value)}
                disabled
                className="bg-muted"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ubicación de Trabajo</label>
                <select
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {locations?.map(location => (
                    <option key={location?.value} value={location?.value}>
                      {location?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Propósito <span className="text-error">*</span>
                </label>
                <select
                  value={formData?.purpose}
                  onChange={(e) => handleInputChange('purpose', e?.target?.value)}
                  className={`w-full px-3 py-2 bg-input border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors?.purpose ? 'border-error' : 'border-border'
                  }`}
                >
                  {purposes?.map(purpose => (
                    <option key={purpose?.value} value={purpose?.value}>
                      {purpose?.label}
                    </option>
                  ))}
                </select>
                {errors?.purpose && (
                  <p className="mt-1 text-sm text-error">{errors?.purpose}</p>
                )}
              </div>

              <Input
                label="Fecha de Inicio"
                type="datetime-local"
                value={formData?.startDate}
                onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                error={errors?.startDate}
                required
              />

              <Input
                label="Fecha de Fin (Opcional)"
                type="datetime-local"
                value={formData?.endDate}
                onChange={(e) => handleInputChange('endDate', e?.target?.value)}
                error={errors?.endDate}
              />
            </div>

            {/* Handover Checklist */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Lista de Verificación de Entrega</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {checklistItems?.map(item => (
                    <label key={item?.key} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData?.handoverChecklist?.[item?.key]}
                        onChange={(e) => handleChecklistChange(item?.key, e?.target?.checked)}
                        className="rounded border-border"
                      />
                      <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{item?.label}</span>
                    </label>
                  ))}
                </div>
                
                {isChecklistComplete && (
                  <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm text-success font-medium">Lista de verificación completa</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Notas Adicionales</label>
              <textarea
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                placeholder="Instrucciones especiales, condiciones de uso, etc..."
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="UserPlus"
              disabled={!isChecklistComplete}
            >
              Crear Asignación
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentModal;