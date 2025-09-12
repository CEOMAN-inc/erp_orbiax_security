import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ userRole = 'admin' }) => {
  const navigate = useNavigate();

  const getActionsForRole = () => {
    const commonActions = [
      {
        id: 'create-service',
        label: 'Crear Orden de Servicio',
        icon: 'Plus',
        variant: 'default',
        onClick: () => navigate('/service-orders')
      },
      {
        id: 'report-incident',
        label: 'Reportar Incidente',
        icon: 'AlertTriangle',
        variant: 'destructive',
        onClick: () => navigate('/incident-reporting')
      }
    ];

    const roleSpecificActions = {
      admin: [
        ...commonActions,
        {
          id: 'manage-personnel',
          label: 'Gestionar Personal',
          icon: 'Users',
          variant: 'outline',
          onClick: () => navigate('/personnel-management')
        },
        {
          id: 'view-assets',
          label: 'Ver Activos',
          icon: 'Package',
          variant: 'secondary',
          onClick: () => navigate('/asset-management')
        }
      ],
      supervisor: [
        ...commonActions,
        {
          id: 'roster-calendar',
          label: 'Calendario de Turnos',
          icon: 'Calendar',
          variant: 'outline',
          onClick: () => navigate('/roster-calendar')
        },
        {
          id: 'manage-personnel',
          label: 'Gestionar Equipo',
          icon: 'Users',
          variant: 'secondary',
          onClick: () => navigate('/personnel-management')
        }
      ],
      guard: [
        {
          id: 'my-schedule',
          label: 'Mi Horario',
          icon: 'Clock',
          variant: 'default',
          onClick: () => navigate('/roster-calendar')
        },
        {
          id: 'report-incident',
          label: 'Reportar Incidente',
          icon: 'AlertTriangle',
          variant: 'destructive',
          onClick: () => navigate('/incident-reporting')
        }
      ],
      administrative: [
        ...commonActions,
        {
          id: 'manage-assets',
          label: 'Gestionar Activos',
          icon: 'Package',
          variant: 'outline',
          onClick: () => navigate('/asset-management')
        }
      ]
    };

    return roleSpecificActions?.[userRole] || commonActions;
  };

  const actions = getActionsForRole();

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            onClick={action?.onClick}
            iconName={action?.icon}
            iconPosition="left"
            className="justify-start h-12"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;