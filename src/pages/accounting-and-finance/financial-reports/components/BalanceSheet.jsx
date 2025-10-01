import React from 'react';

const BalanceSheet = ({ data }) => {
    // Lógica de cálculo
    const assets = data.filter(item => item.account.startsWith('1'));
    const liabilities = data.filter(item => item.account.startsWith('2'));
    const equity = data.filter(item => item.account.startsWith('3'));

    const totalAssets = assets.reduce((sum, item) => sum + item.balance, 0);
    const totalLiabilities = liabilities.reduce((sum, item) => sum + item.balance, 0);
    const totalEquity = equity.reduce((sum, item) => sum + item.balance, 0);
    const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

    const formatCurrency = (value) => value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

    return (
        <div className="bg-card border border-border rounded-lg mt-6 p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Balance General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Activos */}
                <div className="space-y-2">
                    <h4 className="font-bold text-lg border-b pb-2 mb-2">Activos</h4>
                    {assets.map(item => (
                        <div key={item.account} className="flex justify-between text-sm"><span className="text-muted-foreground">{item.account}</span><span className="font-mono">{formatCurrency(item.balance)}</span></div>
                    ))}
                    <div className="flex justify-between font-bold text-base border-t pt-2 mt-2"><span>Total Activos</span><span className="font-mono">{formatCurrency(totalAssets)}</span></div>
                </div>

                {/* Pasivos y Patrimonio */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg border-b pb-2 mb-2">Pasivos</h4>
                        {liabilities.map(item => (
                            <div key={item.account} className="flex justify-between text-sm"><span className="text-muted-foreground">{item.account}</span><span className="font-mono">{formatCurrency(item.balance)}</span></div>
                        ))}
                        <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2"><span>Total Pasivos</span><span className="font-mono">{formatCurrency(totalLiabilities)}</span></div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg border-b pb-2 mb-2">Patrimonio</h4>
                        {equity.map(item => (
                            <div key={item.account} className="flex justify-between text-sm"><span className="text-muted-foreground">{item.account}</span><span className="font-mono">{formatCurrency(item.balance)}</span></div>
                        ))}
                        <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2"><span>Total Patrimonio</span><span className="font-mono">{formatCurrency(totalEquity)}</span></div>
                    </div>
                    <div className="flex justify-between font-bold text-base bg-muted/50 p-2 rounded-lg"><span>Total Pasivo y Patrimonio</span><span className="font-mono">{formatCurrency(totalLiabilitiesAndEquity)}</span></div>
                </div>
            </div>
        </div>
    );
};

export default BalanceSheet;