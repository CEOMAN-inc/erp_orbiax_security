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
    {
      id: 'gestion-personal',
      label: 'Gestión de Personal',
      icon: 'Users',
      type: 'group',
      items: [
        { id: 'roster-calendar', label: 'Horarios y Turnos', icon: 'Calendar', path: '/roster-calendar' },
        { id: 'asistencia', label: 'Registro de Asistencia', icon: 'ClipboardCheck', path: '/attendance' },
        { id: 'ausencias', label: 'Vacaciones y Permisos', icon: 'Plane', path: '/leaves' },
        { id: 'certificaciones', label: 'Certificaciones', icon: 'Award', path: '/certifications' },
        { id: 'dotacion', label: 'Gestión de Dotación', icon: 'Shirt', path: '/endowments' }
      ]
    },
    {
      id: 'asignacion-servicios',
      label: 'Asignación de Servicios',
      icon: 'ClipboardList',
      type: 'group',
      items: [
        { id: 'service-orders', label: 'Órdenes de Servicio', icon: 'ClipboardList', path: '/service-orders' },
        { id: 'asignar-personal', label: 'Asignar Personal', icon: 'UserPlus', path: '/assign-personnel' },
        { id: 'reporte-cumplimiento', label: 'Reportes de Cumplimiento', icon: 'BarChart2', path: '/compliance-reports' },
        { id: 'asignar-recursos', label: 'Asignar Recursos Operativos', icon: 'Truck', path: '/assign-resources' }
      ]
    },
    {
      id: 'control-operaciones',
      label: 'Control de Operaciones',
      icon: 'Shield',
      type: 'group',
      items: [
        { id: 'incident-reporting', label: 'Alertas e Incidentes', icon: 'AlertTriangle', path: '/incident-reporting' },
        { id: 'estado-servicios', label: 'Tablero de Estados', icon: 'Server', path: '/services-status' },
        { id: 'asset-management', label: 'Supervisión de Activos', icon: 'Package', path: '/asset-management' },
        { id: 'inspecciones', label: 'Inspecciones y Mantenimiento', icon: 'Wrench', path: '/inspections' }
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
        { id: 'reportes-cartera', label: 'Reportes de Cartera', icon: 'PieChart', path: '/reports/portfolio' },
        { id: 'renovaciones', label: 'Renovaciones', icon: 'RefreshCw', path: '/contracts/renewals' }
      ]
    },
    {
      id: 'contabilidad-finanzas',
      label: 'Contabilidad y Finanzas',
      icon: 'Landmark',
      type: 'group',
      items: [
        { id: 'libro-mayor', label: 'Libro Mayor', icon: 'BookOpen', path: '/general-ledger' },
        { id: 'balances-informes', label: 'Balances e Informes', icon: 'Clipboard', path: '/financial-statements' },
        { id: 'presupuestos', label: 'Control de Presupuestos', icon: 'Target', path: '/budgets' }
      ]
    },
    {
      id: 'crm-gestion-comercial',
      label: 'CRM y Gestión Comercial',
      icon: 'Briefcase',
      type: 'group',
      items: [
        { id: 'clientes-prospectos', label: 'Clientes y Prospectos', icon: 'Contact', path: '/clients' },
        { id: 'comunicaciones', label: 'Comunicaciones', icon: 'MessageSquare', path: '/communications' }
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
      section.type === 'group' && section.items.some(item => item.path === location.pathname)
    );
    if (currentSection) {
      setActiveSection(currentSection.id);
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
    return location?.pathname === path;
  };

  const isActiveSectionRoute = (items) => {
    return items?.some(item => location?.pathname === item?.path);
  };

  const renderNavigationItem = (item, isSubItem = false) => {
    const isActive = isActiveRoute(item?.path);
    
    return (
      <button
        key={item?.id}
        onClick={() => handleNavigation(item?.path)}
        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 group ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-command'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        } ${isSubItem ? 'ml-6' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
        title={isCollapsed ? item?.label : ''}
      >
        <Icon 
          name={item?.icon} 
          size={20} 
          className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : ''}`} 
        />
        {!isCollapsed && (
          <span className="truncate">{item?.label}</span>
        )}
      </button>
    );
  };

  const renderNavigationSection = (section) => {
    if (section?.type === 'single') {
      return renderNavigationItem(section);
    }

    const isExpanded = activeSection === section.id;
    const hasActiveChild = isActiveSectionRoute(section?.items);

    return (
      <div key={section?.id} className="space-y-1">
        <button
          onClick={() => toggleSection(section?.id)}
          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 group ${
            hasActiveChild
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          } ${isCollapsed ? 'justify-center px-2' : ''}`}
          title={isCollapsed ? section?.label : ''}
        >
          <Icon 
            name={section?.icon} 
            size={20} 
            className="flex-shrink-0" 
          />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{section?.label}</span>
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
          <div className="space-y-1 progressive-disclosure">
            {section?.items?.map(item => renderNavigationItem(item, true))}
          </div>
        )}
        {isCollapsed && (
          <div className="space-y-1">
            {section?.items?.map(item => renderNavigationItem(item))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}>
        <div className="flex flex-col h-full">
          <div className={`flex items-center px-6 py-4 border-b border-border ${
            isCollapsed ? 'px-4 justify-center' : ''
          }`}>
            {isCollapsed ? (
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-white" />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Orbiax</h1>
                  <p className="text-xs text-muted-foreground">Security Management</p>
                </div>
              </div>
            )}
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navigationSections?.map(section => renderNavigationSection(section))}
          </nav>
          <div className={`p-4 border-t border-border ${isCollapsed ? 'px-2' : ''}`}>
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              onClick={onToggle}
              className={`w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              title={isCollapsed ? 'Expandir' : 'Colapsar'}
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={20} 
              />
              {!isCollapsed && <span className="ml-2">Cerrar Menú</span>}
            </Button>
          </div>
        </div>
      </aside>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex items-center justify-around py-2">
          {navigationSections?.map(section => {
            if (section?.type === 'single') {
              const isActive = isActiveRoute(section?.path);
              return (
                <button
                  key={section?.id}
                  onClick={() => handleNavigation(section?.path)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon name={section?.icon} size={20} />
                  <span className="text-xs font-medium">{section?.label}</span>
                </button>
              );
            }
            const primaryItem = section?.items?.[0];
            const isActive = isActiveSectionRoute(section?.items);
            return (
              <button
                key={section?.id}
                onClick={() => handleNavigation(primaryItem?.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon name={section?.icon} size={20} />
                <span className="text-xs font-medium">{section?.label?.split(' ')?.[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;