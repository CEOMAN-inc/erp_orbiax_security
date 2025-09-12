import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import RoleSpecificWidget from './components/RoleSpecificWidget';
import NotificationCenter from './components/NotificationCenter';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTenant, setCurrentTenant] = useState("Orbiax Security");
  const [userRole, setUserRole] = useState('admin'); // admin, supervisor, guard, administrative
  const [notifications, setNotifications] = useState([]);

  // Mock user data
  const user = {
    name: "Carlos Rodríguez",
    role: userRole,
    avatar: null
  };

  // Mock metrics data based on role
  const getMetricsForRole = () => {
    const baseMetrics = [
      {
        id: 'personnel',
        title: 'Personal Activo',
        value: '156',
        change: '+12%',
        changeType: 'positive',
        icon: 'Users',
        onClick: () => navigate('/personnel-management')
      },
      {
        id: 'services',
        title: 'Servicios Activos',
        value: '24',
        change: '+5%',
        changeType: 'positive',
        icon: 'Shield',
        gradient: true,
        onClick: () => navigate('/service-orders')
      },
      {
        id: 'incidents',
        title: 'Incidentes Pendientes',
        value: '3',
        change: '-2',
        changeType: 'positive',
        icon: 'AlertTriangle',
        onClick: () => navigate('/incident-reporting')
      }
    ];

    const roleSpecificMetrics = {
      admin: [
        ...baseMetrics,
        {
          id: 'revenue',
          title: 'Ingresos del Mes',
          value: '$125.5M',
          change: '+8.2%',
          changeType: 'positive',
          icon: 'DollarSign',
          onClick: () => {}
        }
      ],
      supervisor: [
        ...baseMetrics?.slice(0, 3),
        {
          id: 'coverage',
          title: 'Cobertura Promedio',
          value: '87%',
          change: '+3%',
          changeType: 'positive',
          icon: 'Target',
          onClick: () => navigate('/roster-calendar')
        }
      ],
      guard: [
        {
          id: 'my-shifts',
          title: 'Mis Turnos',
          value: '5',
          change: 'Esta semana',
          changeType: 'neutral',
          icon: 'Clock',
          gradient: true,
          onClick: () => navigate('/roster-calendar')
        },
        {
          id: 'incidents',
          title: 'Incidentes Reportados',
          value: '2',
          change: 'Este mes',
          changeType: 'neutral',
          icon: 'AlertTriangle',
          onClick: () => navigate('/incident-reporting')
        }
      ],
      administrative: [
        ...baseMetrics,
        {
          id: 'contracts',
          title: 'Contratos Activos',
          value: '18',
          change: '+2',
          changeType: 'positive',
          icon: 'FileText',
          onClick: () => {}
        }
      ]
    };

    return roleSpecificMetrics?.[userRole] || baseMetrics;
  };

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: 'incident',
      title: 'Nuevo incidente reportado',
      description: 'Incidente de seguridad en Centro Comercial Plaza - Nivel: Alto',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      user: 'Juan Pérez',
      priority: 'high'
    },
    {
      id: 2,
      type: 'shift',
      title: 'Cambio de turno completado',
      description: 'Turno nocturno iniciado en Edificio Corporativo Norte',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      user: 'María González'
    },
    {
      id: 3,
      type: 'service',
      title: 'Nueva orden de servicio',
      description: 'Servicio de escolta asignado para evento corporativo',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      user: 'Carlos Rodríguez',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'personnel',
      title: 'Personal incorporado',
      description: 'Nuevo guardia de seguridad completó proceso de inducción',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      user: 'Ana Martínez'
    },
    {
      id: 5,
      type: 'system',
      title: 'Mantenimiento programado',
      description: 'Sistema de comunicaciones actualizado exitosamente',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      user: 'Sistema'
    }
  ];

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'incident',
      title: 'Incidente crítico reportado',
      message: 'Se requiere atención inmediata en Centro Comercial Plaza',
      timestamp: new Date(Date.now() - 600000),
      read: false,
      priority: 'high',
      user: 'Juan Pérez'
    },
    {
      id: 2,
      type: 'system',
      title: 'Actualización del sistema',
      message: 'Nueva versión disponible con mejoras de seguridad',
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'personnel',
      title: 'Solicitud de vacaciones',
      message: 'María González ha solicitado vacaciones para la próxima semana',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      priority: 'low',
      user: 'María González'
    },
    {
      id: 4,
      type: 'service',
      title: 'Servicio completado',
      message: 'Evento corporativo finalizado exitosamente',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      priority: 'low',
      user: 'Carlos Rodríguez'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const handleTenantChange = (tenant) => {
    setCurrentTenant(tenant?.name);
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const metrics = getMetricsForRole();

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentTenant={currentTenant}
        onTenantChange={handleTenantChange}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        user={user}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`pt-16 pb-20 lg:pb-6 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              ¡Bienvenido, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              Aquí tienes un resumen de las operaciones de seguridad de hoy
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric) => (
              <MetricCard
                key={metric?.id}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                gradient={metric?.gradient}
                onClick={metric?.onClick}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <ActivityFeed activities={mockActivities} />
            </div>

            {/* Quick Actions */}
            <div>
              <QuickActions userRole={userRole} />
            </div>
          </div>

          {/* Role-Specific Widgets */}
          <div className="mb-8">
            <RoleSpecificWidget userRole={userRole} />
          </div>

          {/* Notification Center */}
          <div>
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;