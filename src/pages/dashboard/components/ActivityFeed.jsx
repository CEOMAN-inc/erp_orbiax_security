import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'shift': return 'Clock';
      case 'incident': return 'AlertTriangle';
      case 'service': return 'ClipboardList';
      case 'personnel': return 'Users';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'incident': return 'text-error';
      case 'service': return 'text-primary';
      case 'personnel': return 'text-secondary';
      case 'system': return 'text-warning';
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
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Actividad Reciente</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todo
        </button>
      </div>
      <div className="space-y-4">
        {activities?.length > 0 ? (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-lg bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">
                  {activity?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity?.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(activity?.timestamp)}
                  </span>
                  {activity?.user && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {activity?.user}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {activity?.priority && (
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  activity?.priority === 'high' ? 'bg-error/20 text-error' :
                  activity?.priority === 'medium'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                }`}>
                  {activity?.priority === 'high' ? 'Alta' :
                   activity?.priority === 'medium' ? 'Media' : 'Baja'}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No hay actividad reciente</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;