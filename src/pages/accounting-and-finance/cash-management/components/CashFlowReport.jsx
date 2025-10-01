import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CashFlowReport = () => {
  // Datos de ejemplo para el reporte
  const reportData = {
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    initialBalance: 273500000,
    inflows: [
      { description: 'Cobro a Cliente B (Factura FV-002)', amount: 1500000 },
      { description: 'Abono Cliente C', amount: 500000 },
    ],
    outflows: [
      { description: 'Pago a Proveedor A (Factura FAC-001)', amount: -800000 },
      { description: 'Pago de Nómina (Quincena 1)', amount: -5200000 },
      { description: 'Compra de Suministros', amount: -150000 },
      { description: 'Nota Débito GMF', amount: -4800 },
    ],
  };

  const totalInflows = reportData.inflows.reduce((sum, item) => sum + item.amount, 0);
  const totalOutflows = reportData.outflows.reduce((sum, item) => sum + item.amount, 0);
  const netCashFlow = totalInflows + totalOutflows;
  const finalBalance = reportData.initialBalance + netCashFlow;

  return (
    <div className="bg-card border border-border rounded-lg mt-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Reporte de Flujo de Caja</h3>
        <Button variant="outline" size="sm" iconName="Download">Exportar PDF</Button>
      </div>

      <div className="space-y-4">
        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className='bg-muted/50 p-3 rounded-lg'><p className='text-sm text-muted-foreground'>Saldo Inicial</p><p className='font-mono font-semibold'>{reportData.initialBalance.toLocaleString('es-CO', {style:'currency', currency: 'COP'})}</p></div>
            <div className='bg-success/10 p-3 rounded-lg'><p className='text-sm text-success'>Total Ingresos</p><p className='font-mono font-semibold text-success'>{totalInflows.toLocaleString('es-CO', {style:'currency', currency: 'COP'})}</p></div>
            <div className='bg-error/10 p-3 rounded-lg'><p className='text-sm text-error'>Total Egresos</p><p className='font-mono font-semibold text-error'>{totalOutflows.toLocaleString('es-CO', {style:'currency', currency: 'COP'})}</p></div>
            <div className='bg-muted/50 p-3 rounded-lg'><p className='text-sm text-muted-foreground'>Saldo Final</p><p className='font-mono font-semibold'>{finalBalance.toLocaleString('es-CO', {style:'currency', currency: 'COP'})}</p></div>
        </div>

        {/* Detalle de Movimientos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entradas */}
            <div>
                <h4 className="font-medium mb-2 flex items-center text-success"><Icon name="ArrowDownCircle" size={18} className="mr-2"/>Entradas de Efectivo</h4>
                <div className="border border-border rounded-lg">
                    {reportData.inflows.map((item, index) => (
                        <div key={index} className="flex justify-between p-3 border-b border-border last:border-b-0">
                            <span className="text-sm">{item.description}</span>
                            <span className="font-mono text-sm">{item.amount.toLocaleString('es-CO', {style:'currency', currency: 'COP'})}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Salidas */}
            <div>
                <h4 className="font-medium mb-2 flex items-center text-error"><Icon name="ArrowUpCircle" size={18} className="mr-2"/>Salidas de Efectivo</h4>
                 <div className="border border-border rounded-lg">
                    {reportData.outflows.map((item, index) => (
                        <div key={index} className="flex justify-between p-3 border-b border-border last:border-b-0">
                            <span className="text-sm">{item.description}</span>
                            <span className="font-mono text-sm">{item.amount.toLocaleString('es-CO', {style:'currency', currency: 'COP'})}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowReport;