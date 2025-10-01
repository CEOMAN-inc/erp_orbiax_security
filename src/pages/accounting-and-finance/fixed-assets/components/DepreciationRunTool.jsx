import React from 'react';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

const DepreciationRunTool = ({ isOpen, onClose, onRun }) => {
    if (!isOpen) return null;
    
    const periodOptions = [ { value: '2025-09', label: 'Septiembre 2025' }, { value: '2025-08', label: 'Agosto 2025' } ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-lg">
                <div className="flex items-center justify-between p-6 border-b"><h2 className="text-xl font-semibold">Ejecutar Depreciación Mensual</h2><Button variant="ghost" size="icon" onClick={onClose} iconName="X" /></div>
                <div className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground">Esta herramienta calculará y contabilizará el gasto por depreciación para todos los activos elegibles en el período seleccionado. Esta acción no se puede deshacer.</p>
                    <Select label="Seleccionar Período a Depreciar" options={periodOptions} />
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Cálculo estimado para Septiembre 2025:</p>
                        <p className="text-2xl font-bold text-primary mt-2">~$ 12.540.000,00</p>
                        <p className="text-xs text-muted-foreground">(Afectando 85 activos)</p>
                    </div>
                </div>
                <div className="flex justify-end p-6 border-t space-x-3"><Button variant="outline" onClick={onClose}>Cancelar</Button><Button onClick={onRun} iconName="Play">Contabilizar Depreciación</Button></div>
            </div>
        </div>
    );
};

export default DepreciationRunTool;