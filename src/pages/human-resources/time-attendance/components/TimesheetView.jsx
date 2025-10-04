import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const TimesheetView = () => {
  // Mock data para el historial de marcaciones
  const timeRecords = [
    { date: '2025-10-03', clockIn: '08:01:15', clockOut: '17:35:45', totalHours: 8.5, status: 'Completo' },
    { date: '2025-10-02', clockIn: '07:58:30', clockOut: '17:30:10', totalHours: 8.5, status: 'Completo' },
    { date: '2025-10-01', clockIn: '08:15:05', clockOut: '17:32:00', totalHours: 8.2, status: 'Incompleto' },
    { date: '2025-09-30', clockIn: '08:05:20', clockOut: '18:45:50', totalHours: 9.7, status: 'Horas Extra' },
    { date: '2025-09-29', date: '2025-09-29', clockIn: null, clockOut: null, totalHours: 0, status: 'Ausencia (Vacaciones)' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completo': return 'bg-success/20 text-success';
      case 'Horas Extra': return 'bg-primary/20 text-primary';
      case 'Incompleto': return 'bg-warning/20 text-warning';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Mi Hoja de Tiempos (Últimos 7 días)</h3>
        <Button variant="outline" size="sm" iconName="Calendar">Ver Mes Completo</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left text-sm font-medium">Fecha</th>
              <th className="p-3 text-center text-sm font-medium">Entrada</th>
              <th className="p-3 text-center text-sm font-medium">Salida</th>
              <th className="p-3 text-right text-sm font-medium">Total Horas</th>
              <th className="p-3 text-center text-sm font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {timeRecords.map((record) => (
              <tr key={record.date} className="hover:bg-muted/30">
                <td className="p-3 font-medium">{record.date}</td>
                <td className="p-3 text-center font-mono text-sm text-muted-foreground">{record.clockIn || '--:--:--'}</td>
                <td className="p-3 text-center font-mono text-sm text-muted-foreground">{record.clockOut || '--:--:--'}</td>
                <td className="p-3 text-right font-mono font-semibold">{record.totalHours.toFixed(2)}h</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimesheetView;