import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import ContractsTab from './components/ContractsTab';
import PaymentsTab from './components/PaymentsTab';
import PortfolioReportTab from './components/PortfolioReportTab';
import RenewalsTab from './components/RenewalsTab'; // <-- 1. IMPORTA el nuevo componente

const ContractsAndBillingPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('contracts');

  const tabs = [
    { id: 'contracts', name: 'Gestión de Contratos', icon: 'FilePlus' },
    { id: 'payments', name: 'Seguimiento de Pagos', icon: 'DollarSign' },
    { id: 'portfolio', name: 'Reportes de Cartera', icon: 'PieChart' },
    { id: 'renewals', name: 'Renovaciones', icon: 'RefreshCw' }, // <-- 2. AÑADE la nueva pestaña
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contracts': return <ContractsTab />;
      case 'payments': return <PaymentsTab />;
      case 'portfolio': return <PortfolioReportTab />;
      case 'renewals': return <RenewalsTab />; // <-- 3. AÑADE el renderizado del componente
      default: return <ContractsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <Header isCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="p-6">
          <Breadcrumb />
          <div className="mb-8">
             <h1 className="text-3xl font-bold text-foreground">Contratos y Facturación</h1>
             <p className="text-muted-foreground mt-2">Administra el ciclo de vida financiero y contractual de tus clientes.</p>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="border-b border-border">
              <nav className="flex space-x-2 md:space-x-8 px-6 overflow-x-auto custom-scrollbar" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractsAndBillingPage;