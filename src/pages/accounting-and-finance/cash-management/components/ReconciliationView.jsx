import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';

const ReconciliationView = ({ onImportClick }) => {
    // Mock Data
    const erpTransactions = [
        { id: 'ERP-01', date: '2025-09-25', description: 'Pago a Proveedor A', amount: -800000 },
        { id: 'ERP-02', date: '2025-09-26', description: 'Ingreso Cliente B', amount: 1500000 },
        { id: 'ERP-03', date: '2025-09-27', description: 'Pago de Nómina', amount: -5200000 },
    ];
    const bankTransactions = [
        { id: 'BNK-01', date: '2025-09-25', description: 'Transf. a PROV-A', amount: -800000 },
        { id: 'BNK-02', date: '2025-09-26', description: 'Cobro PSE CLIENT-B', amount: 1500000 },
        { id: 'BNK-03', date: '2025-09-28', description: 'Nota Débito GMF', amount: -4800 },
    ];

  return (
    <div className="bg-card border border-border rounded-lg mt-6">
        <div className="p-4 flex justify-between items-center border-b border-border">
            <h3 className="text-lg font-semibold">Conciliación Bancaria</h3>
            <Button variant="outline" size="sm" onClick={onImportClick} iconName="Upload">Importar Extracto</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-border">
            {/* Panel Izquierdo: Registros del ERP */}
            <div className="p-4">
                <h4 className="font-medium mb-4">Movimientos del Sistema (ERP)</h4>
                <div className="space-y-2">
                    {erpTransactions.map(tx => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <Checkbox id={tx.id} label={`${tx.date} - ${tx.description}`} />
                            <span className={`font-mono text-sm ${tx.amount > 0 ? 'text-success' : 'text-error'}`}>{tx.amount.toLocaleString('es-CO', {style: 'currency', currency: 'COP'})}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel Derecho: Extracto Bancario */}
            <div className="p-4">
                <h4 className="font-medium mb-4">Movimientos del Banco</h4>
                <div className="space-y-2">
                    {bankTransactions.map(tx => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <Checkbox id={tx.id} label={`${tx.date} - ${tx.description}`} />
                            <span className={`font-mono text-sm ${tx.amount > 0 ? 'text-success' : 'text-error'}`}>{tx.amount.toLocaleString('es-CO', {style: 'currency', currency: 'COP'})}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="p-4 border-t border-border flex justify-between items-center bg-muted/20">
            <div>
                <span className="text-sm font-semibold">Diferencia: </span>
                <span className="text-sm font-mono font-bold text-error">-$ 4.800,00</span>
            </div>
            <Button>Finalizar Conciliación</Button>
        </div>
    </div>
  );
};

export default ReconciliationView;