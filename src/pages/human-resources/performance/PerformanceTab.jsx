import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

// Importar todos los componentes del submódulo
import PerformanceDashboard from './components/PerformanceDashboard';
import GoalSettingView from './components/GoalSettingView';
import PerformanceReviewForm from './components/PerformanceReviewForm'; // <-- NUEVA IMPORTACIÓN
import DevelopmentPlanView from './components/DevelopmentPlanView';   // <-- NUEVA IMPORTACIÓN

const PerformanceTab = () => {
    const [userRole, setUserRole] = useState('supervisor'); // Cambia a 'supervisor' para ver la otra vista
    const [activeTab, setActiveTab] = useState('goals');

    const breadcrumbItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Gestión Humana', path: '/performance' },
        { label: 'Gestión del Desempeño', path: '/performance', current: true },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'goals':
                return <GoalSettingView />;
            case 'reviews':
                 return <PerformanceReviewForm />; // <-- COMPONENTE INTEGRADO
            case 'pdi':
                 return <DevelopmentPlanView />;   // <-- COMPONENTE INTEGRADO
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-semibold text-foreground">Gestión del Desempeño</h2>
                    <p className="text-muted-foreground mt-1">Establece objetivos, realiza evaluaciones y gestiona planes de desarrollo.</p>
                </div>
            </div>

            <PerformanceDashboard userRole={userRole} />

            <div className="border-b border-border">
                <nav className="flex space-x-8">
                    <button onClick={() => setActiveTab('goals')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'goals' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><Icon name="Target" /><span>Objetivos</span></button>
                    <button onClick={() => setActiveTab('reviews')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><Icon name="ClipboardCheck" /><span>Evaluaciones</span></button>
                    <button onClick={() => setActiveTab('pdi')} className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'pdi' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><Icon name="TrendingUp" /><span>Planes de Desarrollo</span></button>
                </nav>
            </div>

            {renderContent()}
        </div>
    );
};

export default PerformanceTab;