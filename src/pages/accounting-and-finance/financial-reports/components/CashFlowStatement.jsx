import React from 'react';
import Icon from 'components/AppIcon';

const CashFlowStatement = () => {
    // En una implementación real, estos datos se calcularían a partir del Libro Mayor
    const formatCurrency = (value) => value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
    
    return (
        <div className="bg-card border border-border rounded-lg mt-6 p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Estado de Flujo de Efectivo</h3>
            <div className="space-y-4">
                {/* Actividades de Operación */}
                <div>
                    <h4 className="font-bold text-lg mb-2">Actividades de Operación</h4>
                    <div className="space-y-1 pl-4">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Cobros a clientes</span><span className="font-mono">{formatCurrency(267000000)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Pago a proveedores</span><span className="font-mono text-error">({formatCurrency(110000000)})</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Pago de gastos (nómina, etc.)</span><span className="font-mono text-error">({formatCurrency(120500000)})</span></div>
                        <div className="flex justify-between text-sm font-semibold border-t pt-1 mt-1"><span>Flujo de caja de actividades de operación</span><span className="font-mono">{formatCurrency(36500000)}</span></div>
                    </div>
                </div>
                {/* Actividades de Inversión */}
                <div>
                    <h4 className="font-bold text-lg mb-2">Actividades de Inversión</h4>
                    <div className="space-y-1 pl-4">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Compra de activos fijos</span><span className="font-mono text-error">({formatCurrency(55000000)})</span></div>
                        <div className="flex justify-between text-sm font-semibold border-t pt-1 mt-1"><span>Flujo de caja de actividades de inversión</span><span className="font-mono text-error">({formatCurrency(55000000)})</span></div>
                    </div>
                </div>
                {/* Actividades de Financiación */}
                <div>
                    <h4 className="font-bold text-lg mb-2">Actividades de Financiación</h4>
                    <div className="space-y-1 pl-4">
                         <div className="flex justify-between text-sm"><span className="text-muted-foreground">Préstamos bancarios recibidos</span><span className="font-mono">{formatCurrency(50000000)}</span></div>
                        <div className="flex justify-between text-sm font-semibold border-t pt-1 mt-1"><span>Flujo de caja de actividades de financiación</span><span className="font-mono">{formatCurrency(50000000)}</span></div>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-base font-semibold"><span>Aumento/Disminución neta de efectivo</span><span className="font-mono">{formatCurrency(31500000)}</span></div>
                    <div className="flex justify-between text-sm"><span>Efectivo al inicio del período</span><span className="font-mono">{formatCurrency(226800000)}</span></div>
                    <div className="flex justify-between text-lg font-bold bg-muted/50 p-2 rounded-lg"><span>Efectivo al final del período</span><span className="font-mono">{formatCurrency(258300000)}</span></div>
                </div>
            </div>
        </div>
    );
};

export default CashFlowStatement;