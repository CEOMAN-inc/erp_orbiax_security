import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const InvoiceDetailModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Detalle Factura: {invoice.id}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* ... Aquí iría el contenido detallado de la factura ... */}
          <p>Proveedor: {invoice.provider}</p>
          <p>Fecha de Vencimiento: {invoice.dueDate}</p>
          <p>Saldo: {invoice.balance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
        </div>
        <div className="flex justify-end p-6 border-t border-border mt-auto">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailModal;