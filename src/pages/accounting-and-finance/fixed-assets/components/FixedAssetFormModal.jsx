import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const FixedAssetFormModal = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    const categoryOptions = [
        { value: 'Vehículos', label: 'Vehículos' },
        { value: 'Equipo de Cómputo', label: 'Equipo de Cómputo' },
        { value: 'Maquinaria', label: 'Maquinaria' },
        { value: 'Edificios', label: 'Edificios' },
    ];

    const methodOptions = [
        { value: 'Linea Recta', label: 'Línea Recta' },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-6 border-b"><h2 className="text-xl font-semibold">Registrar Activo Fijo</h2><Button variant="ghost" size="icon" onClick={onClose} iconName="X" /></div>
                <div className="p-6 space-y-4">
                    <Input label="Descripción del Activo" placeholder="Ej: Vehículo Patrulla Toyota Hilux" required/>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="ID / Etiqueta del Activo" placeholder="Ej: VP-003"/>
                        <Select label="Categoría" options={categoryOptions} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Fecha de Adquisición" type="date" required/>
                        <Input label="Costo de Adquisición" type="number" placeholder="0" required/>
                    </div>
                     <div className="grid grid-cols-3 gap-4">
                        <Input label="Vida Útil (Años)" type="number" placeholder="5" required/>
                        <Input label="Valor Residual" type="number" placeholder="0"/>
                        <Select label="Método de Depreciación" options={methodOptions} />
                    </div>
                </div>
                <div className="flex justify-end p-6 border-t space-x-3"><Button variant="outline" onClick={onClose}>Cancelar</Button><Button onClick={onSave}>Guardar Activo</Button></div>
            </div>
        </div>
    );
};

export default FixedAssetFormModal;