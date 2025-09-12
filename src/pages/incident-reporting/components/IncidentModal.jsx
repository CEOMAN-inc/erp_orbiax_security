import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IncidentModal = ({ incident, isOpen, onClose, onSave, personnelOptions = [] }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    title: incident?.title || '',
    description: incident?.description || '',
    severity: incident?.severity || 'medium',
    type: incident?.type || 'security',
    location: incident?.location || '',
    assignedTo: incident?.assignedTo || '',
    status: incident?.status || 'open',
    witnessStatement: incident?.witnessStatement || '',
    resolutionNotes: incident?.resolutionNotes || ''
  });

  const [evidenceFiles, setEvidenceFiles] = useState(incident?.evidence || []);
  const [newEvidence, setNewEvidence] = useState([]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'details', label: 'Detalles', icon: 'FileText' },
    { id: 'evidence', label: 'Evidencia', icon: 'Paperclip' },
    { id: 'witnesses', label: 'Testigos', icon: 'Users' },
    { id: 'resolution', label: 'Resolución', icon: 'CheckCircle' },
    { id: 'timeline', label: 'Cronología', icon: 'Clock' }
  ];

  const severityOptions = [
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const statusOptions = [
    { value: 'open', label: 'Abierto' },
    { value: 'in-progress', label: 'En Progreso' },
    { value: 'resolved', label: 'Resuelto' },
    { value: 'closed', label: 'Cerrado' }
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
    setNewEvidence(prev => [...prev, ...newFiles]);
  };

  const removeEvidence = (id, isNew = false) => {
    if (isNew) {
      setNewEvidence(prev => prev?.filter(file => file?.id !== id));
    } else {
      setEvidenceFiles(prev => prev?.filter(file => file?.id !== id));
    }
  };

  const handleSave = () => {
    const updatedIncident = {
      ...incident,
      ...formData,
      evidence: [...evidenceFiles, ...newEvidence],
      updatedAt: new Date()?.toISOString()
    };
    onSave(updatedIncident);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const timelineEvents = incident?.timeline || [
    {
      id: 1,
      type: 'created',
      description: 'Incidente reportado',
      user: incident?.reportedBy || 'Sistema',
      timestamp: incident?.reportedAt || new Date()?.toISOString()
    },
    {
      id: 2,
      type: 'assigned',
      description: `Asignado a ${incident?.assignedTo || 'Sin asignar'}`,
      user: 'Sistema',
      timestamp: new Date(Date.now() - 3600000)?.toISOString()
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {incident ? `Incidente #${incident?.id}` : 'Nuevo Incidente'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {incident ? 'Editar detalles del incidente' : 'Reportar nuevo incidente'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Título del Incidente"
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  required
                />
                <Input
                  label="Ubicación"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Severidad"
                  options={severityOptions}
                  value={formData?.severity}
                  onChange={(value) => handleInputChange('severity', value)}
                />
                <Select
                  label="Tipo"
                  options={typeOptions}
                  value={formData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                />
                <Select
                  label="Estado"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              </div>

              <Select
                label="Asignado a"
                options={[
                  { value: '', label: 'Sin asignar' },
                  ...personnelOptions
                ]}
                value={formData?.assignedTo}
                onChange={(value) => handleInputChange('assignedTo', value)}
                searchable
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descripción del Incidente
                </label>
                <textarea
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Describe el incidente en detalle..."
                />
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Subir Evidencia</h3>
                <p className="text-sm text-muted-foreground mb-4">
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
                  onClick={() => document.getElementById('evidence-upload')?.click()}
                >
                  Seleccionar Archivos
                </Button>
              </div>

              {/* Existing Evidence */}
              {evidenceFiles?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Evidencia Existente</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                          onClick={() => removeEvidence(file?.id, false)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Evidence */}
              {newEvidence?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Nueva Evidencia</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {newEvidence?.map(file => (
                      <div key={file?.id} className="flex items-center space-x-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <Icon name="File" size={20} className="text-accent" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file?.size)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEvidence(file?.id, true)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'witnesses' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Declaración de Testigos
                </label>
                <textarea
                  value={formData?.witnessStatement}
                  onChange={(e) => handleInputChange('witnessStatement', e?.target?.value)}
                  rows={6}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Registra las declaraciones de testigos presenciales..."
                />
              </div>
            </div>
          )}

          {activeTab === 'resolution' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notas de Resolución
                </label>
                <textarea
                  value={formData?.resolutionNotes}
                  onChange={(e) => handleInputChange('resolutionNotes', e?.target?.value)}
                  rows={6}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Describe las acciones tomadas para resolver el incidente..."
                />
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="space-y-4">
                {timelineEvents?.map(event => (
                  <div key={event?.id} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={16} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{event?.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {event?.user} • {new Date(event.timestamp)?.toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentModal;