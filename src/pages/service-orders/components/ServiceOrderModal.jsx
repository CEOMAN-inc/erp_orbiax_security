import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceOrderModal = ({ 
  isOpen, 
  onClose, 
  serviceOrder = null,
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen) return null;

  const tabs = [
    { id: 'details', label: 'Detalles', icon: 'FileText' },
    { id: 'personnel', label: 'Personal', icon: 'Users' },
    { id: 'resources', label: 'Recursos', icon: 'Package' },
    { id: 'timeline', label: 'Cronología', icon: 'Clock' },
    { id: 'billing', label: 'Facturación', icon: 'DollarSign' }
  ];

  const mockPersonnel = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      role: 'Supervisor',
      shift: '06:00 - 18:00',
      status: 'activo',
      phone: '+57 300 123 4567'
    },
    {
      id: 2,
      name: 'María González',
      role: 'Guardia',
      shift: '18:00 - 06:00',
      status: 'activo',
      phone: '+57 301 234 5678'
    },
    {
      id: 3,
      name: 'José Martínez',
      role: 'Guardia',
      shift: '06:00 - 18:00',
      status: 'descanso',
      phone: '+57 302 345 6789'
    }
  ];

  const mockResources = [
    {
      id: 1,
      type: 'weapon',
      name: 'Pistola Glock 17',
      serial: 'GLK-2023-001',
      assignedTo: 'Carlos Rodríguez',
      status: 'asignado'
    },
    {
      id: 2,
      type: 'vehicle',
      name: 'Patrulla Toyota Hilux',
      plate: 'ABC-123',
      assignedTo: 'María González',
      status: 'en_uso'
    },
    {
      id: 3,
      type: 'device',
      name: 'Radio Motorola',
      serial: 'MOT-2023-045',
      assignedTo: 'José Martínez',
      status: 'disponible'
    }
  ];

  const mockTimeline = [
    {
      id: 1,
      timestamp: '2025-01-12 08:00',
      event: 'Orden creada',
      user: 'Admin Sistema',
      description: 'Orden de servicio creada para vigilancia nocturna'
    },
    {
      id: 2,
      timestamp: '2025-01-12 09:30',
      event: 'Personal asignado',
      user: 'Supervisor Operaciones',
      description: 'Asignado Carlos Rodríguez como supervisor principal'
    },
    {
      id: 3,
      timestamp: '2025-01-12 10:15',
      event: 'Recursos asignados',
      user: 'Jefe Logística',
      description: 'Asignados equipos de comunicación y vehículo patrulla'
    },
    {
      id: 4,
      timestamp: '2025-01-12 18:00',
      event: 'Servicio iniciado',
      user: 'Carlos Rodríguez',
      description: 'Inicio de turno nocturno en ubicación asignada'
    }
  ];

  const renderDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Información General</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Número de Orden</label>
              <p className="text-sm font-medium text-foreground">{serviceOrder?.orderNumber || 'SO-2025-001'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Cliente</label>
              <p className="text-sm font-medium text-foreground">{serviceOrder?.client || 'Banco Nacional'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Tipo de Servicio</label>
              <p className="text-sm font-medium text-foreground">{serviceOrder?.serviceType || 'Vigilancia Nocturna'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Prioridad</label>
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="text-sm font-medium text-foreground capitalize">{serviceOrder?.priority || 'Alta'}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Ubicación y Contacto</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Ubicación</label>
              <p className="text-sm font-medium text-foreground">{serviceOrder?.location || 'Sucursal Centro'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Dirección</label>
              <p className="text-sm text-foreground">{serviceOrder?.address || 'Carrera 7 # 32-16, Bogotá'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Contacto Cliente</label>
              <p className="text-sm text-foreground">{serviceOrder?.clientContact || 'Ana Pérez - Gerente Seguridad'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Teléfono</label>
              <p className="text-sm text-foreground">+57 1 234 5678</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Descripción del Servicio</h4>
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-foreground">
            {serviceOrder?.description || `Servicio de vigilancia nocturna para sucursal bancaria ubicada en el centro de la ciudad. 
            Requiere personal armado con experiencia en seguridad bancaria. Horario de 18:00 a 06:00 horas.
            Incluye patrullaje perimetral cada 2 horas y monitoreo de sistemas de alarma.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Fecha Inicio</label>
          <p className="text-sm font-medium text-foreground">12/01/2025</p>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Fecha Fin</label>
          <p className="text-sm font-medium text-foreground">12/02/2025</p>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Valor Total</label>
          <p className="text-sm font-bold text-accent">$2.500.000 COP</p>
        </div>
      </div>
    </div>
  );

  const renderPersonnelTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Personal Asignado</h4>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} />
          Asignar Personal
        </Button>
      </div>

      <div className="space-y-3">
        {mockPersonnel?.map((person) => (
          <div key={person?.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {person?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{person?.name}</p>
                  <p className="text-xs text-muted-foreground">{person?.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground">{person?.shift}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  person?.status === 'activo' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                }`}>
                  {person?.status === 'activo' ? 'Activo' : 'Descanso'}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{person?.phone}</p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Phone" size={14} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MessageCircle" size={14} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Recursos Operacionales</h4>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} />
          Asignar Recurso
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockResources?.map((resource) => (
          <div key={resource?.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                resource?.type === 'weapon' ? 'bg-error/20' :
                resource?.type === 'vehicle' ? 'bg-primary/20' : 'bg-secondary/20'
              }`}>
                <Icon 
                  name={
                    resource?.type === 'weapon' ? 'Shield' :
                    resource?.type === 'vehicle' ? 'Car' : 'Radio'
                  } 
                  size={20} 
                  className={
                    resource?.type === 'weapon' ? 'text-error' :
                    resource?.type === 'vehicle' ? 'text-primary' : 'text-secondary'
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{resource?.name}</p>
                <p className="text-xs text-muted-foreground">{resource?.serial || resource?.plate}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <label className="text-xs text-muted-foreground">Asignado a</label>
                <p className="text-sm text-foreground">{resource?.assignedTo}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  resource?.status === 'asignado' || resource?.status === 'en_uso' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                }`}>
                  {resource?.status === 'asignado' ? 'Asignado' : 
                   resource?.status === 'en_uso' ? 'En Uso' : 'Disponible'}
                </span>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Cronología de Eventos</h4>
      
      <div className="space-y-4">
        {mockTimeline?.map((event, index) => (
          <div key={event?.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Clock" size={16} className="text-primary-foreground" />
              </div>
              {index < mockTimeline?.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2"></div>
              )}
            </div>
            
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground">{event?.event}</p>
                <p className="text-xs text-muted-foreground">{event?.timestamp}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-1">Por: {event?.user}</p>
              <p className="text-sm text-foreground">{event?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Información de Facturación</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Valor Base</label>
              <p className="text-sm font-medium text-foreground">$2.000.000 COP</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Horas Extra</label>
              <p className="text-sm font-medium text-foreground">$300.000 COP</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Recursos Adicionales</label>
              <p className="text-sm font-medium text-foreground">$200.000 COP</p>
            </div>
            <div className="border-t border-border pt-2">
              <label className="text-xs text-muted-foreground">Total</label>
              <p className="text-lg font-bold text-accent">$2.500.000 COP</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Estado de Facturación</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Estado</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/20 text-warning ml-2">
                Pendiente
              </span>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Fecha Facturación</label>
              <p className="text-sm text-foreground">15/01/2025</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Fecha Vencimiento</label>
              <p className="text-sm text-foreground">30/01/2025</p>
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                <Icon name="FileText" size={16} />
                Generar Factura
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return renderDetailsTab();
      case 'personnel':
        return renderPersonnelTab();
      case 'resources':
        return renderResourcesTab();
      case 'timeline':
        return renderTimelineTab();
      case 'billing':
        return renderBillingTab();
      default:
        return renderDetailsTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {serviceOrder?.orderNumber || 'SO-2025-001'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {serviceOrder?.client || 'Banco Nacional'} - {serviceOrder?.location || 'Sucursal Centro'}
            </p>
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
                className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
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
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="default" onClick={() => onSave && onSave(serviceOrder)}>
            <Icon name="Save" size={16} />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceOrderModal;