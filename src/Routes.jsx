import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import RosterCalendar from './pages/roster-calendar';
import Dashboard from './pages/dashboard';
import AssetManagement from './pages/asset-management';
import IncidentReporting from './pages/incident-reporting';
import PersonnelManagement from './pages/personnel-management';
import ServiceOrdersPage from './pages/service-orders';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AssetManagement />} />
        <Route path="/roster-calendar" element={<RosterCalendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/asset-management" element={<AssetManagement />} />
        <Route path="/incident-reporting" element={<IncidentReporting />} />
        <Route path="/personnel-management" element={<PersonnelManagement />} />
        <Route path="/service-orders" element={<ServiceOrdersPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
