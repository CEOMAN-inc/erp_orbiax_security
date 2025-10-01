import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = null }) => { // El prop ahora es 'items'
  const location = useLocation();
  const navigate = useNavigate();

  // Función para generar breadcrumbs dinámicos si no se proveen 'items'
  const generateDynamicBreadcrumbs = () => {
    const routeMap = {
      '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
      '/personnel-management': { label: 'Gestión de Personal', icon: 'UserCheck', parent: 'Operaciones de Personal' },
      '/roster-calendar': { label: 'Calendario de Turnos', icon: 'Calendar', parent: 'Operaciones de Personal' },
      '/service-orders': { label: 'Órdenes de Servicio', icon: 'ClipboardList', parent: 'Operaciones de Campo' },
      '/incident-reporting': { label: 'Reporte de Incidentes', icon: 'AlertTriangle', parent: 'Operaciones de Campo' },
      '/asset-management': { label: 'Gestión de Activos', icon: 'Boxes', parent: 'Gestión de Recursos' },
      '/system-configuration': { label: 'Configuración', icon: 'Settings' }
    };
    
    const breadcrumbs = [];

    // Siempre empezar con Dashboard si no estamos en él
    if (location.pathname !== '/dashboard' && location.pathname !== '/') {
      breadcrumbs.push({
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'LayoutDashboard'
      });
    }

    const currentRoute = routeMap[location.pathname];
    if (currentRoute) {
      if (currentRoute.parent) {
        breadcrumbs.push({
          label: currentRoute.parent,
          path: null, // Los padres no son navegables
          icon: null
        });
      }
      breadcrumbs.push({ ...currentRoute, path: location.pathname, current: true });
    } else if (location.pathname === '/dashboard' || location.pathname === '/') {
        breadcrumbs.push({ label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', current: true });
    }

    return breadcrumbs;
  };

  // Decide qué breadcrumbs usar: los personalizados o los dinámicos
  const breadcrumbs = items ? items : generateDynamicBreadcrumbs();

  if (!breadcrumbs || breadcrumbs.length === 0 || (breadcrumbs.length === 1 && breadcrumbs[0].current)) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path || index} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            )}
            
            {crumb.current ? (
              <span className="flex items-center space-x-2 text-foreground font-medium">
                {crumb.icon && <Icon name={crumb.icon} size={16} />}
                <span>{crumb.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(crumb.path)}
                className={`flex items-center space-x-2 transition-colors hover:text-foreground ${
                  crumb.path ? 'cursor-pointer' : 'cursor-default'
                }`}
                disabled={!crumb.path}
              >
                {crumb.icon && <Icon name={crumb.icon} size={16} />}
                <span>{crumb.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;