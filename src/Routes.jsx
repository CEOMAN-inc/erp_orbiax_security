import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

// --- Componentes de Página Principales ---
import NotFound from "pages/NotFound";
import Dashboard from "pages/dashboard";
import AssetManagement from "pages/asset-management";
import IncidentReporting from "pages/incident-reporting";
import ServiceOrdersPage from "pages/service-orders";
import RosterCalendar from "pages/roster-calendar";
import AIChatPage from "pages/ai-chat";
import AIPredictionsPage from "pages/ai-predictions";
import SystemConfigurationPage from "pages/system-configuration";
import ContractsAndBillingPage from "pages/contracts-and-billing";
import AccountingAndFinancePage from "pages/accounting-and-finance";

// --- Se importa el ÚNICO componente contenedor para RRHH ---
import HumanResourcesPage from "pages/human-resources";

// --- Páginas de Autenticación ---
import Login from "pages/auth/Login";
import SignUp from "pages/auth/SignUp";
import CompanyLookup from "pages/auth/CompanyLookup";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* --- Módulo de Gestión Humana (HCM) --- */}
      {/* Todas las rutas de RRHH apuntan al mismo componente contenedor */}
      <Route path="/personnel-management" element={<HumanResourcesPage />} />
      <Route path="/payroll" element={<HumanResourcesPage />} />
      <Route path="/time-attendance" element={<HumanResourcesPage />} />
      <Route path="/benefits" element={<HumanResourcesPage />} />
      <Route path="/recruitment" element={<HumanResourcesPage />} />
      <Route path="/performance" element={<HumanResourcesPage />} />
      
      {/* --- Otros Módulos ERP --- */}
      <Route path="/roster-calendar" element={<RosterCalendar />} />
      <Route path="/service-orders" element={<ServiceOrdersPage />} />
      <Route path="/incident-reporting" element={<IncidentReporting />} />
      <Route path="/asset-management" element={<AssetManagement />} />

      {/* --- Módulo de Contratos y Facturación --- */}
      <Route path="/contracts" element={<ContractsAndBillingPage />} />
      <Route path="/payments" element={<ContractsAndBillingPage />} />
      
      {/* --- Módulo de Contabilidad y Finanzas --- */}
      <Route path="/general-ledger" element={<AccountingAndFinancePage />} />
      <Route path="/accounts-payable" element={<AccountingAndFinancePage />} />
      <Route path="/accounts-receivable" element={<AccountingAndFinancePage />} />
      <Route path="/cash-management" element={<AccountingAndFinancePage />} />
      <Route path="/fixed-assets" element={<AccountingAndFinancePage />} />
      <Route path="/budgets" element={<AccountingAndFinancePage />} />
      <Route path="/financial-reports" element={<AccountingAndFinancePage />} />

      {/* --- Módulos de IA y Configuración --- */}
      <Route path="/ai-chat" element={<AIChatPage />} />
      <Route path="/ai-predictions" element={<AIPredictionsPage />} />
      <Route path="/system-configuration" element={<SystemConfigurationPage />} />
      
      {/* --- Rutas de Autenticación --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/company-lookup" element={<CompanyLookup />} />
      
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;