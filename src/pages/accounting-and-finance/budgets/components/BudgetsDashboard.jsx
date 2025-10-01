import React from 'react';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BudgetsDashboard = ({ data }) => {
    const { income, expenses } = data.reduce((acc, item) => {
        if (item.type === 'Ingreso') {
            acc.income.budgeted += item.budgeted;
            acc.income.actual += item.actual;
        } else if (item.type === 'Gasto') {
            acc.expenses.budgeted += item.budgeted;
            acc.expenses.actual += item.actual;
        }
        return acc;
    }, { income: { budgeted: 0, actual: 0 }, expenses: { budgeted: 0, actual: 0 } });

    const incomeCompliance = income.budgeted > 0 ? (income.actual / income.budgeted) * 100 : 0;
    const expenseExecution = expenses.budgeted > 0 ? (expenses.actual / expenses.budgeted) * 100 : 0;

    const chartData = [
        { name: 'Ingresos', Presupuestado: income.budgeted, Real: income.actual },
        { name: 'Gastos', Presupuestado: expenses.budgeted, Real: expenses.actual },
    ];
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Cumplimiento de Ingresos</p><p className={`text-2xl font-bold ${incomeCompliance >= 100 ? 'text-success' : 'text-warning'}`}>{incomeCompliance.toFixed(1)}%</p></div>
                 <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Ejecución de Gastos</p><p className={`text-2xl font-bold ${expenseExecution > 100 ? 'text-error' : 'text-success'}`}>{expenseExecution.toFixed(1)}%</p></div>
                 <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Varianza Neta</p><p className={`text-2xl font-bold ${(income.actual - income.budgeted) - (expenses.actual - expenses.budgeted) > 0 ? 'text-success' : 'text-error'}`}>{((income.actual - income.budgeted) - (expenses.actual - expenses.budgeted)).toLocaleString('es-CO', {style:'currency', currency:'COP'})}</p></div>
                 <div className="bg-card border border-border rounded-lg p-4"><p className="text-sm text-muted-foreground">Cuentas con Mayor Desviación</p><p className="text-sm font-bold text-foreground mt-2">1. Ingresos por Ventas (+15%)<br/>2. Gastos de Personal (+8%)</p></div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Presupuestado vs. Real (Acumulado)</h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={chartData} margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                            <YAxis stroke="var(--color-muted-foreground)" fontSize={10} tickFormatter={(value) => `$${value/1000000}M`} />
                            <Tooltip formatter={(value) => value.toLocaleString('es-CO', {style:'currency', currency: 'COP'})} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Bar dataKey="Presupuestado" fill="var(--color-muted)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Real" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default BudgetsDashboard;