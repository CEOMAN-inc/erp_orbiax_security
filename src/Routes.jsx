import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

// Componentes de Página
import NotFound from "pages/NotFound";
import Dashboard from "./pages/dashboard";
import AssetManagement from "./pages/asset-management";
import IncidentReporting from "./pages/incident-reporting";
import PersonnelManagement from "./pages/personnel-management";
import ServiceOrdersPage from "./pages/service-orders";
import RosterCalendar from "./pages/roster-calendar";
import AIChatPage from "./pages/ai-chat";
import AIPredictionsPage from "./pages/ai-predictions";
import SystemConfigurationPage from "./pages/system-configuration";
import ContractsPage from "./pages/contracts-and-billing/components/ContractsTab";
import PaymentsPage from "./pages/contracts-and-billing/components/PaymentsTab";

const RenewalsPage = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">Renovaciones de Contratos</h1>
    <p className="mt-2">Próximamente: Vista para gestionar contratos por renovar.</p>
  </div>
);

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Acceso directo al Dashboard y demás páginas sin login */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/asset-management" element={<AssetManagement />} />
      <Route path="/incident-reporting" element={<IncidentReporting />} />
      <Route path="/personnel-management" element={<PersonnelManagement />} />
      <Route path="/service-orders" element={<ServiceOrdersPage />} />
      <Route path="/roster-calendar" element={<RosterCalendar />} />
      <Route path="/ai-chat" element={<AIChatPage />} />
      <Route path="/ai-predictions" element={<AIPredictionsPage />} />
      <Route path="/system-configuration" element={<SystemConfigurationPage />} />
      {/* --- Rutas para Contratos y Facturación --- */}
      <Route path="/contracts" element={<ContractsPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/contracts" element={<RenewalsPage />} />
      
      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
