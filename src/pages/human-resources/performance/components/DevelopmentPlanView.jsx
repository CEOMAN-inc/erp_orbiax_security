import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const DevelopmentPlanView = () => {
    const pdiItems = [
        { id: 1, area: 'Habilidades de Liderazgo', action: 'Curso online: "Liderazgo para Supervisores de Seguridad"', status: 'En Progreso', dueDate: '2026-03-31' },
        { id: 2, area: 'Conocimiento Técnico', action: 'Certificación en sistemas de CCTV avanzados', status: 'Pendiente', dueDate: '2026-06-30' },
        { id: 3, area: 'Comunicación', action: 'Participar como ponente en la reunión mensual de equipo', status: 'Completado', dueDate: '2025-11-28' },
    ];

    return (
        <div className="bg-card border border-border rounded-lg mt-6">
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Plan de Desarrollo Individual (PDI)</h3>
                <Button size="sm" iconName="Plus">Añadir Acción de Desarrollo</Button>
            </div>
            <div className="p-6 space-y-4">
                 {pdiItems.map(item => (
                    <div key={item.id} className="bg-muted/50 p-4 rounded-lg">
                         <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-primary">{item.area}</p>
                                <p className="font-medium text-foreground mt-1">{item.action}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                item.status === 'Completado' ? 'bg-success/20 text-success' : 
                                item.status === 'En Progreso' ? 'bg-primary/20 text-primary' : 
                                'bg-warning/20 text-warning'}`
                            }>{item.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Fecha Límite: {item.dueDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DevelopmentPlanView;