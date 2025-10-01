import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

// Datos de ejemplo para el selector de proveedores. En el futuro, esto vendrá de la base de datos.
const mockProviders = [
  { value: 'Proveedor de Equipos A', label: 'Proveedor de Equipos A' },
  { value: 'Servicios de Limpieza B', label: 'Servicios de Limpieza B' },
  { value: 'Suministros de Oficina C', label: 'Suministros de Oficina C' },
];

const InvoiceFormModal = ({ isOpen, onClose, onSave, existingInvoice }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (existingInvoice) {
        setFormData(existingInvoice);
      } else {
        // Estado inicial para una nueva factura
        setFormData({
          provider: '',
          invoiceNumber: '',
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: '',
          items: [{ description: '', quantity: 1, price: 0 }],
          notes: ''
        });
      }
    }
  }, [existingInvoice, isOpen]);

  // Derivamos los items con su total calculado para evitar guardarlo en el estado
  const itemsWithTotals = useMemo(() => 
    formData.items?.map(item => ({
      ...item,
      total: (item.quantity || 0) * (item.price || 0)
    })) || [], 
  [formData.items]);

  const subtotal = useMemo(() => 
    itemsWithTotals.reduce((sum, item) => sum + item.total, 0),
  [itemsWithTotals]);
  
  // Ejemplo de cálculo de impuestos
  const taxes = subtotal * 0.19; 
  const total = subtotal + taxes;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    const numericValue = field === 'description' ? value : parseFloat(value) || 0;
    newItems[index][field] = numericValue;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), { description: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSave = () => {
    const finalData = { ...formData, total, subtotal, taxes };
    onSave(finalData);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">{existingInvoice ? 'Editar Factura de Compra' : 'Registrar Factura de Compra'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* SECCIÓN DE INFORMACIÓN GENERAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select label="Proveedor" options={mockProviders} value={formData.provider} onChange={(val) => handleInputChange('provider', val)} required />
            <Input label="N° de Factura" value={formData.invoiceNumber} onChange={(e) => handleInputChange('invoiceNumber', e.target.value)} required />
            <Input label="Fecha de Emisión" type="date" value={formData.issueDate} onChange={(e) => handleInputChange('issueDate', e.target.value)} required />
            <Input label="Fecha de Vencimiento" type="date" value={formData.dueDate} onChange={(e) => handleInputChange('dueDate', e.target.value)} required />
          </div>

          {/* SECCIÓN DE ITEMS DE LA FACTURA */}
          <div>
            <h3 className="text-lg font-medium mb-2">Detalle de la Factura</h3>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-3 text-left font-medium text-sm w-1/2">Descripción</th>
                    <th className="p-3 text-right font-medium text-sm">Cantidad</th>
                    <th className="p-3 text-right font-medium text-sm">Precio Unit.</th>
                    <th className="p-3 text-right font-medium text-sm">Total</th>
                    <th className="p-3 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items?.map((item, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0">
                      <td className="p-1"><Input value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} placeholder="Producto o servicio" /></td>
                      <td className="p-1"><Input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="text-right" /></td>
                      <td className="p-1"><Input type="number" value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} className="text-right" /></td>
                      <td className="p-3 text-right text-sm font-mono">{(item.quantity * item.price).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                      <td className="p-1 text-center">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(index)} disabled={formData.items.length <= 1}><Icon name="Trash2" size={16} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="outline" size="sm" onClick={addItem} iconName="Plus" className="mt-4">Añadir Fila</Button>
          </div>

          {/* SECCIÓN DE TOTALES Y NOTAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Notas Adicionales</label>
              <textarea value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} rows="4" className="w-full p-2 bg-input border border-border rounded-lg text-sm" placeholder="Condiciones, comentarios..."></textarea>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-mono">{subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IVA (19%):</span>
                <span className="font-mono">{taxes.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
                <span>Total:</span>
                <span className="font-mono">{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end p-6 border-t border-border mt-auto space-x-3">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>{existingInvoice ? 'Guardar Cambios' : 'Registrar Factura'}</Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormModal;