import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AssetCard from './components/AssetCard';
import AssetTable from './components/AssetTable';
import AssetFilters from './components/AssetFilters';
import AssetDetailModal from './components/AssetDetailModal';
import AssetFormModal from './components/AssetFormModal';
import MaintenanceModal from './components/MaintenanceModal';
import AssignmentModal from './components/AssignmentModal';

const AssetManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    location: '',
    assignment: '',
    maintenance: ''
  });

  // Mock data for assets
  const mockAssets = [
    {
      id: 1,
      name: "Radio Comunicación Motorola",
      code: "RC-001",
      category: "Tecnología",
      status: "Activo",
      location: "Sede Principal",
      assignedTo: "María González",
      nextMaintenance: "2025-01-15",
      description: "Radio de comunicación profesional para operaciones de seguridad",
      brand: "Motorola",
      model: "DP4400",
      serialNumber: "MT240912001"
    },
    {
      id: 2,
      name: "Vehículo Patrulla Toyota",
      code: "VP-002",
      category: "Vehículos",
      status: "En Mantenimiento",
      location: "Almacén Norte",
      assignedTo: null,
      nextMaintenance: "2024-12-20",
      description: "Vehículo patrulla para rondas de seguridad",
      brand: "Toyota",
      model: "Hilux 2024",
      serialNumber: "TY240912002"
    },
    {
      id: 3,
      name: "Chaleco Antibalas Nivel IIIA",
      code: "CA-003",
      category: "Equipos",
      status: "Activo",
      location: "Base Operativa 1",
      assignedTo: "Pedro Martínez",
      nextMaintenance: "2025-03-10",
      description: "Chaleco de protección balística nivel IIIA",
      brand: "SecureTech",
      model: "ST-IIIA-2024",
      serialNumber: "ST240912003"
    },
    {
      id: 4,
      name: "Pistola Glock 17",
      code: "PG-004",
      category: "Armas",
      status: "Activo",
      location: "Sede Principal",
      assignedTo: "Ana Rodríguez",
      nextMaintenance: "2025-02-05",
      description: "Pistola semiautomática calibre 9mm",
      brand: "Glock",
      model: "17 Gen5",
      serialNumber: "GL240912004"
    },
    {
      id: 5,
      name: "Cámara de Vigilancia IP",
      code: "CV-005",
      category: "Tecnología",
      status: "Fuera de Servicio",
      location: "Almacén Sur",
      assignedTo: null,
      nextMaintenance: "2024-11-30",
      description: "Cámara IP de alta resolución para vigilancia",
      brand: "Hikvision",
      model: "DS-2CD2143G0-I",
      serialNumber: "HK240912005"
    },
    {
      id: 6,
      name: "Detector de Metales Portátil",
      code: "DM-006",
      category: "Equipos",
      status: "En Reparación",
      location: "Base Operativa 2",
      assignedTo: null,
      nextMaintenance: "2025-01-20",
      description: "Detector de metales para inspecciones de seguridad",
      brand: "Garrett",
      model: "SuperScanner V",
      serialNumber: "GT240912006"
    },
    {
      id: 7,
      name: "Motocicleta Honda CB190R",
      code: "MH-007",
      category: "Vehículos",
      status: "Activo",
      location: "Base Operativa 1",
      assignedTo: "Carlos López",
      nextMaintenance: "2025-01-25",
      description: "Motocicleta para patrullaje urbano",
      brand: "Honda",
      model: "CB190R",
      serialNumber: "HD240912007"
    },
    {
      id: 8,
      name: "Sistema de Alarma Inalámbrico",
      code: "SA-008",
      category: "Tecnología",
      status: "Activo",
      location: "Sede Principal",
      assignedTo: "Laura Fernández",
      nextMaintenance: "2025-04-15",
      description: "Sistema de alarma inalámbrico para instalaciones",
      brand: "Paradox",
      model: "MG5050",
      serialNumber: "PX240912008"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Mantenimiento Vencido",
      message: "El vehículo VP-002 tiene mantenimiento vencido",
      type: "alert",
      time: "Hace 2 horas",
      read: false
    },
    {
      id: 2,
      title: "Nueva Asignación",
      message: "Radio RC-001 asignado a María González",
      type: "info",
      time: "Hace 4 horas",
      read: false
    }
  ];

  // Filter assets based on active filters
  const filteredAssets = useMemo(() => {
    let filtered = mockAssets;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered?.filter(asset => asset?.category === activeTab);
    }

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(asset =>
        asset?.name?.toLowerCase()?.includes(searchTerm) ||
        asset?.code?.toLowerCase()?.includes(searchTerm) ||
        asset?.description?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(asset => asset?.category === filters?.category);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(asset => asset?.status === filters?.status);
    }

    // Apply location filter
    if (filters?.location) {
      filtered = filtered?.filter(asset => asset?.location === filters?.location);
    }

    // Apply assignment filter
    if (filters?.assignment) {
      if (filters?.assignment === 'assigned') {
        filtered = filtered?.filter(asset => asset?.assignedTo);
      } else if (filters?.assignment === 'unassigned') {
        filtered = filtered?.filter(asset => !asset?.assignedTo);
      }
    }

    // Apply maintenance filter
    if (filters?.maintenance) {
      const now = new Date();
      if (filters?.maintenance === 'overdue') {
        filtered = filtered?.filter(asset => 
          asset?.nextMaintenance && new Date(asset.nextMaintenance) < now
        );
      } else if (filters?.maintenance === 'upcoming') {
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filtered = filtered?.filter(asset => 
          asset?.nextMaintenance && 
          new Date(asset.nextMaintenance) >= now &&
          new Date(asset.nextMaintenance) <= nextWeek
        );
      } else if (filters?.maintenance === 'scheduled') {
        filtered = filtered?.filter(asset => asset?.nextMaintenance);
      }
    }

    return filtered;
  }, [mockAssets, activeTab, filters]);

  // Calculate asset counts for dashboard
  const assetCounts = useMemo(() => {
    const now = new Date();
    return {
      total: mockAssets?.length,
      active: mockAssets?.filter(asset => asset?.status === 'Activo')?.length,
      maintenance: mockAssets?.filter(asset => asset?.status === 'En Mantenimiento')?.length,
      overdue: mockAssets?.filter(asset => 
        asset?.nextMaintenance && new Date(asset.nextMaintenance) < now
      )?.length
    };
  }, [mockAssets]);

  const categoryTabs = [
    { id: 'all', label: 'Todos los Activos', icon: 'Package', count: mockAssets?.length },
    { id: 'Armas', label: 'Armas', icon: 'Shield', count: mockAssets?.filter(a => a?.category === 'Armas')?.length },
    { id: 'Vehículos', label: 'Vehículos', icon: 'Car', count: mockAssets?.filter(a => a?.category === 'Vehículos')?.length },
    { id: 'Equipos', label: 'Equipos', icon: 'HardHat', count: mockAssets?.filter(a => a?.category === 'Equipos')?.length },
    { id: 'Tecnología', label: 'Tecnología', icon: 'Laptop', count: mockAssets?.filter(a => a?.category === 'Tecnología')?.length }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      location: '',
      assignment: '',
      maintenance: ''
    });
  };

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setIsDetailModalOpen(true);
  };

  const handleEditAsset = (asset) => {
    setEditingAsset(asset);
    setIsFormModalOpen(true);
  };

  const handleAddAsset = () => {
    setEditingAsset(null);
    setIsFormModalOpen(true);
  };

  const handleAssignAsset = (asset) => {
    setSelectedAsset(asset);
    setIsAssignmentModalOpen(true);
  };

  const handleScheduleMaintenance = (asset) => {
    setSelectedAsset(asset);
    setIsMaintenanceModalOpen(true);
  };

  const handleSaveAsset = async (assetData) => {
    // Mock save operation
    console.log('Saving asset:', assetData);
    // In real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSaveMaintenance = async (maintenanceData) => {
    // Mock save operation
    console.log('Scheduling maintenance:', maintenanceData);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSaveAssignment = async (assignmentData) => {
    // Mock save operation
    console.log('Creating assignment:', assignmentData);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Bulk action:', action, 'for assets:', selectedIds);
    // Handle bulk actions like assign, maintenance, export
  };

  const handleExport = () => {
    console.log('Exporting assets...');
    // Handle export functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        notifications={notifications}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16 pb-20 lg:pb-8`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Activos</h1>
              <p className="text-muted-foreground">
                Administra y supervisa todos los activos de seguridad de la empresa
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                />
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="Grid3X3"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={handleScheduleMaintenance}
                iconName="Wrench"
              >
                Programar Mantenimiento
              </Button>
              
              <Button
                onClick={handleAddAsset}
                iconName="Plus"
              >
                Agregar Activo
              </Button>
            </div>
          </div>

          {/* Filters */}
          <AssetFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            assetCounts={assetCounts}
            onExport={handleExport}
          />

          {/* Category Tabs */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="flex overflow-x-auto">
              {categoryTabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {tab?.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-foreground">
                {filteredAssets?.length} activos encontrados
              </h2>
              {Object.values(filters)?.some(value => value !== '') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  iconName="X"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Assets Display */}
          {viewMode === 'table' ? (
            <AssetTable
              assets={filteredAssets}
              onEdit={handleEditAsset}
              onAssign={handleAssignAsset}
              onMaintenance={handleScheduleMaintenance}
              onViewDetails={handleViewDetails}
              onBulkAction={handleBulkAction}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssets?.map(asset => (
                <AssetCard
                  key={asset?.id}
                  asset={asset}
                  onEdit={handleEditAsset}
                  onAssign={handleAssignAsset}
                  onMaintenance={handleScheduleMaintenance}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredAssets?.length === 0 && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron activos</h3>
              <p className="text-muted-foreground mb-6">
                No hay activos que coincidan con los filtros seleccionados
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                >
                  Limpiar Filtros
                </Button>
                <Button
                  onClick={handleAddAsset}
                  iconName="Plus"
                >
                  Agregar Primer Activo
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      <AssetDetailModal
        asset={selectedAsset}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAsset(null);
        }}
        onEdit={handleEditAsset}
        onAssign={handleAssignAsset}
        onMaintenance={handleScheduleMaintenance}
      />
      <AssetFormModal
        asset={editingAsset}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingAsset(null);
        }}
        onSave={handleSaveAsset}
      />
      <MaintenanceModal
        asset={selectedAsset}
        isOpen={isMaintenanceModalOpen}
        onClose={() => {
          setIsMaintenanceModalOpen(false);
          setSelectedAsset(null);
        }}
        onSave={handleSaveMaintenance}
      />
      <AssignmentModal
        asset={selectedAsset}
        isOpen={isAssignmentModalOpen}
        onClose={() => {
          setIsAssignmentModalOpen(false);
          setSelectedAsset(null);
        }}
        onSave={handleSaveAssignment}
      />
    </div>
  );
};

export default AssetManagement;