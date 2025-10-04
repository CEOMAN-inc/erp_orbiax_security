import React from 'react';
import Icon from 'components/AppIcon';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const BenefitsDashboard = () => {
    const COLORS = ['#7c3aed', '#0ea5e9', '#ec4899', '#10b981'];
    const chartData = [
        { name: 'Salud', value: 45000000 },
        { name: 'Pensión Voluntaria', value: 22000000 },
        { name: 'Seguro de Vida', value: 15000000 },
        { name: 'Otros', value: 8000000 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Costo Empresa (Mes)</p><p className="text-2xl font-bold">82.000.000 COP</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Aportes Empleados (Mes)</p><p className="text-2xl font-bold">25.500.000 COP</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Tasa de Inscripción</p><p className="text-2xl font-bold text-success">85%</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Planes Activos</p><p className="text-2xl font-bold">6</p></div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Distribución de Costos por Beneficio</h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#8884d8">
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={(value) => value.toLocaleString('es-CO', {style:'currency', currency:'COP'})}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default BenefitsDashboard;