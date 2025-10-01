import React from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const BudgetEditor = ({ isOpen, onClose, onSave, budgetData }) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">Editor de Presupuesto - 2025</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" iconName="Upload">Cargar desde CSV</Button>
                        <Button variant="outline" size="sm" iconName="History">Cargar año anterior +5%</Button>
                         <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                            <tr>
                                <th className="p-2 text-left font-medium w-64">Cuenta Contable</th>
                                {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map(month => (
                                    <th key={month} className="p-2 text-right font-medium min-w-[100px]">{month}</th>
                                ))}
                                <th className="p-2 text-right font-medium min-w-[120px]">Total Anual</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {budgetData.map((item, rowIndex) => (
                                <tr key={item.account} className="hover:bg-muted/50">
                                    <td className="p-1 font-medium text-xs sticky left-0 bg-card">{item.account}</td>
                                    {item.monthly.map((val, colIndex) => (
                                        <td key={colIndex} className="p-1"><Input type="number" defaultValue={val} className="text-right h-8 text-xs p-1" /></td>
                                    ))}
                                    <td className="p-2 text-right font-mono font-semibold text-primary">{item.monthly.reduce((a,b) => a+b, 0).toLocaleString('es-CO')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end p-4 border-t space-x-3">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onSave}>Guardar Presupuesto</Button>
                </div>
            </div>
        </div>
    );
};

export default BudgetEditor;