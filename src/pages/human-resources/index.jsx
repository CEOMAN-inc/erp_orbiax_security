import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';

// --- Importación directa de los componentes "Tab" de cada submódulo ---
import EmployeeAdminTab from './employee-admin/EmployeeAdminTab';
import PayrollTab from './payroll/PayrollTab'; 
import TimeAttendanceTab from './time-attendance/TimeAttendanceTab';
import BenefitsTab from './benefits/BenefitsTab';
import RecruitmentTab from './recruitment/RecruitmentTab';
import PerformanceTab from './performance/PerformanceTab';

const HumanResourcesPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const renderSubModuleContent = () => {
    switch (location.pathname) {
      case '/personnel-management':
        return <EmployeeAdminTab />;
      case '/payroll':
        return <PayrollTab />; // Correcto: Llama al componente Tab
      case '/time-attendance':
        return <TimeAttendanceTab />;
      case '/benefits':
        return <BenefitsTab />;
      case '/recruitment':
        return <RecruitmentTab />;
      case '/performance':
        return <PerformanceTab />;
      default:
        return <EmployeeAdminTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <Header isCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="p-6">
          {renderSubModuleContent()}
        </div>
      </main>
    </div>
  );
};

export default HumanResourcesPage;