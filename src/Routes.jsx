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
import ContractsAndBillingPage from "pages/contracts-and-billing";
import AccountingAndFinancePage from "pages/accounting-and-finance";

// --- Páginas de Autenticación (Opcionales para acceso directo) ---
import Login from "pages/auth/Login";
import SignUp from "pages/auth/SignUp";
import CompanyLookup from "pages/auth/CompanyLookup";


const Routes = () => {
  return (
    <RouterRoutes>
      {/* --- La ruta raíz ahora apunta directamente al Dashboard --- */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* --- Módulos ERP (Acceso Directo) --- */}
      <Route path="/personnel-management" element={<PersonnelManagement />} />
      <Route path="/roster-calendar" element={<RosterCalendar />} />
      <Route path="/service-orders" element={<ServiceOrdersPage />} />
      <Route path="/incident-reporting" element={<IncidentReporting />} />
      <Route path="/asset-management" element={<AssetManagement />} />

      {/* --- Módulo de Contratos y Facturación --- */}
      {/* El componente principal maneja las pestañas internas según la URL */}
      <Route path="/contracts" element={<ContractsAndBillingPage />} />
      <Route path="/payments" element={<ContractsAndBillingPage />} />
      <Route path="/contracts/renewals" element={<ContractsAndBillingPage />} />
      <Route path="/reports/portfolio" element={<ContractsAndBillingPage />} />

      {/* --- Módulo de Contabilidad y Finanzas --- */}
      {/* Todas las rutas de este módulo apuntan a su componente contenedor */}
      <Route path="/general-ledger" element={<AccountingAndFinancePage />} />
      <Route path="/accounts-payable" element={<AccountingAndFinancePage />} />
      <Route path="/accounts-receivable" element={<AccountingAndFinancePage />} />
      <Route path="/cash-management" element={<AccountingAndFinancePage />} />
      <Route path="/fixed-assets" element={<AccountingAndFinancePage />} />
      <Route path="/budgets" element={<AccountingAndFinancePage />} />
      <Route path="/financial-reports" element={<AccountingAndFinancePage />} />

      {/* --- Módulos de IA --- */}
      <Route path="/ai-chat" element={<AIChatPage />} />
      <Route path="/ai-predictions" element={<AIPredictionsPage />} />

      {/* --- Configuración --- */}
      <Route path="/system-configuration" element={<SystemConfigurationPage />} />
      
      {/* --- Rutas de autenticación (se mantienen por si quieres verlas, pero no son requeridas) --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/company-lookup" element={<CompanyLookup />} />
      
      {/* --- Ruta para Páginas No Encontradas (Fallback) --- */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;