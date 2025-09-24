import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CatalogSettingsTab = () => {
  const [selectedCatalog, setSelectedCatalog] = useState('employee-classifications');
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const catalogs = [
    {
      id: 'employee-classifications',
      name: 'Clasificaciones de Empleados',
      description: 'Tipos y categorías de personal de seguridad',
      icon: 'Users',
      count: 8
    },
    {
      id: 'service-categories',
      name: 'Categorías de Servicios',
      description: 'Tipos de servicios de seguridad ofrecidos',
      icon: 'Shield',
      count: 12
    },
    {
      id: 'equipment-types',
      name: 'Tipos de Equipamiento',
      description: 'Categorías de equipos y materiales',
      icon: 'Package',
      count: 15
    },
    {
      id: 'incident-classifications',
      name: 'Clasificaciones de Incidentes',
      description: 'Tipos y severidades de incidentes',
      icon: 'AlertTriangle',
      count: 10
    },
    {
      id: 'contract-types',
      name: 'Tipos de Contratos',
      description: 'Modalidades y categorías contractuales',
      icon: 'FileText',
      count: 6
    },
    {
      id: 'locations',
      name: 'Ubicaciones',
      description: 'Sedes, zonas y puntos de servicio',
      icon: 'MapPin',
      count: 25
    }
  ];

  const catalogData = {
    'employee-classifications': [
      { id: 1, code: 'GS-01', name: 'Guarda de Seguridad Nivel I', description: 'Personal básico de vigilancia', status: 'active', order: 1 },
      { id: 2, code: 'GS-02', name: 'Guarda de Seguridad Nivel II', description: 'Personal con experiencia intermedia', status: 'active', order: 2 },
      { id: 3, code: 'GS-03', name: 'Guarda de Seguridad Nivel III', description: 'Personal especializado', status: 'active', order: 3 },
      { id: 4, code: 'SUP-01', name: 'Supervisor de Zona', description: 'Supervisión de área específica', status: 'active', order: 4 },
      { id: 5, code: 'SUP-02', name: 'Supervisor Regional', description: 'Supervisión de múltiples zonas', status: 'active', order: 5 },
      { id: 6, code: 'ESP-01', name: 'Especialista en Caninos', description: 'Manejo de unidades caninas', status: 'active', order: 6 },
      { id: 7, code: 'ESP-02', name: 'Especialista en Armamento', description: 'Manejo de armas y equipos especiales', status: 'active', order: 7 },
      { id: 8, code: 'ADM-01', name: 'Personal Administrativo', description: 'Apoyo administrativo y logístico', status: 'inactive', order: 8 }
    ],
    'service-categories': [
      { id: 1, code: 'VIG-EST', name: 'Vigilancia Estática', description: 'Vigilancia fija en punto específico', status: 'active', order: 1 },
      { id: 2, code: 'VIG-MOV', name: 'Vigilancia Móvil', description: 'Patrullaje y rondas de seguridad', status: 'active', order: 2 },
      { id: 3, code: 'ESC-PER', name: 'Escolta Personal', description: 'Protección personal ejecutiva', status: 'active', order: 3 },
      { id: 4, code: 'CON-EVE', name: 'Control de Eventos', description: 'Seguridad para eventos masivos', status: 'active', order: 4 }
    ]
  };

  const currentCatalog = catalogs?.find(c => c?.id === selectedCatalog);
  const currentData = catalogData?.[selectedCatalog] || [];

  const filteredData = currentData?.filter(item =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-success/20 text-success`;
    }
    return `${baseClasses} bg-muted/20 text-muted-foreground`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Configuración de Catálogos</h2>
        <p className="text-muted-foreground">Gestiona las clasificaciones y categorías del sistema</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Catalog Selector */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4">Catálogos</h3>
            <div className="space-y-2">
              {catalogs?.map((catalog) => (
                <button
                  key={catalog?.id}
                  onClick={() => setSelectedCatalog(catalog?.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCatalog === catalog?.id 
                      ? 'bg-primary/10 text-primary border-primary/30' :'border-border hover:bg-muted/10'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={catalog?.icon} size={16} />
                    <span className="font-medium text-foreground">{catalog?.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{catalog?.description}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {catalog?.count} elemento(s)
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Content */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Icon name={currentCatalog?.icon} size={20} />
                    <span>{currentCatalog?.name}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{currentCatalog?.description}</p>
                </div>
                <Button 
                  variant="default" 
                  iconName="Plus" 
                  iconPosition="left"
                  onClick={() => setShowAddModal(true)}
                >
                  Agregar Elemento
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-border">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Buscar por nombre o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" iconName="Filter">
                    Filtros
                  </Button>
                  <Button variant="outline" iconName="ArrowUpDown">
                    Ordenar
                  </Button>
                  <Button variant="ghost" iconName="Download">
                    Exportar
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {filteredData?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 font-medium text-foreground">Código</th>
                        <th className="text-left py-3 font-medium text-foreground">Nombre</th>
                        <th className="text-left py-3 font-medium text-foreground">Descripción</th>
                        <th className="text-left py-3 font-medium text-foreground">Estado</th>
                        <th className="text-left py-3 font-medium text-foreground">Orden</th>
                        <th className="text-left py-3 font-medium text-foreground">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData?.map((item) => (
                        <tr key={item?.id} className="border-b border-border hover:bg-muted/10">
                          <td className="py-4">
                            <code className="px-2 py-1 bg-muted/20 rounded text-sm font-mono">
                              {item?.code}
                            </code>
                          </td>
                          <td className="py-4 font-medium text-foreground">{item?.name}</td>
                          <td className="py-4 text-muted-foreground">{item?.description}</td>
                          <td className="py-4">
                            <span className={getStatusBadge(item?.status)}>
                              {item?.status === 'active' ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="py-4 text-muted-foreground">{item?.order}</td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" iconName="Edit">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron elementos</h3>
                  <p className="text-muted-foreground mb-4">
                    No hay elementos que coincidan con tu búsqueda
                  </p>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Limpiar Búsqueda
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                Agregar a {currentCatalog?.name}
              </h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowAddModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <Input
                label="Código"
                type="text"
                placeholder="Ej: GS-04"
                required
              />
              <Input
                label="Nombre"
                type="text"
                placeholder="Nombre del elemento"
                required
              />
              <Input
                label="Descripción"
                type="text"
                placeholder="Descripción detallada"
              />
              <Input
                label="Orden"
                type="number"
                placeholder="Orden de visualización"
                value="1"
              />
              <Select
                label="Estado"
                options={[
                  { value: 'active', label: 'Activo' },
                  { value: 'inactive', label: 'Inactivo' }
                ]}
                value="active"
              />
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button 
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="default">
                Agregar Elemento
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogSettingsTab;