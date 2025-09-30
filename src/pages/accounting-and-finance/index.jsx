import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

// Importa los componentes de las pestañas
import GeneralLedgerTab from './components/GeneralLedgerTab';
import AccountsPayableTab from './components/AccountsPayableTab';
import AccountsReceivableTab from './components/AccountsReceivableTab';
import CashManagementTab from './components/CashManagementTab';
import FixedAssetsTab from './components/FixedAssetsTab';
import BudgetsAndForecastsTab from './components/BudgetsAndForecastsTab';
import FinancialReportsTab from './components/FinancialReportsTab';

const AccountingAndFinancePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('general-ledger');
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'general-ledger', name: 'Libro Mayor', icon: 'BookOpen', path: '/general-ledger' },
    { id: 'accounts-payable', name: 'Cuentas por Pagar', icon: 'ArrowDownCircle', path: '/accounts-payable' },
    { id: 'accounts-receivable', name: 'Cuentas por Cobrar', icon: 'ArrowUpCircle', path: '/accounts-receivable' },
    { id: 'cash-management', name: 'Tesorería', icon: 'Wallet', path: '/cash-management' },
    { id: 'fixed-assets', name: 'Activos Fijos', icon: 'Building', path: '/fixed-assets' },
    { id: 'budgets', name: 'Presupuestos', icon: 'Target', path: '/budgets' },
    { id: 'financial-reports', name: 'Informes Financieros', icon: 'PieChart', path: '/financial-reports' },
  ];

  // Sincroniza la pestaña activa con la URL actual
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname]);

  const handleTabClick = (path) => {
    navigate(path);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general-ledger': return <GeneralLedgerTab />;
      case 'accounts-payable': return <AccountsPayableTab />;
      case 'accounts-receivable': return <AccountsReceivableTab />;
      case 'cash-management': return <CashManagementTab />;
      case 'fixed-assets': return <FixedAssetsTab />;
      case 'budgets': return <BudgetsAndForecastsTab />;
      case 'financial-reports': return <FinancialReportsTab />;
      default: return <GeneralLedgerTab />;
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
             <h1 className="text-3xl font-bold text-foreground">Contabilidad y Finanzas</h1>
             <p className="text-muted-foreground mt-2">Gestión central de todas las transacciones y la salud financiera de la empresa.</p>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="border-b border-border">
              <nav className="flex space-x-2 md:space-x-8 px-6 overflow-x-auto custom-scrollbar" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.path)}
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

export default AccountingAndFinancePage;