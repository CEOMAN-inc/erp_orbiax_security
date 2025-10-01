import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const SalesInvoiceDetailModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;
  
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const taxes = subtotal * 0.19;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Detalle Factura de Venta: {invoice.id}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4 bg-muted/50 p-4 rounded-lg">
            <div><span className="text-sm text-muted-foreground">Cliente</span><p className="font-medium">{invoice.client}</p></div>
            <div><span className="text-sm text-muted-foreground">Fecha Emisión</span><p>{invoice.issueDate}</p></div>
            <div><span className="text-sm text-muted-foreground">Fecha Venc.</span><p>{invoice.dueDate}</p></div>
            <div><span className="text-sm text-muted-foreground">Estado</span><p className="font-semibold text-primary">{invoice.status}</p></div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Items Facturados</h3>
            <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted/20">
                        <tr>
                            <th className="p-3 text-left font-medium text-sm">Descripción</th>
                            <th className="p-3 text-right font-medium text-sm">Cant.</th>
                            <th className="p-3 text-right font-medium text-sm">P. Unit</th>
                            <th className="p-3 text-right font-medium text-sm">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index} className="border-b border-border last:border-b-0">
                                <td className="p-3">{item.description}</td>
                                <td className="p-3 text-right">{item.quantity}</td>
                                <td className="p-3 text-right font-mono">{item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="p-3 text-right font-mono">{(item.quantity * item.price).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>

          <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                  <div className="flex justify-between"><span>Subtotal:</span><span className="font-mono">{subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
                  <div className="flex justify-between"><span>IVA (19%):</span><span className="font-mono">{taxes.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total Factura:</span><span className="font-mono">{invoice.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
                  <div className="flex justify-between text-success"><span>Pagado:</span><span className="font-mono">{(invoice.total - invoice.balance).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
                  <div className="flex justify-between font-bold text-lg"><span>Saldo Pendiente:</span><span className="font-mono">{invoice.balance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
              </div>
          </div>

        </div>
        <div className="flex justify-end p-6 border-t border-border mt-auto">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceDetailModal;