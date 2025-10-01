import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';

import FADashboard from './components/FADashboard';
import FATable from './components/FATable';
import FixedAssetFormModal from './components/FixedAssetFormModal';
import DepreciationRunTool from './components/DepreciationRunTool';
import AssetDisposalModal from './components/AssetDisposalModal';

const mockAssets = [
  { id: 'VEH-001', description: 'Toyota Hilux 4x4', category: 'Vehículos', acquisitionDate: '2023-01-15', cost: 150000000, accumulatedDepreciation: 30000000, bookValue: 120000000, usefulLife: 5, ageInMonths: 12 },
  { id: 'CMP-015', description: 'Laptop Dell XPS 15', category: 'Equipo de Cómputo', acquisitionDate: '2024-05-20', cost: 8500000, accumulatedDepreciation: 1416667, bookValue: 7083333, usefulLife: 3, ageInMonths: 5 },
  { id: 'MAQ-005', description: 'Montacargas Eléctrico', category: 'Maquinaria', acquisitionDate: '2022-11-01', cost: 85000000, accumulatedDepreciation: 28333333, bookValue: 56666667, usefulLife: 10, ageInMonths: 24 },
];

const FixedAssetsTab = () => {
  const [assets, setAssets] = useState(mockAssets);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDepreciationOpen, setIsDepreciationOpen] = useState(false);
  const [isDisposalOpen, setIsDisposalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Contabilidad y Finanzas', path: '/fixed-assets' },
    { label: 'Activos Fijos', path: '/fixed-assets', current: true },
  ];

  const handleOpenDisposal = (asset) => {
    setSelectedAsset(asset);
    setIsDisposalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-foreground">Gestión de Activos Fijos</h2>
            <p className="text-muted-foreground mt-1">Ciclo de vida contable de los activos, desde la adquisición hasta la depreciación.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsDepreciationOpen(true)} iconName="Zap">Ejecutar Depreciación</Button>
            <Button onClick={() => setIsFormOpen(true)} iconName="Plus">Registrar Activo</Button>
          </div>
        </div>
      </div>

      <FADashboard assets={assets} />
      <FATable assets={assets} onDisposal={handleOpenDisposal} />

      <FixedAssetFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={() => {}} />
      <DepreciationRunTool isOpen={isDepreciationOpen} onClose={() => setIsDepreciationOpen(false)} onRun={() => {}} />
      <AssetDisposalModal isOpen={isDisposalOpen} onClose={() => setIsDisposalOpen(false)} onConfirm={() => {}} asset={selectedAsset} />
    </div>
  );
};

export default FixedAssetsTab;