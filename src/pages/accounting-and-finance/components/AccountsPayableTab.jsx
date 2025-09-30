import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';

const AccountsPayablePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <Header isCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="p-6">
          <Breadcrumb />
          <div className="mb-8">
             <h1 className="text-3xl font-bold text-foreground">Cuentas por Pagar (AP)</h1>
             <p className="text-muted-foreground mt-2">Gestión del proceso de pago a proveedores.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground">Contenido de Cuentas por Pagar próximamente.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountsPayablePage;