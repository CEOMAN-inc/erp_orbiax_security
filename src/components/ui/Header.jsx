import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../hooks/useAuth'; // <-- AÑADIDO

const Header = ({ 
  isCollapsed = false, 
  onToggleSidebar, 
  currentTenant = "Orbiax Security",
  onTenantChange,
  notifications = [],
  onNotificationClick,
  user = { name: "Admin User", avatar: null }
}) => {
  const { logout } = useAuth(); // <-- AÑADIDO
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const tenants = [
    { id: 1, name: "Orbiax Security", code: "ORB" },
    { id: 2, name: "SecureGuard Pro", code: "SGP" },
    { id: 3, name: "Elite Protection", code: "EPT" }
  ];

  const unreadNotifications = notifications?.filter(n => !n?.read)?.length;

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Search:', searchQuery);
    }
  };

  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    setIsNotificationOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>

          {/* Multi-Tenant Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsTenantDropdownOpen(!isTenantDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white text-xs font-bold">
                {tenants?.find(t => t?.name === currentTenant)?.code || 'ORB'}
              </div>
              <span className="hidden sm:block">{currentTenant}</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isTenantDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-command z-50">
                <div className="p-2">
                  {tenants?.map((tenant) => (
                    <button
                      key={tenant?.id}
                      onClick={() => {
                        if (onTenantChange) onTenantChange(tenant);
                        setIsTenantDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        tenant?.name === currentTenant
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        tenant?.name === currentTenant
                          ? 'bg-white text-primary' :'bg-gradient-to-r from-primary to-secondary text-white'
                      }`}>
                        {tenant?.code}
                      </div>
                      <span>{tenant?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative transition-all duration-200 ${
              isSearchFocused ? 'transform scale-105' : ''
            }`}>
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search personnel, orders, assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute top-full right-0 mt-1 w-80 bg-popover border border-border rounded-lg shadow-command z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications?.slice(0, 5)?.map((notification) => (
                      <button
                        key={notification?.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full p-4 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0 ${
                          !notification?.read ? 'bg-accent/10' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.type === 'incident' ? 'bg-error' :
                            notification?.type === 'alert'? 'bg-warning' : 'bg-success'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification?.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
                {notifications?.length > 5 && (
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      View all notifications
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </div>
              <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-command z-50">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-border my-1" />
                  <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors text-error"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;