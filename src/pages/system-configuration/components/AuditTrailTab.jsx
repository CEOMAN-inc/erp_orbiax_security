import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrailTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [dateRange, setDateRange] = useState("7");

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-01-14 17:25:00",
      user: "Carlos Rodríguez",
      userRole: "Administrator",
      action: "user_created",
      actionLabel: "Usuario Creado",
      resource: "Usuario",
      resourceId: "user_45",
      details: "Creó usuario \'María González\' con rol Administrativo",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium"
    },
    {
      id: 2,
      timestamp: "2025-01-14 16:45:00",
      user: "María González",
      userRole: "Administrativo",
      action: "contract_updated",
      actionLabel: "Contrato Actualizado",
      resource: "Contrato",
      resourceId: "contract_123",
      details: "Actualizó términos del contrato CON-2025-001",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high"
    },
    {
      id: 3,
      timestamp: "2025-01-14 15:30:00",
      user: "José Martínez",
      userRole: "Supervisor",
      action: "incident_created",
      actionLabel: "Incidente Creado",
      resource: "Incidente",
      resourceId: "incident_789",
      details: "Reportó incidente crítico en Zona Norte",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0",
      severity: "critical"
    },
    {
      id: 4,
      timestamp: "2025-01-14 14:15:00",
      user: "Ana López",
      userRole: "Guarda",
      action: "attendance_marked",
      actionLabel: "Asistencia Marcada",
      resource: "Asistencia",
      resourceId: "attendance_456",
      details: "Marcó entrada en turno nocturno",
      ipAddress: "192.168.1.115",
      userAgent: "OrbiaxMobile/1.2.0 (Android 11)",
      severity: "low"
    },
    {
      id: 5,
      timestamp: "2025-01-14 13:00:00",
      user: "Carlos Rodríguez",
      userRole: "Administrator",
      action: "system_config_changed",
      actionLabel: "Configuración Cambiada",
      resource: "Sistema",
      resourceId: "config_security",
      details: "Modificó políticas de seguridad del sistema",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high"
    },
    {
      id: 6,
      timestamp: "2025-01-14 12:30:00",
      user: "María González",
      userRole: "Administrativo",
      action: "invoice_generated",
      actionLabel: "Factura Generada",
      resource: "Factura",
      resourceId: "invoice_001",
      details: "Generó factura FAC-2025-001 por $2,500,000",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium"
    }
  ];

  const actionOptions = [
    { value: "", label: "Todas las acciones" },
    { value: "user_created", label: "Usuario Creado" },
    { value: "user_updated", label: "Usuario Actualizado" },
    { value: "user_deleted", label: "Usuario Eliminado" },
    { value: "contract_created", label: "Contrato Creado" },
    { value: "contract_updated", label: "Contrato Actualizado" },
    { value: "incident_created", label: "Incidente Creado" },
    { value: "attendance_marked", label: "Asistencia Marcada" },
    { value: "system_config_changed", label: "Configuración Cambiada" },
    { value: "invoice_generated", label: "Factura Generada" }
  ];

  const userOptions = [
    { value: "", label: "Todos los usuarios" },
    { value: "Carlos Rodríguez", label: "Carlos Rodríguez" },
    { value: "María González", label: "María González" },
    { value: "José Martínez", label: "José Martínez" },
    { value: "Ana López", label: "Ana López" }
  ];

  const dateRangeOptions = [
    { value: "1", label: "Último día" },
    { value: "7", label: "Últimos 7 días" },
    { value: "30", label: "Últimos 30 días" },
    { value: "90", label: "Últimos 90 días" },
    { value: "custom", label: "Rango personalizado" }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.details?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.actionLabel?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesAction = !selectedAction || log?.action === selectedAction;
    const matchesUser = !selectedUser || log?.user === selectedUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const getSeverityBadge = (severity) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    const severityColors = {
      low: 'bg-success/20 text-success',
      medium: 'bg-warning/20 text-warning',
      high: 'bg-accent/20 text-accent',
      critical: 'bg-error/20 text-error'
    };
    return `${baseClasses} ${severityColors?.[severity] || 'bg-muted/20 text-muted-foreground'}`;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      low: 'Info',
      medium: 'AlertCircle',
      high: 'AlertTriangle',
      critical: 'AlertOctagon'
    };
    return icons?.[severity] || 'Info';
  };

  const getRoleBadge = (role) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    const roleColors = {
      'Administrator': 'bg-primary/20 text-primary',
      'Administrativo': 'bg-secondary/20 text-secondary',
      'Supervisor': 'bg-accent/20 text-accent',
      'Guarda': 'bg-warning/20 text-warning'
    };
    return `${baseClasses} ${roleColors?.[role] || 'bg-muted/20 text-muted-foreground'}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Registro de Auditoría</h2>
          <p className="text-muted-foreground">Historial completo de actividades del sistema</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="Download">
            Exportar Logs
          </Button>
          <Button variant="outline" iconName="Archive">
            Archivar Antiguos
          </Button>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {auditLogs?.filter(log => log?.severity === 'critical')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Eventos Críticos</div>
            </div>
            <div className="w-12 h-12 bg-error/20 rounded-lg flex items-center justify-center">
              <Icon name="AlertOctagon" size={24} color="var(--color-error)" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {auditLogs?.filter(log => log?.severity === 'high')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Alta Prioridad</div>
            </div>
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} color="var(--color-accent)" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{auditLogs?.length}</div>
              <div className="text-sm text-muted-foreground">Total Eventos</div>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={24} color="var(--color-primary)" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-sm text-muted-foreground">Usuarios Activos</div>
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} color="var(--color-secondary)" />
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Buscar en logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            placeholder="Filtrar por acción"
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
          />
          <Select
            placeholder="Filtrar por usuario"
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
          />
          <Select
            placeholder="Rango de fechas"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>
      {/* Audit Logs */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            Registros de Auditoría ({filteredLogs?.length})
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          {filteredLogs?.map((log) => (
            <div key={log?.id} className="p-6 hover:bg-muted/10 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Severity Icon */}
                  <div className={`p-2 rounded-lg ${
                    log?.severity === 'critical' ? 'bg-error/20' :
                    log?.severity === 'high' ? 'bg-accent/20' :
                    log?.severity === 'medium'? 'bg-warning/20' : 'bg-success/20'
                  }`}>
                    <Icon 
                      name={getSeverityIcon(log?.severity)} 
                      size={20}
                      color={
                        log?.severity === 'critical' ? 'var(--color-error)' :
                        log?.severity === 'high' ? 'var(--color-accent)' :
                        log?.severity === 'medium' ? 'var(--color-warning)' :
                        'var(--color-success)'
                      }
                    />
                  </div>
                  
                  {/* Log Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-foreground">{log?.actionLabel}</h4>
                      <span className={getSeverityBadge(log?.severity)}>
                        {log?.severity === 'critical' ? 'Crítico' :
                         log?.severity === 'high' ? 'Alto' :
                         log?.severity === 'medium' ? 'Medio' : 'Bajo'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{log?.details}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-medium text-muted-foreground">Usuario: </span>
                        <span className="text-foreground">{log?.user}</span>
                        <span className={`ml-2 ${getRoleBadge(log?.userRole)}`}>
                          {log?.userRole}
                        </span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-muted-foreground">Recurso: </span>
                        <span className="text-foreground">{log?.resource}</span>
                        <span className="text-muted-foreground ml-1">({log?.resourceId})</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-muted-foreground">IP: </span>
                        <span className="text-foreground font-mono">{log?.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timestamp */}
                <div className="text-right ml-4">
                  <div className="text-sm font-medium text-foreground">
                    {new Date(log.timestamp)?.toLocaleDateString('es-ES')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.timestamp)?.toLocaleTimeString('es-ES')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredLogs?.length === 0 && (
          <div className="p-12 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron registros</h3>
            <p className="text-muted-foreground mb-4">
              No hay registros que coincidan con los filtros aplicados
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedAction("");
              setSelectedUser("");
            }}>
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTrailTab;