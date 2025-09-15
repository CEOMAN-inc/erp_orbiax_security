import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PredictionCard from './components/PredictionCard';

const AIPredictionsPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Datos simulados para las predicciones
  const absenteeismData = {
    title: "Predicción de Ausentismo",
    icon: "UserX",
    prediction: {
      label: "Tasa de Ausentismo Proyectada (Próximos 30 días)",
      value: "5.8%",
    },
    chartData: [
      { name: 'Lunes', valor: 8.2 },
      { name: 'Martes', valor: 6.5 },
      { name: 'Miércoles', valor: 5.9 },
      { name: 'Jueves', valor: 6.1 },
      { name: 'Viernes', valor: 7.8 },
    ],
    insights: [
      "Los lunes y viernes muestran la mayor probabilidad de ausencias.",
      "El personal con certificaciones vencidas tiene un 15% más de probabilidad de ausentarse.",
      "Los turnos nocturnos presentan una tasa de ausentismo un 5% mayor."
    ],
    recommendations: [
      "Reforzar la supervisión los lunes y viernes.",
      "Enviar recordatorios de renovación de certificaciones.",
      "Evaluar rotación en turnos nocturnos."
    ],
    cta: {
      label: "Ver Personal en Riesgo",
      icon: "Users",
      alert: "Navegando a la lista de personal con alta probabilidad de ausencia...",
    }
  };

  const serviceFailureData = {
    title: "Riesgo de Incumplimiento de Servicio",
    icon: "ShieldAlert",
    prediction: {
      label: "Probabilidad de Incumplimiento (Próximas 24 horas)",
      value: "12.3%",
    },
    chartData: [
      { name: 'Zona Norte', valor: 18 },
      { name: 'Zona Centro', valor: 11 },
      { name: 'Zona Sur', valor: 9 },
      { name: 'Zona Occidente', valor: 15 },
    ],
    insights: [
      "La Zona Norte presenta el mayor riesgo debido a la falta de personal supervisor.",
      "Servicios en clientes nuevos tienen un 20% más de riesgo de incumplimiento.",
      "El riesgo aumenta un 8% en turnos con personal de menos de 3 meses de antigüedad."
    ],
    recommendations: [
      "Asignar un supervisor de apoyo a la Zona Norte.",
      "Realizar seguimiento proactivo a servicios con clientes nuevos.",
      "Combinar personal nuevo con personal experimentado en los turnos."
    ],
    cta: {
      label: "Ver Servicios en Riesgo",
      icon: "ClipboardList",
      alert: "Mostrando las órdenes de servicio con mayor riesgo de incumplimiento...",
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Predicciones de IA</h1>
            <p className="text-muted-foreground mt-2">
              Anticípate a los problemas operativos y toma decisiones proactivas basadas en datos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PredictionCard {...absenteeismData} />
            <PredictionCard {...serviceFailureData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIPredictionsPage;