import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ImportStatementModal = ({ isOpen, onClose, onImport }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Importar Extracto Bancario</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>
        <div className="p-6 space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="UploadCloud" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Arrastra tu archivo aquí</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Soporta archivos CSV, OFX o Excel.
                </p>
                <input
                  type="file"
                  accept=".csv, .ofx, .xlsx"
                  className="hidden"
                  id="statement-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('statement-upload')?.click()}
                >
                  O selecciona un archivo
                </Button>
            </div>
            <p className='text-xs text-muted-foreground text-center'>Asegúrate de que el archivo contenga las columnas: Fecha, Descripción y Monto.</p>
        </div>
        <div className="flex justify-end p-6 border-t border-border space-x-3">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={onImport}>Importar y Mapear</Button>
        </div>
      </div>
    </div>
  );
};

export default ImportStatementModal;