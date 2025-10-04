import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const GoalSettingView = () => {
    const goals = [
        { id: 1, title: 'Reducir incidentes de seguridad en Zona Norte en 15%', progress: 80, status: 'En Progreso' },
        { id: 2, title: 'Completar certificación avanzada en control de accesos', progress: 50, status: 'En Progreso' },
        { id: 3, title: 'Mejorar el tiempo de respuesta a alarmas a menos de 5 minutos', progress: 100, status: 'Completado' },
    ];

    return (
        <div className="bg-card border border-border rounded-lg mt-6">
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Mis Objetivos - Q4 2025</h3>
                <Button size="sm" iconName="Plus">Añadir Objetivo</Button>
            </div>
            <div className="p-6 space-y-4">
                {goals.map(goal => (
                    <div key={goal.id} className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                            <p className="font-medium text-foreground">{goal.title}</p>
                            <span className={`px-2 py-1 text-xs rounded-full ${goal.status === 'Completado' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}`}>{goal.status}</span>
                        </div>
                        <div className="flex items-center space-x-3 mt-3">
                            <div className="w-full bg-border rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                            </div>
                            <span className="text-sm font-semibold">{goal.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalSettingView;