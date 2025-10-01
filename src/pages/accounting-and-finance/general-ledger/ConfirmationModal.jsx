import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", confirmVariant = "destructive" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md m-auto shadow-2xl">
        <div className="p-6">
          <div className="text-center">
            <Icon name="AlertTriangle" size={40} className="mx-auto text-warning mb-4" />
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{message}</p>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;