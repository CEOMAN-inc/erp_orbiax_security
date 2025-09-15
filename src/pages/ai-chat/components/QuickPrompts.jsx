import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickPrompts = ({ onPromptSelect }) => {
  const promptCategories = [
    {
      name: 'Análisis Rápido',
      icon: 'BarChart3',
      prompts: [
        'Resumen de ingresos del último mes',
        'Top 5 empleados con mejor asistencia',
        'Estado actual de los servicios críticos',
      ]
    },
    {
      name: 'Consultas de Personal',
      icon: 'Users',
      prompts: [
        '¿Quién tiene certificaciones a punto de vencer?',
        'Genera un reporte de ausentismo para esta semana',
        'Lista de personal disponible para turno nocturno',
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-slideIn">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <Icon name="Bot" size={32} color="white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Asistente de IA Orbiax</h2>
        <p className="text-muted-foreground mt-2">¿Cómo puedo ayudarte a optimizar tus operaciones hoy?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promptCategories.map((category) => (
          <div key={category.name} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name={category.icon} size={16} className="text-muted-foreground" />
              <h4 className="text-sm font-medium text-foreground">{category.name}</h4>
            </div>
            <div className="space-y-2">
              {category.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onPromptSelect(prompt)}
                  className="w-full text-left p-3 text-sm text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickPrompts;