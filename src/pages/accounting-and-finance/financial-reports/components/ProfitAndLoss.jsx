import React from 'react';
import Icon from 'components/AppIcon';

const ProfitAndLoss = ({ data }) => {
    // Lógica de cálculo basada en datos del Libro Mayor
    const revenues = data.filter(item => item.account.startsWith('4'));
    const costs = data.filter(item => item.account.startsWith('6'));
    const expenses = data.filter(item => item.account.startsWith('5'));

    const totalRevenues = revenues.reduce((sum, item) => sum + item.balance, 0);
    const totalCosts = costs.reduce((sum, item) => sum + item.balance, 0);
    const grossProfit = totalRevenues - totalCosts;
    const totalExpenses = expenses.reduce((sum, item) => sum + item.balance, 0);
    const operatingProfit = grossProfit - totalExpenses;
    const taxes = operatingProfit * 0.35; // Impuesto de ejemplo del 35%
    const netProfit = operatingProfit - taxes;

    const formatCurrency = (value) => value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

    return (
        <div className="bg-card border border-border rounded-lg mt-6 p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Estado de Resultados (P&L)</h3>
            <div className="space-y-2">
                {/* Ingresos */}
                <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-foreground">Ingresos Operacionales</span>
                    <span className="font-mono font-semibold">{formatCurrency(totalRevenues)}</span>
                </div>
                {revenues.map(item => (
                    <div key={item.account} className="flex justify-between items-center py-1 pl-6 text-sm">
                        <span className="text-muted-foreground">{item.account}</span>
                        <span className="font-mono">{formatCurrency(item.balance)}</span>
                    </div>
                ))}

                {/* Costos */}
                <div className="flex justify-between items-center py-2 border-t mt-2">
                    <span className="font-medium text-foreground">Costo de Ventas</span>
                    <span className="font-mono font-semibold">({formatCurrency(totalCosts)})</span>
                </div>
                
                {/* Utilidad Bruta */}
                <div className="flex justify-between items-center py-2 bg-muted/50 rounded-lg px-3 font-bold">
                    <span>Utilidad Bruta</span>
                    <span className="font-mono">{formatCurrency(grossProfit)}</span>
                </div>

                {/* Gastos */}
                <div className="flex justify-between items-center py-2 border-t mt-2">
                    <span className="font-medium text-foreground">Gastos Operacionales</span>
                     <span className="font-mono font-semibold">({formatCurrency(totalExpenses)})</span>
                </div>
                {expenses.map(item => (
                     <div key={item.account} className="flex justify-between items-center py-1 pl-6 text-sm">
                        <span className="text-muted-foreground">{item.account}</span>
                        <span className="font-mono">({formatCurrency(item.balance)})</span>
                    </div>
                ))}

                {/* Utilidad Operacional */}
                <div className="flex justify-between items-center py-2 bg-muted/50 rounded-lg px-3 font-bold">
                    <span>Utilidad Operacional</span>
                    <span className="font-mono">{formatCurrency(operatingProfit)}</span>
                </div>
                
                 {/* Impuestos y Utilidad Neta */}
                <div className="flex justify-between items-center py-1 text-sm border-t mt-2"><span className="text-muted-foreground">Impuestos (35%)</span><span className="font-mono">({formatCurrency(taxes)})</span></div>
                <div className="flex justify-between items-center py-3 bg-primary/10 rounded-lg px-3 text-lg font-bold text-primary">
                    <span>Utilidad Neta</span>
                    <span className="font-mono">{formatCurrency(netProfit)}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfitAndLoss;