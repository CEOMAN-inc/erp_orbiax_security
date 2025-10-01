import React from 'react';
import Icon from 'components/AppIcon';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const FADashboard = ({ assets }) => {
    const bookValue = assets.reduce((sum, asset) => sum + asset.bookValue, 0);
    const monthlyDepreciation = assets.reduce((sum, asset) => sum + (asset.cost / (asset.usefulLife * 12)), 0);

    const stats = {
        totalBookValue: bookValue,
        depreciationThisMonth: monthlyDepreciation,
        acquisitionsThisYear: 55000000, // Valor de ejemplo
        fullyDepreciatedSoon: assets.filter(a => (a.usefulLife * 12) - a.ageInMonths < 6).length,
    };

    const categoryData = assets.reduce((acc, asset) => {
        const category = asset.category;
        if (!acc[category]) {
            acc[category] = { name: category, value: 0 };
        }
        acc[category].value += asset.bookValue;
        return acc;
    }, {});
    
    const chartData = Object.values(categoryData);
    const COLORS = ['#7c3aed', '#0ea5e9', '#ec4899', '#10b981'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Valor en Libros Total</p><p className="text-2xl font-bold">{stats.totalBookValue.toLocaleString('es-CO', {style:'currency', currency:'COP'})}</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Depreciación del Mes</p><p className="text-2xl font-bold">{stats.depreciationThisMonth.toLocaleString('es-CO', {style:'currency', currency:'COP'})}</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Adquisiciones del Año</p><p className="text-2xl font-bold">{stats.acquisitionsThisYear.toLocaleString('es-CO', {style:'currency', currency:'COP'})}</p></div>
                <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Próximos a Depreciarse</p><p className="text-2xl font-bold">{stats.fullyDepreciatedSoon}</p></div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Valor por Categoría</h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#8884d8" paddingAngle={5}>
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

export default FADashboard;