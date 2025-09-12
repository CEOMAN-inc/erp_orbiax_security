import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AssetFormModal = ({ asset, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    status: 'Activo',
    location: '',
    assignedTo: '',
    description: '',
    brand: '',
    model: '',
    serialNumber: '',
    acquisitionDate: '',
    acquisitionValue: '',
    supplier: '',
    warranty: '',
    nextMaintenance: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset?.name || '',
        code: asset?.code || '',
        category: asset?.category || '',
        status: asset?.status || 'Activo',
        location: asset?.location || '',
        assignedTo: asset?.assignedTo || '',
        description: asset?.description || '',
        brand: asset?.brand || '',
        model: asset?.model || '',
        serialNumber: asset?.serialNumber || '',
        acquisitionDate: asset?.acquisitionDate || '',
        acquisitionValue: asset?.acquisitionValue || '',
        supplier: asset?.supplier || '',
        warranty: asset?.warranty || '',
        nextMaintenance: asset?.nextMaintenance || ''
      });
    } else {
      setFormData({
        name: '',
        code: '',
        category: '',
        status: 'Activo',
        location: '',
        assignedTo: '',
        description: '',
        brand: '',
        model: '',
        serialNumber: '',
        acquisitionDate: '',
        acquisitionValue: '',
        supplier: '',
        warranty: '',
        nextMaintenance: ''
      });
    }
    setErrors({});
  }, [asset, isOpen]);

  if (!isOpen) return null;

  const categories = [
    { value: '', label: 'Seleccionar categoría' },
    { value: 'Armas', label: 'Armas' },
    { value: 'Vehículos', label: 'Vehículos' },
    { value: 'Equipos', label: 'Equipos' },
    { value: 'Tecnología', label: 'Tecnología' }
  ];

  const statuses = [
    { value: 'Activo', label: 'Activo' },
    { value: 'En Mantenimiento', label: 'En Mantenimiento' },
    { value: 'Fuera de Servicio', label: 'Fuera de Servicio' },
    { value: 'En Reparación', label: 'En Reparación' }
  ];

  const locations = [
    { value: '', label: 'Seleccionar ubicación' },
    { value: 'Sede Principal', label: 'Sede Principal' },
    { value: 'Almacén Norte', label: 'Almacén Norte' },
    { value: 'Almacén Sur', label: 'Almacén Sur' },
    { value: 'Base Operativa 1', label: 'Base Operativa 1' },
    { value: 'Base Operativa 2', label: 'Base Operativa 2' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData?.code?.trim()) {
      newErrors.code = 'El código es requerido';
    }

    if (!formData?.category) {
      newErrors.category = 'La categoría es requerida';
    }

    if (!formData?.location) {
      newErrors.location = 'La ubicación es requerida';
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
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving asset:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {asset ? 'Editar Activo' : 'Nuevo Activo'}
          </h2>
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
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del Activo"
                  type="text"
                  placeholder="Ingrese el nombre del activo"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />

                <Input
                  label="Código"
                  type="text"
                  placeholder="Ingrese el código del activo"
                  value={formData?.code}
                  onChange={(e) => handleInputChange('code', e?.target?.value)}
                  error={errors?.code}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Categoría <span className="text-error">*</span>
                  </label>
                  <select
                    value={formData?.category}
                    onChange={(e) => handleInputChange('category', e?.target?.value)}
                    className={`w-full px-3 py-2 bg-input border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors?.category ? 'border-error' : 'border-border'
                    }`}
                  >
                    {categories?.map(category => (
                      <option key={category?.value} value={category?.value}>
                        {category?.label}
                      </option>
                    ))}
                  </select>
                  {errors?.category && (
                    <p className="mt-1 text-sm text-error">{errors?.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
                  <select
                    value={formData?.status}
                    onChange={(e) => handleInputChange('status', e?.target?.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {statuses?.map(status => (
                      <option key={status?.value} value={status?.value}>
                        {status?.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ubicación <span className="text-error">*</span>
                  </label>
                  <select
                    value={formData?.location}
                    onChange={(e) => handleInputChange('location', e?.target?.value)}
                    className={`w-full px-3 py-2 bg-input border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors?.location ? 'border-error' : 'border-border'
                    }`}
                  >
                    {locations?.map(location => (
                      <option key={location?.value} value={location?.value}>
                        {location?.label}
                      </option>
                    ))}
                  </select>
                  {errors?.location && (
                    <p className="mt-1 text-sm text-error">{errors?.location}</p>
                  )}
                </div>

                <Input
                  label="Asignado a"
                  type="text"
                  placeholder="Nombre del responsable"
                  value={formData?.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e?.target?.value)}
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Especificaciones Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Marca"
                  type="text"
                  placeholder="Marca del activo"
                  value={formData?.brand}
                  onChange={(e) => handleInputChange('brand', e?.target?.value)}
                />

                <Input
                  label="Modelo"
                  type="text"
                  placeholder="Modelo del activo"
                  value={formData?.model}
                  onChange={(e) => handleInputChange('model', e?.target?.value)}
                />

                <Input
                  label="Número de Serie"
                  type="text"
                  placeholder="Número de serie"
                  value={formData?.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e?.target?.value)}
                />

                <Input
                  label="Garantía"
                  type="text"
                  placeholder="Período de garantía"
                  value={formData?.warranty}
                  onChange={(e) => handleInputChange('warranty', e?.target?.value)}
                />
              </div>
            </div>

            {/* Acquisition Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Información de Adquisición</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Fecha de Adquisición"
                  type="date"
                  value={formData?.acquisitionDate}
                  onChange={(e) => handleInputChange('acquisitionDate', e?.target?.value)}
                />

                <Input
                  label="Valor de Adquisición"
                  type="text"
                  placeholder="$0"
                  value={formData?.acquisitionValue}
                  onChange={(e) => handleInputChange('acquisitionValue', e?.target?.value)}
                />

                <Input
                  label="Proveedor"
                  type="text"
                  placeholder="Nombre del proveedor"
                  value={formData?.supplier}
                  onChange={(e) => handleInputChange('supplier', e?.target?.value)}
                />

                <Input
                  label="Próximo Mantenimiento"
                  type="date"
                  value={formData?.nextMaintenance}
                  onChange={(e) => handleInputChange('nextMaintenance', e?.target?.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Descripción detallada del activo..."
                rows={4}
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
              iconName="Save"
            >
              {asset ? 'Actualizar Activo' : 'Crear Activo'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetFormModal;