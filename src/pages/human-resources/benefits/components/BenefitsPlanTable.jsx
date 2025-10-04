import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const BenefitsPlanTable = ({ plans, onEdit, onToggleStatus }) => {
    const formatCurrency = (value) => value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden mt-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium">Nombre del Plan</th>
                            <th className="p-4 text-left text-sm font-medium">Tipo</th>
                            <th className="p-4 text-left text-sm font-medium">Proveedor</th>
                            <th className="p-4 text-right text-sm font-medium">Costo Mensual</th>
                            <th className="p-4 text-right text-sm font-medium">Aporte Empleador</th>
                            <th className="p-4 text-right text-sm font-medium">Aporte Empleado</th>
                            <th className="p-4 text-center text-sm font-medium">Estado</th>
                            <th className="p-4 text-center text-sm font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {plans.map((plan) => (
                            <tr key={plan.id} className="hover:bg-muted/30">
                                <td className="p-4 font-medium">{plan.name}</td>
                                <td className="p-4 text-sm text-muted-foreground">{plan.type}</td>
                                <td className="p-4 text-sm text-muted-foreground">{plan.provider}</td>
                                <td className="p-4 text-right font-mono">{formatCurrency(plan.totalCost)}</td>
                                <td className="p-4 text-right font-mono">{formatCurrency(plan.employerContribution)} ({plan.employerPercentage}%)</td>
                                <td className="p-4 text-right font-mono">{formatCurrency(plan.employeeContribution)} ({100 - plan.employerPercentage}%)</td>
                                <td className="p-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${plan.status === 'Activo' ? 'bg-success/20 text-success' : 'bg-muted/20'}`}>
                                        {plan.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center space-x-1">
                                        <Button variant="ghost" size="icon" title="Editar Plan" onClick={() => onEdit(plan)}><Icon name="Edit" size={16} /></Button>
                                        <Button variant="ghost" size="icon" title={plan.status === 'Activo' ? 'Desactivar' : 'Activar'} onClick={() => onToggleStatus(plan.id)}>
                                            <Icon name={plan.status === 'Activo' ? 'PowerOff' : 'Power'} size={16} />
                                        </Button>
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

export default BenefitsPlanTable;