import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import Select from 'components/ui/Select';
import Input from 'components/ui/Input';

const PayrollRunWizard = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (step) {
      case 1: // Configuración del Período
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Paso 1: Configuración del Período</h3>
            <p className="text-sm text-muted-foreground">Selecciona el tipo y el rango de fechas para la liquidación.</p>
            <Select label="Tipo de Nómina" options={[{value: 'quincenal', label:'Quincenal'}, {value: 'mensual', label:'Mensual'}]} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Fecha de Inicio" type="date" />
              <Input label="Fecha de Fin" type="date" />
            </div>
          </div>
        );
      case 2: // Gestión de Novedades
        return (
           <div>
            <h3 className="font-semibold text-lg">Paso 2: Gestión de Novedades</h3>
            <p className="text-sm text-muted-foreground mb-4">Ingresa las horas extra, bonificaciones o deducciones del período.</p>
            {/* Aquí iría una tabla de empleados para ingresar novedades */}
            <div className="text-center bg-muted/50 p-8 rounded-lg">
                <p>Tabla de ingreso de novedades en construcción.</p>
            </div>
           </div>
        );
      case 3: // Pre-nómina y Revisión
        return (
            <div>
                <h3 className="font-semibold text-lg">Paso 3: Revisión y Pre-nómina</h3>
                <p className="text-sm text-muted-foreground mb-4">Verifica los cálculos para cada empleado antes de cerrar la nómina.</p>
                {/* Aquí iría la tabla de pre-nómina con los cálculos */}
                <div className="text-center bg-muted/50 p-8 rounded-lg">
                    <p>Tabla de pre-nómina con devengados, deducidos y neto a pagar en construcción.</p>
                </div>
            </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Asistente de Liquidación de Nómina</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          {renderStepContent()}
        </div>
        <div className="flex justify-between items-center p-6 border-t space-x-3">
          <Button variant="outline" onClick={() => setStep(s => Math.max(1, s-1))} disabled={step === 1}>Anterior</Button>
          <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Paso {step} de 3</span>
              {step < 3 && <Button onClick={() => setStep(s => Math.min(3, s+1))}>Siguiente</Button>}
              {step === 3 && <Button onClick={onSave} iconName="CheckCircle">Cerrar y Contabilizar</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollRunWizard;