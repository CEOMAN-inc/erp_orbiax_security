import React, { useState, useMemo } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

// Importa los componentes del módulo de Cuentas por Pagar
import APDashboard from './components/APDashboard';
import APFilters from './components/APFilters';
import APTable from './components/APTable';
import InvoiceFormModal from './components/InvoiceFormModal';
import PaymentModal from './components/PaymentModal';
import InvoiceDetailModal from './components/InvoiceDetailModal';

// Mock data
const mockInvoices = [
  { id: 'FAC-001', provider: 'Proveedor de Equipos A', issueDate: '2025-09-01', dueDate: '2025-10-01', total: 1200000, balance: 1200000, status: 'Pendiente', payments: [], items: [{ description: 'Equipos de radio', quantity: 2, price: 600000 }] },
  { id: 'FAC-002', provider: 'Servicios de Limpieza B', issueDate: '2025-08-15', dueDate: '2025-09-15', total: 750000, balance: 0, status: 'Pagada', payments: [{amount: 750000, date: '2025-09-14'}], items: [{ description: 'Servicio mensual', quantity: 1, price: 750000 }] },
  { id: 'FAC-003', provider: 'Suministros de Oficina C', issueDate: '2025-08-20', dueDate: '2025-09-05', total: 350000, balance: 350000, status: 'Vencida', payments: [], items: [{ description: 'Papelería y varios', quantity: 1, price: 350000 }] },
  { id: 'FAC-004', provider: 'Proveedor de Equipos A', issueDate: '2025-09-10', dueDate: '2025-10-10', total: 2500000, balance: 1000000, status: 'Pendiente', payments: [{amount: 1500000, date: '2025-09-20'}], items: [{ description: 'Cámaras de seguridad', quantity: 5, price: 500000 }] },
];

const AccountsPayableTab = () => {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [filters, setFilters] = useState({});

  // Estados para controlar los modales
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Contabilidad y Finanzas', path: '/accounts-payable' },
    { label: 'Cuentas por Pagar', path: '/accounts-payable', current: true },
  ];

  const filteredInvoices = useMemo(() => {
    return invoices; // La lógica de filtrado se aplicaría aquí
  }, [invoices, filters]);

  // --- Handlers para las acciones ---
  const handleOpenForm = (invoice = null) => {
    setSelectedInvoice(invoice);
    setIsFormOpen(true);
  };
  const handleOpenPayment = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentOpen(true);
  };
  const handleOpenDetail = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailOpen(true);
  };
  const handleSaveInvoice = (invoiceData) => {
    // Aquí iría la lógica para crear o editar la factura
    console.log("Guardando factura:", invoiceData);
    setIsFormOpen(false);
  };
  const handleSavePayment = (paymentData) => {
    // Lógica para aplicar el pago
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        const newBalance = inv.balance - paymentData.amount;
        return {
          ...inv,
          balance: newBalance,
          status: newBalance <= 0 ? 'Pagada' : inv.status, // Mantiene 'Vencida' si ya lo estaba
          payments: [...inv.payments, paymentData]
        };
      }
      return inv;
    });
    setInvoices(updatedInvoices);
    setIsPaymentOpen(false);
  };
  
  return (
    <div className="space-y-6">
      {/* --- ESTA ES LA SECCIÓN CORREGIDA --- */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-foreground">Cuentas por Pagar (AP)</h2>
            <p className="text-muted-foreground mt-1">Gestiona el ciclo completo de facturas de proveedores y pagos.</p>
          </div>
          <Button onClick={() => handleOpenForm()} iconName="FilePlus">
            Registrar Factura de Compra
          </Button>
        </div>
      </div>
      {/* --- FIN DE LA SECCIÓN CORREGIDA --- */}

      <APDashboard invoices={invoices} />
      <APFilters onFilterChange={setFilters} />
      <APTable 
        invoices={filteredInvoices} 
        onViewDetails={handleOpenDetail}
        onRegisterPayment={handleOpenPayment}
        onEdit={handleOpenForm}
      />
      
      <InvoiceFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveInvoice} existingInvoice={selectedInvoice} />
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} onSave={handleSavePayment} invoice={selectedInvoice} />
      <InvoiceDetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} invoice={selectedInvoice} />
    </div>
  );
};

export default AccountsPayableTab;