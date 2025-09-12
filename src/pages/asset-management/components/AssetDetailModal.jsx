import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetDetailModal = ({ asset, isOpen, onClose, onEdit, onAssign, onMaintenance }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !asset) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-success text-success-foreground';
      case 'En Mantenimiento':
        return 'bg-warning text-warning-foreground';
      case 'Fuera de Servicio':
        return 'bg-error text-error-foreground';
      case 'En Reparación':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Armas':
        return 'Shield';
      case 'Vehículos':
        return 'Car';
      case 'Equipos':
        return 'HardHat';
      case 'Tecnología':
        return 'Laptop';
      default:
        return 'Package';
    }
  };

  const maintenanceHistory = [
    {
      id: 1,
      date: "2024-11-15",
      type: "Mantenimiento Preventivo",
      description: "Revisión general y limpieza completa",
      technician: "Carlos Méndez",
      cost: "$150.000",
      status: "Completado"
    },
    {
      id: 2,
      date: "2024-08-20",
      type: "Reparación",
      description: "Reemplazo de componente defectuoso",
      technician: "Ana García",
      cost: "$320.000",
      status: "Completado"
    },
    {
      id: 3,
      date: "2024-05-10",
      type: "Mantenimiento Preventivo",
      description: "Calibración y ajustes menores",
      technician: "Luis Rodríguez",
      cost: "$80.000",
      status: "Completado"
    }
  ];

  const assignmentHistory = [
    {
      id: 1,
      startDate: "2024-12-01",
      endDate: null,
      assignedTo: "María González",
      position: "Supervisor de Seguridad",
      location: "Sede Principal",
      status: "Activa"
    },
    {
      id: 2,
      startDate: "2024-09-15",
      endDate: "2024-11-30",
      assignedTo: "Pedro Martínez",
      position: "Guardia de Seguridad",
      location: "Base Operativa 1",
      status: "Finalizada"
    }
  ];

  const specifications = {
    "Marca": "SecureTech Pro",
    "Modelo": "ST-2024",
    "Número de Serie": "ST240912001",
    "Año de Fabricación": "2024",
    "Garantía": "2 años",
    "Proveedor": "Seguridad Total S.A.S",
    "Fecha de Adquisición": "15/03/2024",
    "Valor de Adquisición": "$2.500.000",
    "Vida Útil Estimada": "5 años"
  };

  const tabs = [
    { id: 'details', label: 'Detalles', icon: 'Info' },
    { id: 'maintenance', label: 'Mantenimiento', icon: 'Wrench' },
    { id: 'assignments', label: 'Asignaciones', icon: 'Users' },
    { id: 'documents', label: 'Documentos', icon: 'FileText' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name={getCategoryIcon(asset?.category)} size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{asset?.name}</h2>
              <p className="text-muted-foreground">{asset?.code}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(asset?.status)}`}>
              {asset?.status}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => onEdit(asset)}
              iconName="Edit"
            >
              Editar
            </Button>
            <Button
              variant="outline"
              onClick={() => onAssign(asset)}
              iconName="UserPlus"
            >
              Asignar
            </Button>
            <Button
              variant="outline"
              onClick={() => onMaintenance(asset)}
              iconName="Wrench"
            >
              Mantenimiento
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Información General</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoría:</span>
                      <span className="text-foreground font-medium">{asset?.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ubicación:</span>
                      <span className="text-foreground">{asset?.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asignado a:</span>
                      <span className="text-foreground">{asset?.assignedTo || 'No asignado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Próximo Mantenimiento:</span>
                      <span className="text-foreground">
                        {asset?.nextMaintenance ? new Date(asset.nextMaintenance)?.toLocaleDateString('es-CO') : 'No programado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Especificaciones</h3>
                  <div className="space-y-3">
                    {Object.entries(specifications)?.map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Descripción</h3>
                <p className="text-muted-foreground">
                  {asset?.description || "Equipo de seguridad de alta tecnología diseñado para operaciones de vigilancia y protección. Incluye características avanzadas de monitoreo y comunicación para garantizar la máxima eficiencia en el campo."}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Historial de Mantenimiento</h3>
                <Button
                  variant="outline"
                  onClick={() => onMaintenance(asset)}
                  iconName="Plus"
                >
                  Programar Mantenimiento
                </Button>
              </div>

              <div className="space-y-4">
                {maintenanceHistory?.map(maintenance => (
                  <div key={maintenance?.id} className="bg-muted rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{maintenance?.type}</h4>
                        <p className="text-sm text-muted-foreground">{maintenance?.description}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(maintenance.date)?.toLocaleDateString('es-CO')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Técnico: {maintenance?.technician}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">Costo: {maintenance?.cost}</span>
                        <span className="px-2 py-1 bg-success text-success-foreground rounded-full text-xs">
                          {maintenance?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Historial de Asignaciones</h3>
                <Button
                  variant="outline"
                  onClick={() => onAssign(asset)}
                  iconName="UserPlus"
                >
                  Nueva Asignación
                </Button>
              </div>

              <div className="space-y-4">
                {assignmentHistory?.map(assignment => (
                  <div key={assignment?.id} className="bg-muted rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{assignment?.assignedTo}</h4>
                        <p className="text-sm text-muted-foreground">{assignment?.position}</p>
                        <p className="text-sm text-muted-foreground">{assignment?.location}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment?.status === 'Activa' ?'bg-success text-success-foreground' :'bg-muted text-muted-foreground'
                      }`}>
                        {assignment?.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Desde: {new Date(assignment.startDate)?.toLocaleDateString('es-CO')}
                      </span>
                      <span>
                        {assignment?.endDate 
                          ? `Hasta: ${new Date(assignment.endDate)?.toLocaleDateString('es-CO')}`
                          : 'En curso'
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Documentos</h3>
                <Button
                  variant="outline"
                  iconName="Upload"
                >
                  Subir Documento
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Manual de Usuario</h4>
                      <p className="text-sm text-muted-foreground">PDF • 2.5 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subido: 15/03/2024</span>
                    <Button variant="ghost" size="sm" iconName="Download" />
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Certificado de Garantía</h4>
                      <p className="text-sm text-muted-foreground">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subido: 15/03/2024</span>
                    <Button variant="ghost" size="sm" iconName="Download" />
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Image" size={20} className="text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Foto del Activo</h4>
                      <p className="text-sm text-muted-foreground">JPG • 3.1 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subido: 20/03/2024</span>
                    <Button variant="ghost" size="sm" iconName="Download" />
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Factura de Compra</h4>
                      <p className="text-sm text-muted-foreground">PDF • 800 KB</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subido: 15/03/2024</span>
                    <Button variant="ghost" size="sm" iconName="Download" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailModal;