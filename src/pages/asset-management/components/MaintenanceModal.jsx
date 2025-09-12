import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MaintenanceModal = ({ asset, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: '',
    scheduledDate: '',
    description: '',
    technician: '',
    estimatedCost: '',
    priority: 'Media',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !asset) return null;

  const maintenanceTypes = [
    { value: '', label: 'Seleccionar tipo' },
    { value: 'Preventivo', label: 'Mantenimiento Preventivo' },
    { value: 'Correctivo', label: 'Mantenimiento Correctivo' },
    { value: 'Predictivo', label: 'Mantenimiento Predictivo' },
    { value: 'Reparación', label: 'Reparación' },
    { value: 'Calibración', label: 'Calibración' },
    { value: 'Inspección', label: 'Inspección' }
  ];

  const priorities = [
    { value: 'Baja', label: 'Baja' },
    { value: 'Media', label: 'Media' },
    { value: 'Alta', label: 'Alta' },
    { value: 'Crítica', label: 'Crítica' }
  ];

  const technicians = [
    { value: '', label: 'Seleccionar técnico' },
    { value: 'Carlos Méndez', label: 'Carlos Méndez' },
    { value: 'Ana García', label: 'Ana García' },
    { value: 'Luis Rodríguez', label: 'Luis Rodríguez' },
    { value: 'María Fernández', label: 'María Fernández' },
    { value: 'Pedro Martínez', label: 'Pedro Martínez' }
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.type) {
      newErrors.type = 'El tipo de mantenimiento es requerido';
    }

    if (!formData?.scheduledDate) {
      newErrors.scheduledDate = 'La fecha programada es requerida';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData?.technician) {
      newErrors.technician = 'El técnico es requerido';
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
      const maintenanceData = {
        ...formData,
        assetId: asset?.id,
        assetName: asset?.name,
        assetCode: asset?.code,
        status: 'Programado',
        createdDate: new Date()?.toISOString()
      };
      
      await onSave(maintenanceData);
      onClose();
      
      // Reset form
      setFormData({
        type: '',
        scheduledDate: '',
        description: '',
        technician: '',
        estimatedCost: '',
        priority: 'Media',
        notes: ''
      });
    } catch (error) {
      console.error('Error scheduling maintenance:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Crítica':
        return 'text-error';
      case 'Alta':
        return 'text-accent';
      case 'Media':
        return 'text-warning';
      case 'Baja':
        return 'text-success';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Programar Mantenimiento</h2>
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

            {/* Maintenance Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Mantenimiento <span className="text-error">*</span>
                </label>
                <select
                  value={formData?.type}
                  onChange={(e) => handleInputChange('type', e?.target?.value)}
                  className={`w-full px-3 py-2 bg-input border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors?.type ? 'border-error' : 'border-border'
                  }`}
                >
                  {maintenanceTypes?.map(type => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
                {errors?.type && (
                  <p className="mt-1 text-sm text-error">{errors?.type}</p>
                )}
              </div>

              <Input
                label="Fecha Programada"
                type="datetime-local"
                value={formData?.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
                error={errors?.scheduledDate}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Técnico Asignado <span className="text-error">*</span>
                </label>
                <select
                  value={formData?.technician}
                  onChange={(e) => handleInputChange('technician', e?.target?.value)}
                  className={`w-full px-3 py-2 bg-input border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors?.technician ? 'border-error' : 'border-border'
                  }`}
                >
                  {technicians?.map(tech => (
                    <option key={tech?.value} value={tech?.value}>
                      {tech?.label}
                    </option>
                  ))}
                </select>
                {errors?.technician && (
                  <p className="mt-1 text-sm text-error">{errors?.technician}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Prioridad</label>
                <select
                  value={formData?.priority}
                  onChange={(e) => handleInputChange('priority', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {priorities?.map(priority => (
                    <option key={priority?.value} value={priority?.value}>
                      {priority?.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center mt-1">
                  <Icon name="AlertCircle" size={14} className={getPriorityColor(formData?.priority)} />
                  <span className={`text-sm ml-1 ${getPriorityColor(formData?.priority)}`}>
                    Prioridad {formData?.priority}
                  </span>
                </div>
              </div>

              <Input
                label="Costo Estimado"
                type="text"
                placeholder="$0"
                value={formData?.estimatedCost}
                onChange={(e) => handleInputChange('estimatedCost', e?.target?.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción del Trabajo <span className="text-error">*</span>
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Describa detalladamente el trabajo de mantenimiento a realizar..."
                rows={4}
                className={`w-full px-3 py-2 bg-input border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none ${
                  errors?.description ? 'border-error' : 'border-border'
                }`}
              />
              {errors?.description && (
                <p className="mt-1 text-sm text-error">{errors?.description}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Notas Adicionales</label>
              <textarea
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                placeholder="Notas adicionales, instrucciones especiales, etc..."
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
              iconName="Calendar"
            >
              Programar Mantenimiento
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceModal;