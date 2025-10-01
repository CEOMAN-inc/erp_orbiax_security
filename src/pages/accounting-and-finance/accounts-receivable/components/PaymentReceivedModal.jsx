import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const PaymentReceivedModal = ({ isOpen, onClose, onSave, invoice }) => {
  const [amount, setAmount] = useState(invoice?.balance || 0);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Transferencia');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Registrar Ingreso</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        <div className="p-6 space-y-4">
          <div className='bg-muted/50 p-3 rounded-lg text-center'>
            <p className='text-sm text-muted-foreground'>Saldo Pendiente Factura {invoice.id}</p>
            <p className='text-xl font-bold'>{invoice.balance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
          </div>
          <Input label="Monto Recibido" type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} max={invoice.balance} />
          <Input label="Fecha del Ingreso" type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} />
          <Select label="Método de Ingreso" options={[{value: 'Transferencia', label: 'Transferencia'}, {value: 'Efectivo', label: 'Efectivo'}, {value: 'PSE', label: 'PSE'}]} value={paymentMethod} onChange={setPaymentMethod} />
        </div>
        <div className="flex justify-end p-6 border-t border-border space-x-3">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave({ amount, paymentDate, paymentMethod })}>Confirmar Ingreso</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceivedModal;