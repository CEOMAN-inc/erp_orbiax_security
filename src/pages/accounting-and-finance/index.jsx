import React, { useState } from 'react';
// No necesitamos useLocation ni useNavigate para gestionar pestañas aquí.
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
// Eliminamos Breadcrumb global, cada submódulo tendrá el suyo.

// Importa los componentes de las pestañas desde sus nuevas ubicaciones
import GeneralLedgerTab from './general-ledger/GeneralLedgerTab';
import AccountsPayableTab from './accounts-payable/AccountsPayableTab';
import AccountsReceivableTab from './accounts-receivable/AccountsReceivableTab';
import CashManagementTab from './cash-management/CashManagementTab';
import FixedAssetsTab from './fixed-assets/FixedAssetsTab';
import BudgetsAndForecastsTab from './budgets/BudgetsAndForecastsTab';
import FinancialReportsTab from './financial-reports/FinancialReportsTab';

// Importamos 'Outlet' de react-router-dom para renderizar las rutas anidadas
import { Outlet, useLocation } from 'react-router-dom';

const AccountingAndFinancePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Función para renderizar el componente de la sub-ruta según la URL
  const renderSubModuleContent = () => {
    switch (location.pathname) {
      case '/general-ledger': return <GeneralLedgerTab />;
      case '/accounts-payable': return <AccountsPayableTab />;
      case '/accounts-receivable': return <AccountsReceivableTab />;
      case '/cash-management': return <CashManagementTab />;
      case '/fixed-assets': return <FixedAssetsTab />;
      case '/budgets': return <BudgetsAndForecastsTab />;
      case '/financial-reports': return <FinancialReportsTab />;
      default: return <GeneralLedgerTab />; // Fallback por si la ruta no coincide
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <Header isCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="p-6">
          {/* El título principal del módulo Contabilidad y Finanzas */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Contabilidad y Finanzas</h1>
            <p className="text-muted-foreground mt-2">Gestión central de todas las transacciones y la salud financiera de la empresa.</p>
          </div>

          {/* Aquí se renderizará el contenido del submódulo activo */}
          {renderSubModuleContent()}
        </div>
      </main>
    </div>
  );
};

export default AccountingAndFinancePage;