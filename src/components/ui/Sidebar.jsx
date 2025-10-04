import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const navigationSections = useMemo(() => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
      type: 'single'
    },
    // --- SECCIÓN DE GESTIÓN HUMANA ACTUALIZADA ---
    {
      id: 'gestion-humana',
      label: 'Recursos Humanos',
      icon: 'Users',
      type: 'group',
      items: [
        { id: 'employee-admin', label: 'Administración de Personal', icon: 'UserCog', path: '/personnel-management' },
        { id: 'payroll', label: 'Gestión de Nóminas', icon: 'Calculator', path: '/payroll' },
        { id: 'time-attendance', label: 'Tiempos y Asistencias', icon: 'Clock', path: '/time-attendance' },
        { id: 'benefits', label: 'Administración de Beneficios', icon: 'Gift', path: '/benefits' },
        { id: 'recruitment', label: 'Reclutamiento', icon: 'UserPlus', path: '/recruitment' },
        { id: 'performance', label: 'Gestión del Desempeño', icon: 'TrendingUp', path: '/performance' }
      ]
    },
    {
      id: 'asignacion-servicios',
      label: 'Asignación de Servicios',
      icon: 'ClipboardList',
      type: 'group',
      items: [
        { id: 'service-orders', label: 'Órdenes de Servicio', icon: 'ClipboardList', path: '/service-orders' },
        { id: 'roster-calendar', label: 'Horarios y Turnos', icon: 'Calendar', path: '/roster-calendar' },
      ]
    },
    {
      id: 'control-operaciones',
      label: 'Control de Operaciones',
      icon: 'Shield',
      type: 'group',
      items: [
        { id: 'incident-reporting', label: 'Alertas e Incidentes', icon: 'AlertTriangle', path: '/incident-reporting' },
        { id: 'asset-management', label: 'Supervisión de Activos', icon: 'Package', path: '/asset-management' },
      ]
    },
     {
      id: 'contratos-facturacion',
      label: 'Contratos y Facturación',
      icon: 'FileText',
      type: 'group',
      items: [
        { id: 'gestion-contratos', label: 'Gestión de Contratos', icon: 'FilePlus', path: '/contracts' },
        { id: 'seguimiento-pagos', label: 'Seguimiento de Pagos', icon: 'DollarSign', path: '/payments' },
      ]
    },
    {
      id: 'contabilidad-finanzas',
      label: 'Contabilidad y Finanzas',
      icon: 'Landmark',
      type: 'group',
      items: [
        { id: 'general-ledger', label: 'Libro Mayor', icon: 'BookOpen', path: '/general-ledger' },
        { id: 'accounts-payable', label: 'Cuentas por Pagar', icon: 'ArrowDownCircle', path: '/accounts-payable' },
        { id: 'accounts-receivable', label: 'Cuentas por Cobrar', icon: 'ArrowUpCircle', path: '/accounts-receivable' },
        { id: 'cash-management', label: 'Tesorería', icon: 'Wallet', path: '/cash-management' },
        { id: 'fixed-assets', label: 'Activos Fijos', icon: 'Building', path: '/fixed-assets' },
        { id: 'budgets', label: 'Presupuestos', icon: 'Target', path: '/budgets' },
        { id: 'financial-reports', label: 'Informes Financieros', icon: 'PieChart', path: '/financial-reports' }
      ]
    },
    {
        id: 'ia-erp',
        label: 'Inteligencia Artificial',
        icon: 'BrainCircuit',
        type: 'group',
        items: [
          { id: 'chat-interno', label: 'Chat Interno', icon: 'Bot', path: '/ai-chat' },
          { id: 'predicciones', label: 'Predicciones', icon: 'TrendingUp', path: '/ai-predictions' }
        ]
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: 'Settings',
      path: '/system-configuration',
      type: 'single'
    }
  ], []);

  useEffect(() => {
    const currentSection = navigationSections.find(section =>
      section.type === 'group' && section.items.some(item => location.pathname.startsWith(item.path))
    );
    if (currentSection) {
      setActiveSection(currentSection.id);
    } else {
        const singleSection = navigationSections.find(section => section.path === location.pathname);
        if (singleSection) setActiveSection(singleSection.id);
    }
  }, [location.pathname, navigationSections]);

  const toggleSection = (sectionId) => {
    if (!isCollapsed) {
      setActiveSection(prevActiveSection =>
        prevActiveSection === sectionId ? null : sectionId
      );
    }
  };

  const handleNavigation = (path) => {
    if (path && path !== '#') {
        navigate(path);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname.startsWith(path);
  };

  const renderNavigationItem = (item, isSubItem = false) => {
    const isActive = isActiveRoute(item.path);
    
    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item.path)}
        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 group ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        } ${isSubItem ? 'ml-6' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
        title={isCollapsed ? item.label : ''}
      >
        <Icon 
          name={item.icon} 
          size={20} 
          className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : ''}`} 
        />
        {!isCollapsed && (
          <span className="truncate">{item.label}</span>
        )}
      </button>
    );
  };

  const renderNavigationSection = (section) => {
    if (section.type === 'single') {
      return renderNavigationItem(section);
    }

    const isExpanded = activeSection === section.id;
    const hasActiveChild = section.items.some(item => isActiveRoute(item.path));

    return (
      <div key={section.id} className="space-y-1">
        <button
          onClick={() => toggleSection(section.id)}
          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 group ${
            hasActiveChild && !isExpanded
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          } ${isCollapsed ? 'justify-center px-2' : ''}`}
          title={isCollapsed ? section.label : ''}
        >
          <Icon 
            name={section.icon} 
            size={20} 
            className="flex-shrink-0" 
          />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{section.label}</span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </>
          )}
        </button>
        {!isCollapsed && isExpanded && (
          <div className="space-y-1 pt-1">
            {section.items.map(item => renderNavigationItem(item, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex flex-col h-full">
            <div className={`flex items-center h-16 px-6 border-b border-border ${isCollapsed ? 'px-4 justify-center' : ''}`}>
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Icon name="Shield" size={24} className="text-white" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-lg font-bold text-foreground">Orbiax</h1>
                            <p className="text-xs text-muted-foreground">Security Management</p>
                        </div>
                    )}
                </div>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                {navigationSections.map(section => renderNavigationSection(section))}
            </nav>
            <div className={`p-4 border-t border-border ${isCollapsed ? 'px-2' : ''}`}>
                <Button variant="ghost" size={isCollapsed ? "icon" : "default"} onClick={onToggle} className="w-full justify-center">
                    <Icon name={isCollapsed ? "ChevronsRight" : "ChevronsLeft"} size={20} />
                    {!isCollapsed && <span className="ml-2">Cerrar Menú</span>}
                </Button>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;