import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentCard = ({ incident, onViewDetails, onUpdateStatus }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-red-500/20 text-red-400';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved':
        return 'bg-green-500/20 text-green-400';
      case 'closed':
        return 'bg-slate-500/20 text-slate-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-200 ${
      incident?.severity === 'critical' ? 'border-accent/50 shadow-accent/10' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(incident?.severity)}`}>
            {incident?.severity?.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(incident?.status)}`}>
            {incident?.status === 'in-progress' ? 'EN PROGRESO' : 
             incident?.status === 'resolved' ? 'RESUELTO' :
             incident?.status === 'closed' ? 'CERRADO' : 'ABIERTO'}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">#{incident?.id}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{incident?.title}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{incident?.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{incident?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="User" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{incident?.reportedBy}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{formatDate(incident?.reportedAt)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="UserCheck" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{incident?.assignedTo || 'Sin asignar'}</span>
        </div>
      </div>
      {incident?.evidenceCount > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Paperclip" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {incident?.evidenceCount} archivo{incident?.evidenceCount !== 1 ? 's' : ''} adjunto{incident?.evidenceCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {incident?.resolutionTime && (
            <span className="text-xs text-muted-foreground">
              Tiempo de resolución: {incident?.resolutionTime}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(incident)}
          >
            Ver Detalles
          </Button>
          {incident?.status !== 'closed' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onUpdateStatus(incident)}
            >
              Actualizar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;