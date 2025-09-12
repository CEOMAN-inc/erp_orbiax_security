import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    'personnel-ops': true,
    'field-ops': true,
    'resource-mgmt': true
  });

  const navigationSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
      type: 'single'
    },
    {
      id: 'personnel-ops',
      label: 'Personnel Operations',
      icon: 'Users',
      type: 'group',
      items: [
        {
          id: 'personnel-management',
          label: 'Personnel Management',
          icon: 'UserCheck',
          path: '/personnel-management'
        },
        {
          id: 'roster-calendar',
          label: 'Roster Calendar',
          icon: 'Calendar',
          path: '/roster-calendar'
        }
      ]
    },
    {
      id: 'field-ops',
      label: 'Field Operations',
      icon: 'Shield',
      type: 'group',
      items: [
        {
          id: 'service-orders',
          label: 'Service Orders',
          icon: 'ClipboardList',
          path: '/service-orders'
        },
        {
          id: 'incident-reporting',
          label: 'Incident Reporting',
          icon: 'AlertTriangle',
          path: '/incident-reporting'
        }
      ]
    },
    {
      id: 'resource-mgmt',
      label: 'Resource Management',
      icon: 'Package',
      type: 'group',
      items: [
        {
          id: 'asset-management',
          label: 'Asset Management',
          icon: 'Boxes',
          path: '/asset-management'
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    if (!isCollapsed) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev?.[sectionId]
      }));
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
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

    const isExpanded = expandedSections?.[section?.id];
    const hasActiveChild = isActiveSectionRoute(section?.items);

    return (
      <div key={section?.id} className="space-y-1">
        {/* Section Header */}
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
        {/* Section Items */}
        {!isCollapsed && isExpanded && (
          <div className="space-y-1 progressive-disclosure">
            {section?.items?.map(item => renderNavigationItem(item, true))}
          </div>
        )}
        {/* Collapsed Section Items */}
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
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
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

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationSections?.map(section => renderNavigationSection(section))}
          </nav>

          {/* Collapse Toggle */}
          <div className={`p-4 border-t border-border ${isCollapsed ? 'px-2' : ''}`}>
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              onClick={onToggle}
              className={`w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={20} 
              />
              {!isCollapsed && <span className="ml-2">Collapse</span>}
            </Button>
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
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
                    isActive
                      ? 'text-primary' :'text-muted-foreground'
                  }`}
                >
                  <Icon name={section?.icon} size={20} />
                  <span className="text-xs font-medium">{section?.label}</span>
                </button>
              );
            }

            // For groups, show the first item or most relevant
            const primaryItem = section?.items?.[0];
            const isActive = isActiveSectionRoute(section?.items);
            
            return (
              <button
                key={section?.id}
                onClick={() => handleNavigation(primaryItem?.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary' :'text-muted-foreground'
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