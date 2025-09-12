import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/personnel-management': { label: 'Personnel Management', icon: 'UserCheck', parent: 'Personnel Operations' },
    '/roster-calendar': { label: 'Roster Calendar', icon: 'Calendar', parent: 'Personnel Operations' },
    '/service-orders': { label: 'Service Orders', icon: 'ClipboardList', parent: 'Field Operations' },
    '/incident-reporting': { label: 'Incident Reporting', icon: 'AlertTriangle', parent: 'Field Operations' },
    '/asset-management': { label: 'Asset Management', icon: 'Boxes', parent: 'Resource Management' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard if not on dashboard
    if (location?.pathname !== '/dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'LayoutDashboard'
      });
    }

    // Add current route
    const currentRoute = routeMap?.[location?.pathname];
    if (currentRoute) {
      // Add parent section if exists
      if (currentRoute?.parent && location?.pathname !== '/dashboard') {
        breadcrumbs?.push({
          label: currentRoute?.parent,
          path: null, // Parent sections don't have direct paths
          icon: null
        });
      }

      // Add current page
      breadcrumbs?.push({
        label: currentRoute?.label,
        path: location?.pathname,
        icon: currentRoute?.icon,
        current: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
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
        {breadcrumbs?.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            )}
            
            {crumb?.current ? (
              <span className="flex items-center space-x-2 text-foreground font-medium">
                {crumb?.icon && <Icon name={crumb?.icon} size={16} />}
                <span>{crumb?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(crumb?.path)}
                className={`flex items-center space-x-2 transition-colors hover:text-foreground ${
                  crumb?.path ? 'cursor-pointer' : 'cursor-default'
                }`}
                disabled={!crumb?.path}
              >
                {crumb?.icon && <Icon name={crumb?.icon} size={16} />}
                <span>{crumb?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;