import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const PerformanceReviewForm = () => {
    const goals = [
        { id: 1, title: 'Reducir incidentes de seguridad en Zona Norte en 15%', progress: 80, selfComment: 'Se logró una reducción del 12% gracias a nuevas rondas.', supervisorComment: '' },
        { id: 2, title: 'Completar certificación avanzada en control de accesos', progress: 50, selfComment: 'Curso en progreso, 50% completado.', supervisorComment: '' },
        { id: 3, title: 'Mejorar el tiempo de respuesta a alarmas a menos de 5 minutos', progress: 100, selfComment: 'Objetivo cumplido. Tiempo promedio actual: 4.5 minutos.', supervisorComment: '' },
    ];

    return (
        <div className="bg-card border border-border rounded-lg mt-6">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Evaluación de Desempeño - Q4 2025</h3>
                <p className="text-sm text-muted-foreground">Empleado: Carlos Rodríguez</p>
            </div>
            <div className="p-6 space-y-6">
                {goals.map(goal => (
                    <div key={goal.id}>
                        <p className="font-medium text-foreground">{goal.title}</p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {/* Columna de Autoevaluación */}
                            <div className="bg-muted/50 p-3 rounded-lg">
                                <label className="text-sm font-semibold flex items-center mb-2"><Icon name="User" size={16} className="mr-2"/> Autoevaluación del Empleado</label>
                                <textarea rows="3" className="w-full p-2 bg-input border border-border rounded-lg text-sm" defaultValue={goal.selfComment}></textarea>
                            </div>
                            {/* Columna de Evaluación del Supervisor */}
                            <div className="bg-primary/10 p-3 rounded-lg">
                                 <label className="text-sm font-semibold flex items-center mb-2"><Icon name="Briefcase" size={16} className="mr-2"/> Evaluación del Supervisor</label>
                                <textarea rows="3" className="w-full p-2 bg-input border border-border rounded-lg text-sm" placeholder="Añadir comentarios..."></textarea>
                            </div>
                        </div>
                    </div>
                ))}
                 <div className="flex justify-end pt-4 border-t">
                    <Button>Finalizar y Compartir Evaluación</Button>
                 </div>
            </div>
        </div>
    );
};

export default PerformanceReviewForm;