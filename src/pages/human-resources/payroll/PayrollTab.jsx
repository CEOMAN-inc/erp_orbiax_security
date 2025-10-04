import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';

// Componentes del submódulo
import PayrollDashboard from './components/PayrollDashboard';
import PayrollHistoryTable from './components/PayrollHistoryTable';
import PayrollRunWizard from './components/PayrollRunWizard';

// Mock Data
const mockPayrollRuns = [
    { id: 1, periodName: '1ra Quincena Septiembre 2025', paymentDate: '2025-09-15', employeeCount: 156, totalCost: 185340000, totalDeductions: 35200000, status: 'Pagada' },
    { id: 2, periodName: '2da Quincena Agosto 2025', paymentDate: '2025-08-30', employeeCount: 154, totalCost: 183100000, totalDeductions: 34800000, status: 'Pagada' },
    { id: 3, periodName: '1ra Quincena Agosto 2025', paymentDate: '2025-08-15', employeeCount: 152, totalCost: 181500000, totalDeductions: 34500000, status: 'Pagada' },
];

const PayrollTab = () => {
  const [payrollRuns, setPayrollRuns] = useState(mockPayrollRuns);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Gestión Humana', path: '/payroll' },
    { label: 'Gestión de Nóminas', path: '/payroll', current: true },
  ];

  const handleSavePayroll = () => {
    console.log("Nómina guardada y contabilizada");
    setIsWizardOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-foreground">Gestión de Nóminas (Payroll)</h2>
            <p className="text-muted-foreground mt-1">Calcula salarios, deducciones y emite recibos de pago de forma automatizada.</p>
          </div>
          <Button onClick={() => setIsWizardOpen(true)} iconName="PlayCircle">
            Iniciar Liquidación de Nómina
          </Button>
        </div>
      </div>

      <PayrollDashboard lastPayroll={payrollRuns[0]} />
      
      <PayrollHistoryTable payrollRuns={payrollRuns} />
      
      <PayrollRunWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} onSave={handleSavePayroll} />
    </div>
  );
};

export default PayrollTab;