import React from 'react';
import Icon from 'components/AppIcon';

const PerformanceDashboard = ({ userRole }) => {
    // Vista para Empleado
    if (userRole === 'employee') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Mis Objetivos (Q4)</p><p className="text-2xl font-bold">3</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Progreso Promedio</p><p className="text-2xl font-bold text-success">75%</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Próxima Revisión</p><p className="text-2xl font-bold">15/12/2025</p></div>
            </div>
        );
    }

    // Vista para Supervisor
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Evaluaciones Pendientes</p><p className="text-2xl font-bold text-warning">5</p></div>
            <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Objetivos por Aprobar</p><p className="text-2xl font-bold text-primary">2</p></div>
            <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Desempeño del Equipo</p><p className="text-2xl font-bold text-success">Alto</p></div>
        </div>
    );
};

export default PerformanceDashboard;