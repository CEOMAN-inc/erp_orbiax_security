import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';

// Componentes del submódulo
import BenefitsDashboard from './components/BenefitsDashboard';
import BenefitsPlanTable from './components/BenefitsPlanTable';
import BenefitPlanModal from './components/BenefitPlanModal';

const mockPlans = [
    { id: 1, name: 'Plan Salud Gold', type: 'Salud', provider: 'Sura', totalCost: 500000, employerPercentage: 70, employerContribution: 350000, employeeContribution: 150000, status: 'Activo' },
    { id: 2, name: 'Seguro de Vida Grupo', type: 'Vida', provider: 'Bolívar', totalCost: 80000, employerPercentage: 100, employerContribution: 80000, employeeContribution: 0, status: 'Activo' },
    { id: 3, name: 'Pensión Voluntaria Plus', type: 'Pensión Voluntaria', provider: 'Protección', totalCost: 200000, employerPercentage: 0, employerContribution: 0, employeeContribution: 200000, status: 'Inactivo' },
];

const BenefitsTab = () => {
    const [plans, setPlans] = useState(mockPlans);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

    const breadcrumbItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Gestión Humana', path: '/benefits' },
        { label: 'Administración de Beneficios', path: '/benefits', current: true },
    ];

    const handleCreatePlan = () => {
        setEditingPlan(null);
        setIsModalOpen(true);
    };

    const handleEditPlan = (plan) => {
        setEditingPlan(plan);
        setIsModalOpen(true);
    };

    const handleSavePlan = (planData) => {
        // Lógica para guardar o actualizar
        console.log("Guardando plan:", planData);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-semibold text-foreground">Administración de Beneficios</h2>
                        <p className="text-muted-foreground mt-1">Gestiona los planes de beneficios para empleados de la compañía.</p>
                    </div>
                    <Button onClick={handleCreatePlan} iconName="Plus">
                        Crear Nuevo Plan de Beneficio
                    </Button>
                </div>
            </div>

            <BenefitsDashboard />
            <BenefitsPlanTable plans={plans} onEdit={handleEditPlan} onToggleStatus={() => {}}/>
            
            <BenefitPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSavePlan} existingPlan={editingPlan} />
        </div>
    );
};

export default BenefitsTab;