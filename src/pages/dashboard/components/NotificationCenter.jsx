import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications = [], onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'Todas', count: notifications?.length },
    { value: 'unread', label: 'No leídas', count: notifications?.filter(n => !n?.read)?.length },
    { value: 'incident', label: 'Incidentes', count: notifications?.filter(n => n?.type === 'incident')?.length },
    { value: 'system', label: 'Sistema', count: notifications?.filter(n => n?.type === 'system')?.length }
  ];

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'incident': return 'AlertTriangle';
      case 'system': return 'Settings';
      case 'personnel': return 'Users';
      case 'service': return 'ClipboardList';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning';
    
    switch (type) {
      case 'incident': return 'text-error';
      case 'system': return 'text-primary';
      case 'personnel': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)} días`;
  };

  return (
    <div className="bg-card rounded-2xl border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Centro de Notificaciones</h2>
          {notifications?.filter(n => !n?.read)?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAllAsRead}
              className="text-primary hover:text-primary/80"
            >
              Marcar todas como leídas
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === option?.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option?.label}
              {option?.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {option?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notification?.read ? 'bg-accent/5 border-l-4 border-l-accent' : ''
                }`}
                onClick={() => onMarkAsRead && onMarkAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-muted ${
                    getNotificationColor(notification?.type, notification?.priority)
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={16} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification?.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification?.message}
                        </p>
                      </div>
                      
                      {!notification?.read && (
                        <div className="w-2 h-2 bg-accent rounded-full ml-2 mt-1" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(notification?.timestamp)}
                      </span>
                      
                      {notification?.priority && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                            notification?.priority === 'high' ? 'bg-error/20 text-error' :
                            notification?.priority === 'medium'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                          }`}>
                            {notification?.priority === 'high' ? 'Alta' :
                             notification?.priority === 'medium' ? 'Media' : 'Baja'}
                          </span>
                        </>
                      )}
                      
                      {notification?.user && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {notification?.user}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Bell" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No hay notificaciones' : `No hay notificaciones ${
                filter === 'unread' ? 'sin leer' : `de tipo ${filter}`
              }`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;