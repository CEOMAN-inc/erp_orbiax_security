import React from 'react';

const BudgetVsActualReport = ({ data }) => {

    const renderVariance = (budgeted, actual) => {
        const variance = actual - budgeted;
        const percentage = budgeted !== 0 ? (variance / budgeted) * 100 : 0;
        const isNegative = variance < 0;
        const color = isNegative ? 'text-error' : 'text-success';

        return (
            <div className={`text-right font-mono ${color}`}>
                <p>{variance.toLocaleString('es-CO', {style: 'currency', currency:'COP'})}</p>
                <p className="text-xs">({percentage.toFixed(1)}%)</p>
            </div>
        );
    };

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden mt-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium w-2/5">Cuenta</th>
                            <th className="p-4 text-right text-sm font-medium">Presupuestado</th>
                            <th className="p-4 text-right text-sm font-medium">Real</th>
                            <th className="p-4 text-right text-sm font-medium">Varianza</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((item) => (
                            <tr key={item.account} className="hover:bg-muted/30">
                                <td className="p-4 font-medium">{item.account}</td>
                                <td className="p-4 text-right font-mono">{item.budgeted.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="p-4 text-right font-mono">{item.actual.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="p-4 text-sm">{renderVariance(item.budgeted, item.actual)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BudgetVsActualReport;