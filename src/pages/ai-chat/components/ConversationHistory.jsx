import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHistory = ({ conversations, currentConversationId, onSelectConversation, onNewConversation, onDeleteConversation }) => {
  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Hoy';
    if (diffDays === 2) return 'Ayer';
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`;
    
    return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short' }).format(date);
  };

  const groupedConversations = conversations.reduce((groups, conv) => {
    const dateKey = formatDate(conv.lastActivity);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(conv);
    return groups;
  }, {});

  return (
    <div className="bg-card border border-border rounded-xl h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Conversaciones</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onNewConversation} iconName="Plus" iconSize={16}>
          Nueva
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        {Object.keys(groupedConversations).length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No hay chats previos</p>
          </div>
        ) : (
          Object.entries(groupedConversations).map(([dateGroup, convs]) => (
            <div key={dateGroup} className="mb-4">
              <h4 className="text-xs font-medium text-muted-foreground px-2 py-1 mb-2">{dateGroup}</h4>
              <div className="space-y-1">
                {convs.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      currentConversationId === conversation.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => onSelectConversation(conversation.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        currentConversationId === conversation.id ? 'text-primary' : 'text-foreground'
                      }`}>
                        {conversation.title}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteConversation(conversation.id); }}
                      className="p-1 rounded text-muted-foreground hover:bg-error/10 hover:text-error opacity-0 group-hover:opacity-100 transition-all"
                      title="Eliminar conversación"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationHistory;