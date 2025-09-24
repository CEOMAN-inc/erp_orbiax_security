import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import UserManagementTab from './components/UserManagementTab';
import RoleConfigurationTab from './components/RoleConfigurationTab';
import CatalogSettingsTab from './components/CatalogSettingsTab';
import NotificationRulesTab from './components/NotificationRulesTab';
import SystemPreferencesTab from './components/SystemPreferencesTab';
import AuditTrailTab from './components/AuditTrailTab';

const SystemConfigurationPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', name: 'Usuarios', icon: 'Users' },
    { id: 'roles', name: 'Roles', icon: 'Shield' },
    { id: 'catalogs', name: 'Catálogos', icon: 'Database' },
    { id: 'notifications', name: 'Notificaciones', icon: 'Bell' },
    { id: 'preferences', name: 'Preferencias', icon: 'Settings' },
    { id: 'audit', name: 'Auditoría', icon: 'FileText' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users': return <UserManagementTab />;
      case 'roles': return <RoleConfigurationTab />;
      case 'catalogs': return <CatalogSettingsTab />;
      case 'notifications': return <NotificationRulesTab />;
      case 'preferences': return <SystemPreferencesTab />;
      case 'audit': return <AuditTrailTab />;
      default: return <UserManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <Header
          isCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="p-6">
          <Breadcrumb />
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={28} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
                <p className="text-muted-foreground">
                  Administra las opciones globales, usuarios y seguridad del ERP.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="border-b border-border">
              <nav className="flex space-x-2 md:space-x-8 px-6 overflow-x-auto custom-scrollbar" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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

export default SystemConfigurationPage;