import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

// --- Componentes de Página Principales ---
import NotFound from "pages/NotFound";
import Dashboard from "pages/dashboard";
import AssetManagement from "pages/asset-management";
import IncidentReporting from "pages/incident-reporting";
import PersonnelManagement from "pages/personnel-management";
import ServiceOrdersPage from "pages/service-orders";
import RosterCalendar from "pages/roster-calendar";
import AIChatPage from "pages/ai-chat";
import AIPredictionsPage from "pages/ai-predictions";
import SystemConfigurationPage from "pages/system-configuration";

// --- Componentes del Módulo de Contratos y Facturación ---
import ContractsAndBillingPage from "pages/contracts-and-billing";
import RenewalsTab from "pages/contracts-and-billing/components/RenewalsTab";
import PaymentsTab from "pages/contracts-and-billing/components/PaymentsTab";
import PortfolioReportTab from "pages/contracts-and-billing/components/PortfolioReportTab";

// --- IMPORTA EL CONTENEDOR PRINCIPAL DE CONTABILIDAD ---
import AccountingAndFinancePage from "pages/accounting-and-finance";


const Routes = () => {
  return (
    <RouterRoutes>
      {/* --- Rutas Generales y Dashboard --- */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* --- Rutas de Módulos ERP --- */}
      <Route path="/personnel-management" element={<PersonnelManagement />} />
      <Route path="/roster-calendar" element={<RosterCalendar />} />
      <Route path="/service-orders" element={<ServiceOrdersPage />} />
      <Route path="/incident-reporting" element={<IncidentReporting />} />
      <Route path="/asset-management" element={<AssetManagement />} />
      
      {/* --- Rutas para Contratos y Facturación --- */}
      <Route path="/contracts" element={<ContractsAndBillingPage />} />
      <Route path="/payments" element={<PaymentsTab />} />
      <Route path="/contracts/renewals" element={<RenewalsTab />} />
      <Route path="/reports/portfolio" element={<PortfolioReportTab />} />

      {/* --- Rutas de Contabilidad y Finanzas --- */}
      {/* Todas apuntan al mismo componente contenedor */}
      <Route path="/general-ledger" element={<AccountingAndFinancePage />} />
      <Route path="/accounts-payable" element={<AccountingAndFinancePage />} />
      <Route path="/accounts-receivable" element={<AccountingAndFinancePage />} />
      <Route path="/cash-management" element={<AccountingAndFinancePage />} />
      <Route path="/fixed-assets" element={<AccountingAndFinancePage />} />
      <Route path="/budgets" element={<AccountingAndFinancePage />} />
      <Route path="/financial-reports" element={<AccountingAndFinancePage />} />

      {/* --- Rutas de Inteligencia Artificial --- */}
      <Route path="/ai-chat" element={<AIChatPage />} />
      <Route path="/ai-predictions" element={<AIPredictionsPage />} />

      {/* --- Ruta de Configuración --- */}
      <Route path="/system-configuration" element={<SystemConfigurationPage />} />
      
      {/* --- Ruta para Páginas No Encontradas (Fallback) --- */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;