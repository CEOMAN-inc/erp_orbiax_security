import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

const JobOpeningModal = ({ isOpen, onClose, onSave, existingVacancy }) => {
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        description: '',
        requirements: '',
        status: 'Abierta',
    });

    if (!isOpen) return null;
    
    const departmentOptions = [
        { value: 'Operaciones', label: 'Operaciones' },
        { value: 'Administrativo', label: 'Administrativo' },
        { value: 'Tecnología', label: 'Tecnología' },
    ];
    
    const statusOptions = [
        { value: 'Abierta', label: 'Abierta' },
        { value: 'Cerrada', label: 'Cerrada' },
        { value: 'En Pausa', label: 'En Pausa' },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">{existingVacancy ? 'Editar Vacante' : 'Crear Nueva Vacante'}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Título del Cargo" placeholder="Ej: Supervisor de Zona" required />
                        <Select label="Departamento" options={departmentOptions} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Descripción del Puesto</label>
                        <textarea rows="4" className="w-full p-2 bg-input border border-border rounded-lg text-sm" placeholder="Responsabilidades, funciones del día a día..."></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Requisitos</label>
                        <textarea rows="3" className="w-full p-2 bg-input border border-border rounded-lg text-sm" placeholder="Experiencia, habilidades, certificaciones..."></textarea>
                    </div>
                    <Select label="Estado de la Vacante" options={statusOptions} />
                </div>
                <div className="flex justify-end p-6 border-t space-x-3">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={() => onSave({})}>{existingVacancy ? 'Guardar Cambios' : 'Crear Vacante'}</Button>
                </div>
            </div>
        </div>
    );
};

export default JobOpeningModal;