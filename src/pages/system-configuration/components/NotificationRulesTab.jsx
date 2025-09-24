import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationRulesTab = () => {
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const notificationRules = [
    {
      id: 1,
      name: "Incidentes Críticos",
      description: "Notificación inmediata para incidentes de alta severidad",
      trigger: "incident_created",
      conditions: { severity: "critical" },
      channels: ["email", "sms", "app"],
      recipients: ["supervisors", "administrators"],
      status: "active",
      lastTriggered: "2025-01-14 15:30:00"
    },
    {
      id: 2,
      name: "Ausencias No Justificadas",
      description: "Alerta cuando un empleado no marca entrada en su turno",
      trigger: "attendance_missed",
      conditions: { delay_minutes: 30 },
      channels: ["app", "email"],
      recipients: ["supervisors"],
      status: "active",
      lastTriggered: "2025-01-14 08:45:00"
    },
    {
      id: 3,
      name: "Vencimiento de Certificaciones",
      description: "Recordatorio 30 días antes del vencimiento",
      trigger: "certification_expiring",
      conditions: { days_before: 30 },
      channels: ["email", "app"],
      recipients: ["employee", "hr"],
      status: "active",
      lastTriggered: "2025-01-13 09:00:00"
    },
    {
      id: 4,
      name: "Contratos por Renovar",
      description: "Alerta 60 días antes del vencimiento del contrato",
      trigger: "contract_expiring",
      conditions: { days_before: 60 },
      channels: ["email"],
      recipients: ["administrators", "sales"],
      status: "active",
      lastTriggered: "2025-01-12 10:00:00"
    },
    {
      id: 5,
      name: "Facturas Vencidas",
      description: "Notificación diaria de facturas pendientes de pago",
      trigger: "invoice_overdue",
      conditions: { days_overdue: 1 },
      channels: ["email", "app"],
      recipients: ["finance", "administrators"],
      status: "inactive",
      lastTriggered: "2025-01-10 12:00:00"
    }
  ];

  const triggerOptions = [
    { value: "incident_created", label: "Incidente Creado" },
    { value: "attendance_missed", label: "Ausencia No Justificada" },
    { value: "certification_expiring", label: "Certificación por Vencer" },
    { value: "contract_expiring", label: "Contrato por Renovar" },
    { value: "invoice_overdue", label: "Factura Vencida" },
    { value: "equipment_maintenance", label: "Mantenimiento de Equipo" },
    { value: "service_sla_breach", label: "Incumplimiento de SLA" }
  ];

  const channelOptions = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "app", label: "Aplicación" },
    { value: "webhook", label: "Webhook" }
  ];

  const recipientOptions = [
    { value: "administrators", label: "Administradores" },
    { value: "supervisors", label: "Supervisores" },
    { value: "hr", label: "Recursos Humanos" },
    { value: "finance", label: "Finanzas" },
    { value: "sales", label: "Ventas" },
    { value: "employee", label: "Empleado Afectado" }
  ];

  const severityOptions = [
    { value: "low", label: "Baja" },
    { value: "medium", label: "Media" },
    { value: "high", label: "Alta" },
    { value: "critical", label: "Crítica" }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-success/20 text-success`;
    }
    return `${baseClasses} bg-muted/20 text-muted-foreground`;
  };

  const getChannelIcon = (channel) => {
    const icons = {
      email: 'Mail',
      sms: 'MessageSquare',
      app: 'Bell',
      webhook: 'Webhook'
    };
    return icons?.[channel] || 'Bell';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'text-success',
      medium: 'text-warning',
      high: 'text-accent',
      critical: 'text-error'
    };
    return colors?.[severity] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Reglas de Notificación</h2>
          <p className="text-muted-foreground">Configura alertas automáticas y canales de notificación</p>
        </div>
        <Button 
          variant="default" 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => setShowAddRuleModal(true)}
        >
          Nueva Regla
        </Button>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {notificationRules?.filter(r => r?.status === 'active')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Reglas Activas</div>
            </div>
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {notificationRules?.filter(r => r?.status === 'inactive')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Reglas Inactivas</div>
            </div>
            <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={24} color="var(--color-muted-foreground)" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <div className="text-sm text-muted-foreground">Notificaciones Enviadas</div>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Send" size={24} color="var(--color-primary)" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">98.5%</div>
              <div className="text-sm text-muted-foreground">Tasa de Entrega</div>
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="var(--color-secondary)" />
            </div>
          </div>
        </div>
      </div>
      {/* Rules List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Reglas Configuradas</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {notificationRules?.map((rule) => (
              <div key={rule?.id} className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-foreground">{rule?.name}</h4>
                      <span className={getStatusBadge(rule?.status)}>
                        {rule?.status === 'active' ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{rule?.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Trigger */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">DISPARADOR</div>
                        <div className="text-sm text-foreground">
                          {triggerOptions?.find(t => t?.value === rule?.trigger)?.label}
                        </div>
                      </div>
                      
                      {/* Channels */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">CANALES</div>
                        <div className="flex items-center space-x-2">
                          {rule?.channels?.map((channel) => (
                            <div key={channel} className="flex items-center space-x-1">
                              <Icon name={getChannelIcon(channel)} size={14} />
                              <span className="text-sm text-foreground capitalize">{channel}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Last Triggered */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">ÚLTIMO DISPARO</div>
                        <div className="text-sm text-foreground">
                          {new Date(rule.lastTriggered)?.toLocaleString('es-ES')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      iconName="Edit"
                      onClick={() => setSelectedRule(rule)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      iconName={rule?.status === 'active' ? 'Pause' : 'Play'}
                    >
                      {rule?.status === 'active' ? 'Pausar' : 'Activar'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      iconName="MoreHorizontal"
                    >
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Nueva Regla de Notificación</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowAddRuleModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Información Básica</h4>
                <Input
                  label="Nombre de la Regla"
                  type="text"
                  placeholder="Ej: Incidentes Críticos"
                  required
                />
                <Input
                  label="Descripción"
                  type="text"
                  placeholder="Describe cuándo se activará esta regla"
                />
              </div>

              {/* Trigger Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Configuración del Disparador</h4>
                <Select
                  label="Evento Disparador"
                  placeholder="Seleccionar evento"
                  options={triggerOptions}
                  required
                />
                <Select
                  label="Severidad Mínima"
                  placeholder="Seleccionar severidad"
                  options={severityOptions}
                />
              </div>

              {/* Channels */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Canales de Notificación</h4>
                <div className="grid grid-cols-2 gap-4">
                  {channelOptions?.map((channel) => (
                    <Checkbox
                      key={channel?.value}
                      label={channel?.label}
                    />
                  ))}
                </div>
              </div>

              {/* Recipients */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Destinatarios</h4>
                <div className="grid grid-cols-2 gap-4">
                  {recipientOptions?.map((recipient) => (
                    <Checkbox
                      key={recipient?.value}
                      label={recipient?.label}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button 
                variant="outline"
                onClick={() => setShowAddRuleModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="default">
                Crear Regla
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationRulesTab;