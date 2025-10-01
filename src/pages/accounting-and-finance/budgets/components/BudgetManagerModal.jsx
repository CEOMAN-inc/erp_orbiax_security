import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const BudgetManagerModal = ({ isOpen, onClose }) => {
    if(!isOpen) return null;

    // Datos de ejemplo para las versiones de presupuesto
    const budgetVersions = [
        { id: 'v1-2025', name: 'Presupuesto 2025 - Aprobado', status: 'Activo', year: 2025 },
        { id: 'v2-2025', name: 'Presupuesto 2025 - Escenario Pesimista', status: 'Archivo', year: 2025 },
        { id: 'v1-2024', name: 'Presupuesto 2024 - Cierre Final', status: 'Archivado', year: 2024 },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">Gestionar Versiones de Presupuesto</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-end">
                        <Button size="sm" iconName="Plus">Crear Nuevo Presupuesto</Button>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="p-3 text-left font-medium">Nombre de la Versión</th>
                                    <th className="p-3 text-left font-medium">Año</th>
                                    <th className="p-3 text-left font-medium">Estado</th>
                                    <th className="p-3 text-center font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {budgetVersions.map(version => (
                                    <tr key={version.id} className="hover:bg-muted/50">
                                        <td className="p-3 font-medium">{version.name}</td>
                                        <td className="p-3 text-muted-foreground">{version.year}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${version.status === 'Activo' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                                                {version.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center space-x-1">
                                                <Button variant="ghost" size="sm" iconName="Copy">Copiar</Button>
                                                <Button variant="ghost" size="sm" iconName="Archive">Archivar</Button>
                                                <Button variant="ghost" size="sm" iconName="Trash2" className="text-error" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end p-4 border-t">
                    <Button variant="outline" onClick={onClose}>Cerrar</Button>
                </div>
            </div>
        </div>
    );
};

export default BudgetManagerModal;