import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ApprovalQueue = () => {
  // Mock data para las solicitudes pendientes
  const pendingRequests = [
    { id: 'REQ-001', employeeName: 'Carlos Rodríguez', leaveType: 'Vacaciones', startDate: '2025-11-10', endDate: '2025-11-15', days: 5, status: 'Pendiente' },
    { id: 'REQ-002', employeeName: 'Javier Morales', leaveType: 'Incapacidad Médica', startDate: '2025-10-05', endDate: '2025-10-06', days: 2, status: 'Pendiente' },
    { id: 'REQ-003', employeeName: 'Ana María González', leaveType: 'Permiso Remunerado', startDate: '2025-10-20', endDate: '2025-10-20', days: 1, status: 'Pendiente' },
  ];

  const handleApprove = (requestId) => {
    alert(`Solicitud ${requestId} APROBADA.`);
    // Aquí iría la lógica para actualizar el estado de la solicitud
  };

  const handleReject = (requestId) => {
    const reason = prompt("Por favor, ingresa un motivo para el rechazo:");
    if (reason) {
      alert(`Solicitud ${requestId} RECHAZADA. Motivo: ${reason}`);
      // Lógica para actualizar el estado y guardar el motivo
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Solicitudes Pendientes de Aprobación</h3>
        <span className="text-sm text-muted-foreground">{pendingRequests.length} pendientes</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left text-sm font-medium">Empleado</th>
              <th className="p-3 text-left text-sm font-medium">Tipo de Ausencia</th>
              <th className="p-3 text-left text-sm font-medium">Fechas</th>
              <th className="p-3 text-center text-sm font-medium">Días</th>
              <th className="p-3 text-center text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pendingRequests.map((req) => (
              <tr key={req.id} className="hover:bg-muted/30">
                <td className="p-3 font-medium">{req.employeeName}</td>
                <td className="p-3 text-sm text-muted-foreground">{req.leaveType}</td>
                <td className="p-3 text-sm text-muted-foreground">{req.startDate} al {req.endDate}</td>
                <td className="p-3 text-center text-sm font-semibold">{req.days}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="destructive" size="sm" onClick={() => handleReject(req.id)}>Rechazar</Button>
                    <Button variant="success" size="sm" onClick={() => handleApprove(req.id)}>Aprobar</Button>
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

export default ApprovalQueue;