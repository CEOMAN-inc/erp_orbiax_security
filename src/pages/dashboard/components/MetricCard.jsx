import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  gradient = false,
  onClick 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div 
      className={`p-6 rounded-2xl border border-border transition-all duration-200 hover:shadow-lg cursor-pointer ${
        gradient 
          ? 'bg-gradient-to-br from-primary to-secondary text-white' :'bg-card hover:bg-muted/50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          gradient 
            ? 'bg-white/20' :'bg-gradient-to-r from-primary to-secondary'
        }`}>
          <Icon 
            name={icon} 
            size={24} 
            className={gradient ? 'text-white' : 'text-white'} 
          />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${
            gradient ? 'text-white/80' : getChangeColor()
          }`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className={`text-2xl font-bold mb-1 ${
          gradient ? 'text-white' : 'text-foreground'
        }`}>
          {value}
        </h3>
        <p className={`text-sm ${
          gradient ? 'text-white/80' : 'text-muted-foreground'
        }`}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;