import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const LeaveRequestModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const leaveTypeOptions = [
    { value: 'vacaciones', label: 'Vacaciones' },
    { value: 'incapacidad', label: 'Incapacidad Médica' },
    { value: 'permiso_remunerado', label: 'Permiso Remunerado' },
    { value: 'permiso_no_remunerado', label: 'Permiso No Remunerado' },
    { value: 'calamidad', label: 'Calamidad Doméstica' },
  ];

  const handleSave = () => {
    // Aquí iría la validación de datos antes de guardar
    console.log("Guardando solicitud:", formData);
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Solicitar Ausencia</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        <div className="p-6 space-y-4">
          <Select 
            label="Tipo de Ausencia" 
            options={leaveTypeOptions} 
            value={formData.leaveType}
            onChange={(value) => setFormData({...formData, leaveType: value})}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Fecha de Inicio" 
              type="date" 
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />
            <Input 
              label="Fecha de Fin" 
              type="date" 
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Motivo o Comentario
            </label>
            <textarea 
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              rows="3" 
              className="w-full p-2 bg-input border border-border rounded-lg text-sm" 
              placeholder="Explica brevemente el motivo de tu ausencia (opcional)..."
            ></textarea>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Tu saldo de vacaciones actual es de <span className="font-bold text-primary">8.5 días</span>.</p>
          </div>
        </div>
        <div className="flex justify-end p-6 border-t space-x-3">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} iconName="Send">Enviar Solicitud</Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;