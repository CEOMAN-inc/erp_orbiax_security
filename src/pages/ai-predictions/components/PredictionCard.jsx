import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictionCard = ({ title, icon, prediction, chartData, insights, recommendations, cta }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-full animate-slideIn">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
          <Icon name={icon} size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      </div>

      {/* Predicción Principal */}
      <div className="text-center bg-muted/50 rounded-lg p-4 mb-4">
        <p className="text-xs text-muted-foreground">{prediction.label}</p>
        <p className="text-3xl font-bold text-primary">{prediction.value}</p>
      </div>

      {/* Gráfico */}
      <div className="h-48 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                borderColor: 'var(--color-border)',
                borderRadius: '0.5rem',
                color: 'var(--color-foreground)'
              }}
              cursor={{ fill: 'var(--color-muted)', opacity: 0.5 }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="valor" name="Probabilidad" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex-1 space-y-4">
        {/* Insights */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center"><Icon name="Lightbulb" size={14} className="mr-2 text-warning"/>Insights Clave</h4>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-1 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{insight}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recomendaciones */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center"><Icon name="Heart" size={14} className="mr-2 text-secondary"/>Recomendaciones</h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={14} className="text-secondary mt-1 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{rec}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-6">
        <Button variant="outline" fullWidth onClick={() => alert(cta.alert)}>
          <Icon name={cta.icon} size={16} className="mr-2"/>
          {cta.label}
        </Button>
      </div>
    </div>
  );
};

export default PredictionCard;