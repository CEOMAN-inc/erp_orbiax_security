import React, { useState, useMemo } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

// Importar los componentes del módulo
import BudgetsDashboard from './components/BudgetsDashboard';
import BudgetEditor from './components/BudgetEditor';
import BudgetVsActualReport from './components/BudgetVsActualReport';
import BudgetManagerModal from './components/BudgetManagerModal';

// Mock Data: En una app real, esto vendría de la API
const mockComparisonData = {
    'ytd': [
        { account: '4135 - Ingresos por Ventas', type: 'Ingreso', budgeted: 250000000, actual: 265000000 },
        { account: '5105 - Gastos de Personal', type: 'Gasto', budgeted: 85000000, actual: 91000000 },
        { account: '5135 - Servicios Públicos', type: 'Gasto', budgeted: 15000000, actual: 14500000 },
        { account: '5120 - Arrendamientos', type: 'Gasto', budgeted: 25000000, actual: 25000000 },
    ],
    'sep': [
        { account: '4135 - Ingresos por Ventas', type: 'Ingreso', budgeted: 21000000, actual: 23500000 },
        { account: '5105 - Gastos de Personal', type: 'Gasto', budgeted: 7100000, actual: 7500000 },
        { account: '5135 - Servicios Públicos', type: 'Gasto', budgeted: 1250000, actual: 1300000 },
        { account: '5120 - Arrendamientos', type: 'Gasto', budgeted: 2100000, actual: 2100000 },
    ]
};

const mockBudgetEditorData = [
    { account: '4135 - Ingresos por Ventas', monthly: Array(12).fill(21000000) },
    { account: '5105 - Gastos de Personal', monthly: Array(12).fill(7100000) },
    { account: '5135 - Servicios Públicos', monthly: Array(12).fill(1250000) },
    { account: '5120 - Arrendamientos', monthly: Array(12).fill(2100000) },
];


const BudgetsAndForecastsTab = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isManagerOpen, setIsManagerOpen] = useState(false);
    
    // --- LÓGICA DE FILTROS AÑADIDA ---
    const [filters, setFilters] = useState({
        budgetVersion: 'v1',
        period: 'ytd'
    });
    const [reportData, setReportData] = useState(mockComparisonData['ytd']);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleGenerateReport = () => {
        console.log("Generando reporte con filtros:", filters);
        // Simulación: Cambiamos los datos del reporte según el período seleccionado
        setReportData(mockComparisonData[filters.period] || []);
        alert(`Reporte generado para el período: ${filters.period === 'ytd' ? 'Acumulado del Año' : 'Septiembre 2025'}`);
    };
    // --- FIN DE LA LÓGICA DE FILTROS ---

    const breadcrumbItems = [
        { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
        { label: 'Contabilidad y Finanzas', path: '/budgets' },
        { label: 'Presupuestos y Previsiones', path: '/budgets', current: true },
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-semibold text-foreground">Presupuestos y Previsiones</h2>
                        <p className="text-muted-foreground mt-1">Crea presupuestos, compáralos con resultados reales y genera previsiones.</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button variant="outline" onClick={() => setIsManagerOpen(true)} iconName="Users">Gestionar Versiones</Button>
                        <Button onClick={() => setIsEditorOpen(true)} iconName="Edit">Editar Presupuesto Actual</Button>
                    </div>
                </div>
            </div>

            <BudgetsDashboard data={reportData} />
            
            <div className="bg-card p-4 rounded-lg border border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <Select 
                        label="Versión del Presupuesto" 
                        options={[{value: 'v1', label: 'Presupuesto 2025 - Aprobado'}]}
                        value={filters.budgetVersion}
                        onChange={(value) => handleFilterChange('budgetVersion', value)}
                    />
                    <Select 
                        label="Período de Comparación" 
                        options={[{value: 'ytd', label: 'Acumulado del Año (YTD)'}, {value: 'sep', label: 'Septiembre 2025'}]}
                        value={filters.period}
                        onChange={(value) => handleFilterChange('period', value)}
                    />
                    <Button variant="outline" onClick={handleGenerateReport}>Generar Reporte</Button>
                </div>
            </div>

            <BudgetVsActualReport data={reportData} />

            <BudgetEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={() => setIsEditorOpen(false)} budgetData={mockBudgetEditorData} />
            <BudgetManagerModal isOpen={isManagerOpen} onClose={() => setIsManagerOpen(false)} />
        </div>
    );
};

export default BudgetsAndForecastsTab;