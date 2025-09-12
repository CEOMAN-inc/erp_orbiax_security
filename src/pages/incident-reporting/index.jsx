import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import IncidentCard from './components/IncidentCard';
import IncidentFilters from './components/IncidentFilters';
import IncidentSummary from './components/IncidentSummary';
import IncidentModal from './components/IncidentModal';
import CreateIncidentModal from './components/CreateIncidentModal';

const IncidentReporting = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-2024-001',
      title: 'Intrusión no autorizada en área restringida',
      description: 'Se detectó una persona no autorizada intentando acceder al área de servidores del edificio principal. El individuo fue interceptado por el guardia de turno antes de lograr el acceso.',
      severity: 'critical',
      status: 'in-progress',
      type: 'security',
      location: 'Edificio Principal - Piso 3, Área de Servidores',
      reportedBy: 'Carlos Mendoza',
      assignedTo: 'Ana García',
      reportedAt: new Date('2024-12-12T14:30:00')?.toISOString(),
      evidenceCount: 3,
      resolutionTime: null,
      evidence: [
        {
          id: 1,
          name: 'camara_seguridad_001.mp4',
          size: 15728640,
          type: 'video/mp4',
          uploadedAt: new Date('2024-12-12T14:35:00')?.toISOString()
        },
        {
          id: 2,
          name: 'foto_sospechoso.jpg',
          size: 2097152,
          type: 'image/jpeg',
          uploadedAt: new Date('2024-12-12T14:40:00')?.toISOString()
        }
      ],
      witnessStatement: 'El guardia Carlos Mendoza reporta haber visto al individuo merodeando por el área durante aproximadamente 10 minutos antes de intentar forzar la puerta.',
      timeline: [
        {
          id: 1,
          type: 'created',
          description: 'Incidente reportado',
          user: 'Carlos Mendoza',
          timestamp: new Date('2024-12-12T14:30:00')?.toISOString()
        },
        {
          id: 2,
          type: 'assigned',
          description: 'Asignado a Ana García',
          user: 'Sistema',
          timestamp: new Date('2024-12-12T14:35:00')?.toISOString()
        }
      ]
    },
    {
      id: 'INC-2024-002',
      title: 'Falla en sistema de alarma contra incendios',
      description: 'El sistema de alarma contra incendios del sector B presentó una falla técnica, activándose sin causa aparente y generando evacuación innecesaria.',
      severity: 'high',
      status: 'resolved',
      type: 'equipment',
      location: 'Edificio B - Todos los pisos',
      reportedBy: 'María López',
      assignedTo: 'Roberto Silva',
      reportedAt: new Date('2024-12-11T09:15:00')?.toISOString(),
      evidenceCount: 2,
      resolutionTime: 4.5,
      evidence: [
        {
          id: 3,
          name: 'reporte_tecnico_alarma.pdf',
          size: 1048576,
          type: 'application/pdf',
          uploadedAt: new Date('2024-12-11T11:20:00')?.toISOString()
        }
      ],
      resolutionNotes: 'Se identificó un sensor defectuoso en el piso 2. Se reemplazó el componente y se realizaron pruebas de funcionamiento. Sistema operativo normalmente.'
    },
    {
      id: 'INC-2024-003',
      title: 'Conflicto entre empleados en área de trabajo',
      description: 'Se reportó una discusión acalorada entre dos empleados del departamento de contabilidad que requirió intervención de seguridad.',
      severity: 'medium',
      status: 'closed',
      type: 'personnel',
      location: 'Oficinas Administrativas - Piso 2',
      reportedBy: 'Luis Ramírez',
      assignedTo: 'Patricia Morales',
      reportedAt: new Date('2024-12-10T16:45:00')?.toISOString(),
      evidenceCount: 1,
      resolutionTime: 2.0,
      witnessStatement: 'Varios empleados del área confirmaron que la discusión se originó por diferencias en la metodología de trabajo. No hubo agresión física.'
    },
    {
      id: 'INC-2024-004',
      title: 'Vehículo sospechoso en estacionamiento',
      description: 'Se observó un vehículo sin identificación permaneciendo en el estacionamiento por más de 4 horas sin autorización.',
      severity: 'low',
      status: 'open',
      type: 'security',
      location: 'Estacionamiento Principal - Zona C',
      reportedBy: 'Diego Torres',
      assignedTo: null,
      reportedAt: new Date('2024-12-12T11:20:00')?.toISOString(),
      evidenceCount: 2,
      resolutionTime: null
    },
    {
      id: 'INC-2024-005',
      title: 'Derrame de líquido en área de producción',
      description: 'Se produjo un derrame de líquido industrial en el área de producción que requirió limpieza especializada y evaluación de seguridad.',
      severity: 'high',
      status: 'in-progress',
      type: 'safety',
      location: 'Planta de Producción - Línea 2',
      reportedBy: 'Carmen Ruiz',
      assignedTo: 'Miguel Herrera',
      reportedAt: new Date('2024-12-12T08:30:00')?.toISOString(),
      evidenceCount: 4,
      resolutionTime: null
    }
  ]);

  const [filters, setFilters] = useState({
    severity: '',
    status: '',
    type: '',
    assignedTo: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  // Mock personnel options
  const personnelOptions = [
    { value: 'ana-garcia', label: 'Ana García' },
    { value: 'roberto-silva', label: 'Roberto Silva' },
    { value: 'patricia-morales', label: 'Patricia Morales' },
    { value: 'miguel-herrera', label: 'Miguel Herrera' },
    { value: 'carlos-mendoza', label: 'Carlos Mendoza' },
    { value: 'maria-lopez', label: 'María López' }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Nuevo incidente crítico',
      message: 'Intrusión detectada en área restringida',
      type: 'incident',
      time: 'Hace 5 min',
      read: false
    },
    {
      id: 2,
      title: 'Incidente resuelto',
      message: 'Falla en sistema de alarma solucionada',
      type: 'success',
      time: 'Hace 1 hora',
      read: true
    }
  ];

  // Filter incidents based on current filters
  const filteredIncidents = useMemo(() => {
    return incidents?.filter(incident => {
      // Severity filter
      if (filters?.severity && incident?.severity !== filters?.severity) {
        return false;
      }

      // Status filter
      if (filters?.status && incident?.status !== filters?.status) {
        return false;
      }

      // Type filter
      if (filters?.type && incident?.type !== filters?.type) {
        return false;
      }

      // Assigned to filter
      if (filters?.assignedTo) {
        if (filters?.assignedTo === 'unassigned' && incident?.assignedTo) {
          return false;
        }
        if (filters?.assignedTo !== 'unassigned' && incident?.assignedTo !== filters?.assignedTo) {
          return false;
        }
      }

      // Date range filter
      if (filters?.dateFrom) {
        const incidentDate = new Date(incident.reportedAt);
        const fromDate = new Date(filters.dateFrom);
        if (incidentDate < fromDate) {
          return false;
        }
      }

      if (filters?.dateTo) {
        const incidentDate = new Date(incident.reportedAt);
        const toDate = new Date(filters.dateTo);
        toDate?.setHours(23, 59, 59, 999); // End of day
        if (incidentDate > toDate) {
          return false;
        }
      }

      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        const searchableText = `${incident?.title} ${incident?.description} ${incident?.location} ${incident?.reportedBy}`?.toLowerCase();
        if (!searchableText?.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [incidents, filters]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
    setIsIncidentModalOpen(true);
  };

  const handleUpdateStatus = (incident) => {
    setSelectedIncident(incident);
    setIsIncidentModalOpen(true);
  };

  const handleSaveIncident = (updatedIncident) => {
    setIncidents(prev => 
      prev?.map(incident => 
        incident?.id === updatedIncident?.id ? updatedIncident : incident
      )
    );
    setIsIncidentModalOpen(false);
    setSelectedIncident(null);
  };

  const handleCreateIncident = (newIncident) => {
    setIncidents(prev => [newIncident, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      severity: '',
      status: '',
      type: '',
      assignedTo: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
  };

  const handleBulkStatusUpdate = (status) => {
    if (selectedIncidents?.length === 0) return;

    setIncidents(prev =>
      prev?.map(incident =>
        selectedIncidents?.includes(incident?.id)
          ? { ...incident, status, updatedAt: new Date()?.toISOString() }
          : incident
      )
    );
    setSelectedIncidents([]);
  };

  const handleExportData = () => {
    const dataToExport = filteredIncidents?.map(incident => ({
      ID: incident?.id,
      Título: incident?.title,
      Severidad: incident?.severity,
      Estado: incident?.status,
      Tipo: incident?.type,
      Ubicación: incident?.location,
      'Reportado por': incident?.reportedBy,
      'Asignado a': incident?.assignedTo || 'Sin asignar',
      'Fecha de reporte': new Date(incident.reportedAt)?.toLocaleString('es-CO'),
      'Tiempo de resolución': incident?.resolutionTime ? `${incident?.resolutionTime}h` : 'Pendiente'
    }));

    const csvContent = [
      Object.keys(dataToExport?.[0])?.join(','),
      ...dataToExport?.map(row => Object.values(row)?.join(','))
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incidentes_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleIncidentSelection = (incidentId, isSelected) => {
    if (isSelected) {
      setSelectedIncidents(prev => [...prev, incidentId]);
    } else {
      setSelectedIncidents(prev => prev?.filter(id => id !== incidentId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedIncidents(filteredIncidents?.map(incident => incident?.id));
    } else {
      setSelectedIncidents([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
        notifications={notifications}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16 pb-20 lg:pb-6`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reporte de Incidentes</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona y da seguimiento a todos los incidentes de seguridad
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
              >
                Exportar
              </Button>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Reportar Incidente
              </Button>
            </div>
          </div>

          {/* Summary Dashboard */}
          <IncidentSummary incidents={filteredIncidents} />

          {/* Filters */}
          <IncidentFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            personnelOptions={personnelOptions}
          />

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <span className="text-sm text-muted-foreground">
                {filteredIncidents?.length} incidente{filteredIncidents?.length !== 1 ? 's' : ''} encontrado{filteredIncidents?.length !== 1 ? 's' : ''}
              </span>
              
              {selectedIncidents?.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-foreground">
                    {selectedIncidents?.length} seleccionado{selectedIncidents?.length !== 1 ? 's' : ''}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkStatusUpdate('in-progress')}
                  >
                    Marcar en Progreso
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkStatusUpdate('resolved')}
                  >
                    Marcar Resuelto
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
                iconName="Grid3X3"
              />
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                iconName="List"
              />
            </div>
          </div>

          {/* Incidents List */}
          {filteredIncidents?.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="AlertTriangle" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No se encontraron incidentes
              </h3>
              <p className="text-muted-foreground mb-6">
                {Object.values(filters)?.some(f => f) 
                  ? 'Intenta ajustar los filtros para ver más resultados'
                  : 'Aún no hay incidentes reportados'
                }
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Reportar Primer Incidente
              </Button>
            </div>
          ) : (
            <>
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredIncidents?.map(incident => (
                    <IncidentCard
                      key={incident?.id}
                      incident={incident}
                      onViewDetails={handleViewDetails}
                      onUpdateStatus={handleUpdateStatus}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={selectedIncidents?.length === filteredIncidents?.length}
                              onChange={(e) => handleSelectAll(e?.target?.checked)}
                              className="rounded border-border"
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Título</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Severidad</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Estado</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Asignado</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Fecha</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredIncidents?.map(incident => (
                          <tr key={incident?.id} className="border-b border-border hover:bg-muted/50">
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={selectedIncidents?.includes(incident?.id)}
                                onChange={(e) => handleIncidentSelection(incident?.id, e?.target?.checked)}
                                className="rounded border-border"
                              />
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">#{incident?.id}</td>
                            <td className="px-4 py-3">
                              <div className="max-w-xs">
                                <p className="text-sm font-medium text-foreground truncate">{incident?.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{incident?.location}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                incident?.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                                incident?.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                incident?.severity === 'medium'? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                              }`}>
                                {incident?.severity?.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                incident?.status === 'open' ? 'bg-red-500/20 text-red-400' :
                                incident?.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                                incident?.status === 'resolved'? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                              }`}>
                                {incident?.status === 'in-progress' ? 'EN PROGRESO' : 
                                 incident?.status === 'resolved' ? 'RESUELTO' :
                                 incident?.status === 'closed' ? 'CERRADO' : 'ABIERTO'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">
                              {incident?.assignedTo || 'Sin asignar'}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {new Date(incident.reportedAt)?.toLocaleDateString('es-CO')}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewDetails(incident)}
                                >
                                  Ver
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUpdateStatus(incident)}
                                >
                                  Editar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      {/* Modals */}
      <IncidentModal
        incident={selectedIncident}
        isOpen={isIncidentModalOpen}
        onClose={() => {
          setIsIncidentModalOpen(false);
          setSelectedIncident(null);
        }}
        onSave={handleSaveIncident}
        personnelOptions={personnelOptions}
      />
      <CreateIncidentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateIncident}
        personnelOptions={personnelOptions}
      />
    </div>
  );
};

export default IncidentReporting;