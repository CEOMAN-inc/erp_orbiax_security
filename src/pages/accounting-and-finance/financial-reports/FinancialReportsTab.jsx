import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';
import Input from 'components/ui/Input';

// Importar los nuevos componentes de informes
import ProfitAndLoss from './components/ProfitAndLoss';
import BalanceSheet from './components/BalanceSheet';
import CashFlowStatement from './components/CashFlowStatement';

// Mock Data: Saldos finales de las cuentas del Libro Mayor para el período
const mockAccountBalances = [
    { account: '4135 - Ingresos por Ventas', balance: 265000000 },
    { account: '6135 - Costo de Ventas', balance: 110000000 },
    { account: '5105 - Gastos de Personal', balance: 91000000 },
    { account: '5135 - Servicios Públicos', balance: 14500000 },
    { account: '5120 - Arrendamientos', balance: 25000000 },
    { account: '1105 - Caja', balance: 5300000 },
    { account: '1110 - Bancos', balance: 253000000 },
    { account: '1305 - Clientes (Cuentas por Cobrar)', balance: 85000000 },
    { account: '1540 - Flota y Equipo de Transporte', balance: 120000000 },
    { account: '2205 - Proveedores Nacionales (Cuentas por Pagar)', balance: 45000000 },
    { account: '2105 - Obligaciones Financieras', balance: 75000000 },
    { account: '3115 - Capital Social', balance: 250000000 },
    { account: '3605 - Utilidad del Ejercicio', balance: 24500000 }, // Calculada del P&L
];


const FinancialReportsTab = () => {
    const [activeTab, setActiveTab] = useState('p&l'); // p&l, balance, cashflow
    
    const breadcrumbItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Contabilidad y Finanzas', path: '/financial-reports' },
        { label: 'Informes Financieros', path: '/financial-reports', current: true },
    ];

    const renderReport = () => {
        switch(activeTab) {
            case 'p&l':
                return <ProfitAndLoss data={mockAccountBalances} />;
            case 'balance':
                return <BalanceSheet data={mockAccountBalances} />;
            case 'cashflow':
                return <CashFlowStatement />;
            default:
                return null;
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">Informes Financieros</h2>
                        <p className="text-muted-foreground mt-1">Genera y analiza los estados financieros clave de la empresa.</p>
                    </div>
                     <Button variant="outline" iconName="Download">Exportar Todos los Informes</Button>
                </div>
            </div>

             <div className="bg-card p-4 rounded-lg border border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <Input label="Fecha de Inicio" type="date" defaultValue="2025-01-01" />
                    <Input label="Fecha de Fin" type="date" defaultValue="2025-09-30" />
                    <Select label="Comparar con" options={[{value: 'prev_period', label: 'Período Anterior'}, {value: 'prev_year', label: 'Mismo Período Año Anterior'}]} />
                </div>
            </div>

            <div className="border-b border-border">
              <nav className="flex space-x-8">
                <button onClick={() => setActiveTab('p&l')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'p&l' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><Icon name="FileText" /><span>Estado de Resultados</span></button>
                <button onClick={() => setActiveTab('balance')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'balance' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><Icon name="Scale" /><span>Balance General</span></button>
                <button onClick={() => setActiveTab('cashflow')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'cashflow' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><Icon name="ArrowRightLeft" /><span>Estado de Flujo de Efectivo</span></button>
              </nav>
            </div>

            <div>
                {renderReport()}
            </div>
        </div>
    );
};

export default FinancialReportsTab;