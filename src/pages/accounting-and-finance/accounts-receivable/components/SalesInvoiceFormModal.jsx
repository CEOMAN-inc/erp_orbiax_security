import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const mockClients = [
    { value: 'Banco Nacional', label: 'Banco Nacional' },
    { value: 'Centro Comercial Plaza', label: 'Centro Comercial Plaza' },
    { value: 'Residencial Norte', label: 'Residencial Norte' },
];

const SalesInvoiceFormModal = ({ isOpen, onClose, onSave, existingInvoice }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen) {
            setFormData(existingInvoice || {
                client: '',
                invoiceNumber: `FV-${Date.now().toString().slice(-6)}`,
                issueDate: new Date().toISOString().split('T')[0],
                dueDate: '',
                items: [{ description: '', quantity: 1, price: 0 }],
                notes: ''
            });
        }
    }, [existingInvoice, isOpen]);
    
    const itemsWithTotals = useMemo(() => formData.items?.map(item => ({...item, total: (item.quantity || 0) * (item.price || 0)})) || [], [formData.items]);
    const subtotal = useMemo(() => itemsWithTotals.reduce((sum, item) => sum + item.total, 0), [itemsWithTotals]);
    const taxes = subtotal * 0.19;
    const total = subtotal + taxes;

    const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData(prev => ({ ...prev, items: newItems }));
    };
    const addItem = () => setFormData(prev => ({...prev, items: [...prev.items, { description: '', quantity: 1, price: 0 }]}));
    const removeItem = (index) => {
        if (formData.items.length > 1) {
            setFormData(prev => ({...prev, items: prev.items.filter((_, i) => i !== index)}));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">{existingInvoice ? 'Editar Factura de Venta' : 'Crear Factura de Venta'}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
                </div>
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Select label="Cliente" options={mockClients} value={formData.client} onChange={val => handleInputChange('client', val)} required />
                        <Input label="N° de Factura" value={formData.invoiceNumber} disabled />
                        <Input label="Fecha de Emisión" type="date" value={formData.issueDate} onChange={e => handleInputChange('issueDate', e.target.value)} required />
                        <Input label="Fecha de Vencimiento" type="date" value={formData.dueDate} onChange={e => handleInputChange('dueDate', e.target.value)} required />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Detalle de la Factura</h3>
                        <div className="overflow-x-auto border border-border rounded-lg">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="p-3 text-left font-medium text-sm w-1/2">Servicio Prestado</th>
                                        <th className="p-3 text-right font-medium text-sm">Cantidad</th>
                                        <th className="p-3 text-right font-medium text-sm">Precio Unit.</th>
                                        <th className="p-3 text-right font-medium text-sm">Total</th>
                                        <th className="p-3 w-12"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemsWithTotals.map((item, index) => (
                                        <tr key={index} className="border-b border-border last:border-b-0">
                                            <td className="p-1"><Input value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} placeholder="Descripción del servicio" /></td>
                                            <td className="p-1"><Input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="text-right" /></td>
                                            <td className="p-1"><Input type="number" value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} className="text-right" /></td>
                                            <td className="p-3 text-right text-sm font-mono">{item.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                            <td className="p-1 text-center"><Button variant="ghost" size="icon" onClick={() => removeItem(index)} disabled={formData.items.length <= 1}><Icon name="Trash2" size={16} /></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button variant="outline" size="sm" onClick={addItem} iconName="Plus" className="mt-4">Añadir Fila</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Notas</label>
                            <textarea value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} rows="4" className="w-full p-2 bg-input border border-border rounded-lg text-sm" placeholder="Términos de pago, información adicional..."></textarea>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2 flex flex-col justify-center">
                            <div className="flex justify-between text-sm"><span>Subtotal:</span><span className="font-mono">{subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
                            <div className="flex justify-between text-sm"><span>IVA (19%):</span><span className="font-mono">{taxes.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
                            <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2"><span>Total:</span><span className="font-mono">{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-border mt-auto space-x-3">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={() => onSave(formData)}>{existingInvoice ? 'Guardar Cambios' : 'Crear Factura'}</Button>
                </div>
            </div>
        </div>
    );
};

export default SalesInvoiceFormModal;