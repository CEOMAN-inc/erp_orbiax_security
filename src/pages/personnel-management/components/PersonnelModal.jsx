import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonnelModal = ({ 
  employee, 
  isOpen, 
  onClose, 
  onSave, 
  mode = 'view' // 'view', 'edit', 'create'
}) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(employee || {
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    status: 'Activo',
    hireDate: '',
    certificationStatus: 'Vigente',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  if (!isOpen) return null;

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: 'User' },
    { id: 'certifications', label: 'Certificaciones', icon: 'Award' },
    { id: 'equipment', label: 'Equipamiento', icon: 'Package' },
    { id: 'performance', label: 'Rendimiento', icon: 'TrendingUp' }
  ];

  const roleOptions = [
    { value: 'Guardia de Seguridad', label: 'Guardia de Seguridad' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Coordinador', label: 'Coordinador' },
    { value: 'Jefe de Operaciones', label: 'Jefe de Operaciones' },
    { value: 'Administrador', label: 'Administrador' }
  ];

  const departmentOptions = [
    { value: 'Operaciones', label: 'Operaciones' },
    { value: 'Administración', label: 'Administración' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' },
    { value: 'Finanzas', label: 'Finanzas' },
    { value: 'Comercial', label: 'Comercial' }
  ];

  const statusOptions = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'Suspendido', label: 'Suspendido' }
  ];

  const mockCertifications = [
    {
      id: 1,
      name: 'Certificación en Seguridad Privada',
      issuer: 'SUPERVIGILANCIA',
      issueDate: '15/03/2023',
      expiryDate: '15/03/2025',
      status: 'Vigente'
    },
    {
      id: 2,
      name: 'Manejo de Armas de Fuego',
      issuer: 'INDUMIL',
      issueDate: '20/06/2023',
      expiryDate: '20/06/2024',
      status: 'Por Vencer'
    }
  ];

  const mockEquipment = [
    {
      id: 1,
      name: 'Radio Motorola XPR3300',
      code: 'RAD-001',
      assignedDate: '10/01/2024',
      status: 'Asignado'
    },
    {
      id: 2,
      name: 'Uniforme Completo',
      code: 'UNI-045',
      assignedDate: '10/01/2024',
      status: 'Asignado'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const renderPersonalTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre Completo"
          type="text"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          disabled={mode === 'view'}
          required
        />
        <Input
          label="Correo Electrónico"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={mode === 'view'}
          required
        />
        <Input
          label="Teléfono"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={mode === 'view'}
        />
        <Select
          label="Cargo"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          disabled={mode === 'view'}
          required
        />
        <Select
          label="Departamento"
          options={departmentOptions}
          value={formData?.department}
          onChange={(value) => handleInputChange('department', value)}
          disabled={mode === 'view'}
          required
        />
        <Select
          label="Estado"
          options={statusOptions}
          value={formData?.status}
          onChange={(value) => handleInputChange('status', value)}
          disabled={mode === 'view'}
        />
        <Input
          label="Fecha de Ingreso"
          type="date"
          value={formData?.hireDate}
          onChange={(e) => handleInputChange('hireDate', e?.target?.value)}
          disabled={mode === 'view'}
        />
      </div>
      <Input
        label="Dirección"
        type="text"
        value={formData?.address}
        onChange={(e) => handleInputChange('address', e?.target?.value)}
        disabled={mode === 'view'}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Contacto de Emergencia"
          type="text"
          value={formData?.emergencyContact}
          onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
          disabled={mode === 'view'}
        />
        <Input
          label="Teléfono de Emergencia"
          type="tel"
          value={formData?.emergencyPhone}
          onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
          disabled={mode === 'view'}
        />
      </div>
    </div>
  );

  const renderCertificationsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-foreground">Certificaciones</h4>
        {mode !== 'view' && (
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Agregar Certificación
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {mockCertifications?.map((cert) => (
          <div key={cert?.id} className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{cert?.name}</h5>
                <p className="text-sm text-muted-foreground mt-1">Emisor: {cert?.issuer}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span>Emisión: {cert?.issueDate}</span>
                  <span>Vencimiento: {cert?.expiryDate}</span>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                cert?.status === 'Vigente' ? 'bg-success/20 text-success border border-success/30' :
                cert?.status === 'Por Vencer'? 'bg-warning/20 text-warning border border-warning/30' : 'bg-error/20 text-error border border-error/30'
              }`}>
                {cert?.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEquipmentTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-foreground">Equipamiento Asignado</h4>
        {mode !== 'view' && (
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Asignar Equipo
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {mockEquipment?.map((equipment) => (
          <div key={equipment?.id} className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground">{equipment?.name}</h5>
                  <p className="text-sm text-muted-foreground">Código: {equipment?.code}</p>
                  <p className="text-sm text-muted-foreground">Asignado: {equipment?.assignedDate}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success border border-success/30">
                {equipment?.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">98%</p>
          <p className="text-sm text-muted-foreground">Asistencia</p>
        </div>
        <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Star" size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">4.8</p>
          <p className="text-sm text-muted-foreground">Calificación</p>
        </div>
        <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="AlertTriangle" size={24} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-sm text-muted-foreground">Incidentes</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Evaluaciones Recientes</h4>
        <div className="space-y-3">
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-foreground">Evaluación Trimestral Q4 2024</h5>
                <p className="text-sm text-muted-foreground">Evaluador: Carlos Mendoza</p>
                <p className="text-sm text-muted-foreground">Fecha: 15/12/2024</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={16}
                      className={star <= 4 ? "text-warning fill-current" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">4.0/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalTab();
      case 'certifications':
        return renderCertificationsTab();
      case 'equipment':
        return renderEquipmentTab();
      case 'performance':
        return renderPerformanceTab();
      default:
        return renderPersonalTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-lg font-bold">
              {formData?.name ? formData?.name?.split(' ')?.map(n => n?.[0])?.join('') : 'NU'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'create' ? 'Nuevo Empleado' : formData?.name || 'Empleado'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === 'view' ? 'Ver información' : mode === 'edit' ? 'Editar información' : 'Crear empleado'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
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
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            {mode === 'view' ? 'Cerrar' : 'Cancelar'}
          </Button>
          {mode !== 'view' && (
            <Button onClick={handleSave} iconName="Save" iconPosition="left">
              {mode === 'create' ? 'Crear Empleado' : 'Guardar Cambios'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonnelModal;