import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateIncidentModal = ({ isOpen, onClose, onSave, personnelOptions = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    type: 'security',
    location: '',
    assignedTo: '',
    witnessStatement: ''
  });

  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const severityOptions = [
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const typeOptions = [
    { value: 'security', label: 'Seguridad' },
    { value: 'safety', label: 'Seguridad Laboral' },
    { value: 'equipment', label: 'Equipamiento' },
    { value: 'personnel', label: 'Personal' },
    { value: 'client', label: 'Cliente' },
    { value: 'other', label: 'Otro' }
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

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newFiles = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date()?.toISOString()
    }));
    setEvidenceFiles(prev => [...prev, ...newFiles]);
  };

  const removeEvidence = (id) => {
    setEvidenceFiles(prev => prev?.filter(file => file?.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }

    if (!formData?.location?.trim()) {
      newErrors.location = 'La ubicación es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newIncident = {
      id: `INC-${Date.now()}`,
      ...formData,
      status: 'open',
      reportedBy: 'Usuario Actual',
      reportedAt: new Date()?.toISOString(),
      evidence: evidenceFiles,
      evidenceCount: evidenceFiles?.length,
      timeline: [
        {
          id: 1,
          type: 'created',
          description: 'Incidente reportado',
          user: 'Usuario Actual',
          timestamp: new Date()?.toISOString()
        }
      ]
    };

    onSave(newIncident);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      severity: 'medium',
      type: 'security',
      location: '',
      assignedTo: '',
      witnessStatement: ''
    });
    setEvidenceFiles([]);
    setErrors({});
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Reportar Nuevo Incidente</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete la información del incidente
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-4">
            <Input
              label="Título del Incidente"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
              placeholder="Resumen breve del incidente"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Severidad"
                options={severityOptions}
                value={formData?.severity}
                onChange={(value) => handleInputChange('severity', value)}
                required
              />
              <Select
                label="Tipo de Incidente"
                options={typeOptions}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
                required
              />
            </div>

            <Input
              label="Ubicación"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              error={errors?.location}
              required
              placeholder="Ubicación específica donde ocurrió el incidente"
            />

            <Select
              label="Asignar a"
              options={[
                { value: '', label: 'Sin asignar' },
                ...personnelOptions
              ]}
              value={formData?.assignedTo}
              onChange={(value) => handleInputChange('assignedTo', value)}
              searchable
              placeholder="Seleccionar responsable"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción del Incidente *
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className={`w-full px-3 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                  errors?.description ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Describe el incidente en detalle, incluyendo qué pasó, cuándo y cómo..."
              />
              {errors?.description && (
                <p className="text-sm text-red-400 mt-1">{errors?.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Declaración de Testigos
              </label>
              <textarea
                value={formData?.witnessStatement}
                onChange={(e) => handleInputChange('witnessStatement', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Si hay testigos, registra sus declaraciones aquí..."
              />
            </div>

            {/* Evidence Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Evidencia
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-3">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="evidence-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('evidence-upload')?.click()}
                >
                  Seleccionar Archivos
                </Button>
              </div>

              {/* Evidence List */}
              {evidenceFiles?.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Archivos Adjuntos</h4>
                  {evidenceFiles?.map(file => (
                    <div key={file?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Icon name="File" size={20} className="text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file?.size)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEvidence(file?.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Reportar Incidente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateIncidentModal;