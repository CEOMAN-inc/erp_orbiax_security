import React from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const AIInsights = ({ insights }) => {
  const navigate = useNavigate();

  const getInsightIcon = (type) => ({
    warning: 'AlertTriangle', success: 'CheckCircle', info: 'Info', trend: 'TrendingUp', alert: 'Bell'
  }[type] || 'Info');
  
  const getInsightColor = (type) => ({
    warning: 'text-warning', success: 'text-success', info: 'text-primary', trend: 'text-secondary', alert: 'text-error'
  }[type] || 'text-primary');

  if (!insights || insights.length === 0) return null;
  
  const handleActionClick = (action) => {
    if (action.route) navigate(action.route);
    else alert(`Acción "${action.label}" ejecutada.`);
  };

  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="flex items-center space-x-2 p-4 border-b border-border">
        <Icon name="Brain" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Insights Inteligentes</h3>
      </div>
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {insights.map((insight, index) => (
          <div key={index} className="bg-muted/50 border border-border/50 rounded-lg p-3">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={getInsightIcon(insight.type)} size={16} className={getInsightColor(insight.type)} />
              <h4 className="text-sm font-semibold text-foreground flex-1">{insight.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{insight.description}</p>
            {insight.actions?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {insight.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleActionClick(action)}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
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
  );
};

export default AIInsights;