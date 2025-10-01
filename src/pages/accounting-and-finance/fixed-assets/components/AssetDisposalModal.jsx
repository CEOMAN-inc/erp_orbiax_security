import React from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const AssetDisposalModal = ({ isOpen, onClose, onConfirm, asset }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-lg">
                <div className="flex items-center justify-between p-6 border-b"><h2 className="text-xl font-semibold">Dar de Baja Activo Fijo</h2><Button variant="ghost" size="icon" onClick={onClose} iconName="X" /></div>
                <div className="p-6 space-y-4">
                    <div className="bg-muted/50 p-3 rounded-lg"><p className="text-sm font-medium">{asset.description}</p><p className="text-xs text-muted-foreground">Valor en Libros Actual: {asset.bookValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p></div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Fecha de Baja" type="date" required/>
                        <Select label="Motivo de Baja" options={[{value: 'Venta', label: 'Venta'}, {value: 'Desecho', label: 'Desecho o Pérdida'}]} />
                    </div>
                    <Input label="Valor de Venta (si aplica)" type="number" placeholder="0" />
                    <p className="text-center text-sm bg-warning/10 text-warning p-3 rounded-lg">Esta acción retirará el activo de la contabilidad permanentemente.</p>
                </div>
                <div className="flex justify-end p-6 border-t space-x-3"><Button variant="outline" onClick={onClose}>Cancelar</Button><Button variant="destructive" onClick={onConfirm}>Confirmar Baja</Button></div>
            </div>
        </div>
    );
};

export default AssetDisposalModal;