import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';
import Input from 'components/ui/Input'; // <-- ESTA ES LA LÍNEA QUE FALTABA

// Importa los componentes del módulo
import CMDashboard from './components/CMDashboard';
import ReconciliationView from './components/ReconciliationView';
import ImportStatementModal from './components/ImportStatementModal';
import CashFlowReport from './components/CashFlowReport';

const CashManagementTab = () => {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('reconciliation'); // 'reconciliation' o 'cashflow'

    const breadcrumbItems = [
        { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
        { label: 'Contabilidad y Finanzas', path: '/cash-management' },
        { label: 'Tesorería', path: '/cash-management', current: true },
    ];
    
    const bankAccountOptions = [
        { value: 'bancolombia-123', label: 'Bancolombia Cta. Ahorros ***123' },
        { value: 'davivienda-456', label: 'Davivienda Cta. Corriente ***456' },
    ];
    
    const periodOptions = [
        { value: '2025-09', label: 'Septiembre 2025' },
        { value: '2025-08', label: 'Agosto 2025' },
    ];

    const handleImport = () => {
        console.log("Procesando extracto...");
        setIsImportModalOpen(false);
    }

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-foreground">Gestión de Tesorería</h2>
                    <p className="text-muted-foreground mt-1">Controla los flujos de efectivo, concilia tus cuentas y gestiona la liquidez.</p>
                </div>
            </div>

            <CMDashboard />

            <div className="border-b border-border">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('reconciliation')}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'reconciliation'
                      ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="RefreshCw" size={16} />
                  <span>Conciliación Bancaria</span>
                </button>
                <button
                  onClick={() => setActiveTab('cashflow')}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'cashflow'
                      ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="ArrowRightLeft" size={16} />
                  <span>Reporte de Flujo de Caja</span>
                </button>
              </nav>
            </div>

            {activeTab === 'reconciliation' && (
                <div>
                    <div className="bg-card p-4 rounded-lg border border-border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <Select label="Seleccionar Cuenta Bancaria" options={bankAccountOptions} />
                            <Select label="Seleccionar Período" options={periodOptions} />
                            <Button variant="outline">Cargar Movimientos</Button>
                        </div>
                    </div>
                    <ReconciliationView onImportClick={() => setIsImportModalOpen(true)} />
                </div>
            )}
            
            {activeTab === 'cashflow' && (
                <div>
                     <div className="bg-card p-4 rounded-lg border border-border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <Input label="Desde" type="date" />
                            <Input label="Hasta" type="date" />
                            <Button variant="outline">Generar Reporte</Button>
                        </div>
                    </div>
                    <CashFlowReport />
                </div>
            )}
            
            <ImportStatementModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImport={handleImport} />
        </div>
    );
};

export default CashManagementTab;