import React from "react";
// import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom"; // Línea antigua
import { Routes as RouterRoutes, Route } from "react-router-dom"; // Línea nueva

// Layouts y Rutas Protegidas
import ProtectedRoute from "components/ProtectedRoute";
import AuthLayout from "pages/auth/AuthLayout";

// Componentes de Página
import NotFound from "pages/NotFound";
import CompanyLookup from "pages/auth/CompanyLookup";
import LoginPage from "pages/auth/Login";
import SignUpPage from "pages/auth/SignUp";
import Dashboard from './pages/dashboard';
import AssetManagement from './pages/asset-management';
// La siguiente línea es la que corregimos
import IncidentReporting from './pages/incident-reporting'; // <-- CORREGIDO
import PersonnelManagement from './pages/personnel-management';
import ServiceOrdersPage from './pages/service-orders';
import RosterCalendar from './pages/roster-calendar';
import AIChatPage from './pages/ai-chat';
import AIPredictionsPage from './pages/ai-predictions';

const Routes = () => {
  return (
    // <BrowserRouter> // ELIMINADO
      <RouterRoutes>
        {/* Rutas Públicas de Autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<CompanyLookup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        
        {/* Rutas Privadas del ERP */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/asset-management" element={<AssetManagement />} />
          <Route path="/incident-reporting" element={<IncidentReporting />} />
          <Route path="/personnel-management" element={<PersonnelManagement />} />
          <Route path="/service-orders" element={<ServiceOrdersPage />} />
          <Route path="/roster-calendar" element={<RosterCalendar />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="/ai-predictions" element={<AIPredictionsPage />} />
          {/* Aquí irán las futuras rutas protegidas como /contracts, /attendance, etc. */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    // </BrowserRouter> // ELIMINADO
  );
};

export default Routes;