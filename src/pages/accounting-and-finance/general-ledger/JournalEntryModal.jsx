import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const JournalEntryModal = ({ isOpen, onClose, onSave, existingEntry }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [ref, setRef] = useState('');
  const [movements, setMovements] = useState([
    { account: '', debit: 0, credit: 0 },
    { account: '', debit: 0, credit: 0 },
  ]);

  useEffect(() => {
    if (existingEntry) {
      setDate(existingEntry.date);
      setDescription(existingEntry.description);
      setRef(existingEntry.ref);
      setMovements(existingEntry.movements.map(({ account, debit, credit }) => ({ account, debit, credit })));
    } else {
      // Resetear para un nuevo asiento
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setRef('');
      setMovements([{ account: '', debit: 0, credit: 0 }, { account: '', debit: 0, credit: 0 }]);
    }
  }, [existingEntry, isOpen]);

  const { totalDebits, totalCredits, difference } = useMemo(() => {
    const debits = movements.reduce((sum, mov) => sum + parseFloat(mov.debit || 0), 0);
    const credits = movements.reduce((sum, mov) => sum + parseFloat(mov.credit || 0), 0);
    return { totalDebits: debits, totalCredits: credits, difference: debits - credits };
  }, [movements]);

  if (!isOpen) return null;

  const handleMovementChange = (index, field, value) => {
    const newMovements = [...movements];
    newMovements[index][field] = value;
    if (field === 'debit' && parseFloat(value) > 0) newMovements[index].credit = 0;
    if (field === 'credit' && parseFloat(value) > 0) newMovements[index].debit = 0;
    setMovements(newMovements);
  };

  const addMovement = () => setMovements([...movements, { account: '', debit: 0, credit: 0 }]);
  const removeMovement = (index) => {
    if (movements.length > 2) setMovements(movements.filter((_, i) => i !== index));
  };
  
  const handleSave = (status) => {
      if (description && difference === 0 && totalDebits > 0) {
          onSave({ date, description, ref, movements: movements.filter(m => m.account), status });
      } else {
          alert("Verifica que la descripción no esté vacía y que los débitos sean iguales a los créditos.");
      }
  };

  const accountOptions = [
    { value: '1105 - Caja', label: '1105 - Caja' },
    { value: '1110 - Bancos', label: '1110 - Bancos' },
    { value: '2205 - Proveedores Nacionales', label: '2205 - Proveedores Nacionales' },
    { value: '4135 - Ingresos por Ventas', label: '4135 - Ingresos por Ventas' },
    { value: '5135 - Servicios Públicos', label: '5135 - Servicios Públicos' },
    { value: '6205 - Compra de Mercancía', label: '6205 - Compra de Mercancía' },
  ];

  const isEditingDraft = existingEntry && existingEntry.status === 'Borrador';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{existingEntry ? 'Editar Asiento Contable' : 'Nuevo Asiento Contable'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Fecha" type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={!isEditingDraft && existingEntry} />
                <Input label="Descripción General" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej: Venta factura N°123" disabled={!isEditingDraft && existingEntry} />
                <Input label="Referencia" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Ej: FV-123" disabled={!isEditingDraft && existingEntry} />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left font-medium">Cuenta</th>
                            <th className="p-2 text-right font-medium">Débito</th>
                            <th className="p-2 text-right font-medium">Crédito</th>
                            <th className="p-2 w-12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movements.map((mov, index) => (
                            <tr key={index}>
                                <td className="p-1"><Select options={accountOptions} value={mov.account} onChange={(val) => handleMovementChange(index, 'account', val)} placeholder="Seleccionar cuenta..." searchable disabled={!isEditingDraft && existingEntry}/></td>
                                <td className="p-1"><Input type="number" className="text-right" value={mov.debit} onChange={(e) => handleMovementChange(index, 'debit', e.target.value)} disabled={!isEditingDraft && existingEntry}/></td>
                                <td className="p-1"><Input type="number" className="text-right" value={mov.credit} onChange={(e) => handleMovementChange(index, 'credit', e.target.value)} disabled={!isEditingDraft && existingEntry}/></td>
                                <td className="p-1">
                                    {(!existingEntry || isEditingDraft) && (
                                        <Button variant="ghost" size="icon" onClick={() => removeMovement(index)} disabled={movements.length <= 2}><Icon name="Trash2" size={16} /></Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {(!existingEntry || isEditingDraft) && (
                <Button variant="outline" size="sm" onClick={addMovement} iconName="Plus">Añadir Fila</Button>
            )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border mt-auto">
          <div className="flex space-x-6 text-sm">
              <div>Débitos: <span className="font-bold font-mono text-foreground">{totalDebits.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
              <div>Créditos: <span className="font-bold font-mono text-foreground">{totalCredits.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
              <div className={`${difference !== 0 ? 'text-error' : 'text-success'}`}>
                  Diferencia: <span className="font-bold font-mono">{difference.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
              </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            {(!existingEntry || isEditingDraft) && (
              <Button variant="secondary" onClick={() => handleSave('Borrador')} disabled={difference !== 0 || totalDebits === 0 || !description}>Guardar Borrador</Button>
            )}
            <Button onClick={() => handleSave('Contabilizado')} disabled={difference !== 0 || totalDebits === 0 || !description}>
                {existingEntry ? 'Actualizar Asiento' : 'Contabilizar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryModal;