import React, { useState, useEffect } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const BenefitPlanModal = ({ isOpen, onClose, onSave, existingPlan }) => {
    const [formData, setFormData] = useState({ name: '', type: '', provider: '', totalCost: 0, employerPercentage: 100 });

    useEffect(() => {
        if (isOpen) {
            setFormData(existingPlan || { name: '', type: '', provider: '', totalCost: 0, employerPercentage: 100 });
        }
    }, [existingPlan, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    if (!isOpen) return null;

    const employerContribution = (formData.totalCost * (formData.employerPercentage / 100));
    const employeeContribution = formData.totalCost - employerContribution;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-6 border-b"><h2 className="text-xl font-semibold">{existingPlan ? 'Editar Plan de Beneficio' : 'Crear Nuevo Plan de Beneficio'}</h2><Button variant="ghost" size="icon" onClick={onClose} iconName="X" /></div>
                <div className="p-6 space-y-4">
                    <Input label="Nombre del Plan" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="Ej: Plan Salud Gold" required/>
                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Tipo de Beneficio" options={[{value: 'Salud', label:'Salud'}, {value: 'Pensión Voluntaria', label:'Pensión Voluntaria'}]} value={formData.type} onChange={val => handleInputChange('type', val)} required />
                        <Input label="Proveedor" value={formData.provider} onChange={e => handleInputChange('provider', e.target.value)} placeholder="Ej: Colsanitas" required/>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-end">
                        <Input label="Costo Total Mensual (COP)" type="number" value={formData.totalCost} onChange={e => handleInputChange('totalCost', parseFloat(e.target.value))} required/>
                        <div>
                            <label className="block text-sm font-medium mb-1">Aporte Empleador (%)</label>
                            <Input type="range" min="0" max="100" step="5" value={formData.employerPercentage} onChange={e => handleInputChange('employerPercentage', parseFloat(e.target.value))} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 bg-muted/50 p-3 rounded-lg">
                        <div><p className="text-sm text-muted-foreground">Aporte Empleador</p><p className="font-mono font-semibold">{employerContribution.toLocaleString('es-CO',{style:'currency',currency:'COP'})}</p></div>
                        <div><p className="text-sm text-muted-foreground">Aporte Empleado (Deducción)</p><p className="font-mono font-semibold">{employeeContribution.toLocaleString('es-CO',{style:'currency',currency:'COP'})}</p></div>
                    </div>
                </div>
                <div className="flex justify-end p-6 border-t space-x-3"><Button variant="outline" onClick={onClose}>Cancelar</Button><Button onClick={() => onSave(formData)}>{existingPlan ? 'Guardar Cambios' : 'Crear Plan'}</Button></div>
            </div>
        </div>
    );
};

export default BenefitPlanModal;