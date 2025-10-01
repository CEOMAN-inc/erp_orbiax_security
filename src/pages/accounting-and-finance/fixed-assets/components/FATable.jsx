import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const FATable = ({ assets, onEdit, onDisposal }) => {
    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden mt-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium">Activo</th>
                            <th className="p-4 text-left text-sm font-medium">Categoría</th>
                            <th className="p-4 text-left text-sm font-medium">Fecha Adquisición</th>
                            <th className="p-4 text-right text-sm font-medium">Costo Original</th>
                            <th className="p-4 text-right text-sm font-medium">Dep. Acumulada</th>
                            <th className="p-4 text-right text-sm font-medium">Valor en Libros</th>
                            <th className="p-4 text-center text-sm font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {assets.map((asset) => (
                            <tr key={asset.id} className="hover:bg-muted/30">
                                <td className="p-4"><p className="font-medium">{asset.description}</p><p className="text-xs text-muted-foreground font-mono">{asset.id}</p></td>
                                <td className="p-4 text-sm">{asset.category}</td>
                                <td className="p-4 text-sm text-muted-foreground">{asset.acquisitionDate}</td>
                                <td className="p-4 text-right font-mono">{asset.cost.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="p-4 text-right font-mono text-warning">{asset.accumulatedDepreciation.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="p-4 text-right font-mono font-semibold">{asset.bookValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center space-x-1">
                                        <Button variant="ghost" size="icon" title="Editar Activo" onClick={() => onEdit(asset)}><Icon name="Edit" size={16} /></Button>
                                        <Button variant="ghost" size="icon" title="Dar de Baja" onClick={() => onDisposal(asset)}><Icon name="Trash2" size={16} className="text-error" /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FATable;