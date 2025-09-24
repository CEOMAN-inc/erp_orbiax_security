import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, onActionClick }) => {

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isUser) {
    return (
        <div className="flex justify-end mb-6 animate-slideIn">
          <div className="flex items-start space-x-3 max-w-2xl">
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-3 shadow-md">
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1 text-right">{formatTime(timestamp)}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} className="text-foreground" />
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="flex justify-start mb-6 animate-slideIn">
      <div className="flex items-start space-x-3 max-w-4xl">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
          <Icon name="Bot" size={20} color="white" />
        </div>
        <div className="space-y-3 flex-1">
          <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3">
            <p className="text-sm text-foreground whitespace-pre-wrap">{message.content}</p>
            <p className="text-xs text-muted-foreground mt-1">{formatTime(timestamp)}</p>
          </div>
          
          {message.actionCards && message.actionCards.map((card, index) => (
            <div key={index} className="bg-muted/50 border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground">{card.title}</h4>
                <Icon name={card.icon} size={16} className="text-primary" />
              </div>
              
              {/* --- CÓDIGO CORREGIDO AQUÍ --- */}
              {card.type === 'metric' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  {card.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-xl font-bold text-primary">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {card.type === 'list' && (
                <div className="space-y-2 mb-3">
                  {card.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-border/50 last:border-b-0">
                      <span className="text-sm text-foreground">{item.name}</span>
                      <span className="text-sm text-muted-foreground font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* --- FIN DE LA CORRECCIÓN --- */}
              
              {card.actions && card.actions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {card.actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => onActionClick(action)}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-200"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;