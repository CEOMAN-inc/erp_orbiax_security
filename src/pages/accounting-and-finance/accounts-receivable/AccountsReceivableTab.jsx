import React, { useState, useMemo } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';

// Importa todos los componentes del módulo
import ARDashboard from './components/ARDashboard';
import ARFilters from './components/ARFilters';
import ARTable from './components/ARTable';
import SalesInvoiceFormModal from './components/SalesInvoiceFormModal';
import PaymentReceivedModal from './components/PaymentReceivedModal';
import SalesInvoiceDetailModal from './components/SalesInvoiceDetailModal';

// Mock data inicial
const mockInvoices = [
  { id: 'FV-001', client: 'Banco Nacional', issueDate: '2025-09-25', dueDate: '2025-10-25', total: 2500000, balance: 2500000, status: 'Emitida', payments: [], items: [{ description: 'Servicio de Vigilancia Octubre', quantity: 1, price: 2100840.34 }] },
  { id: 'FV-002', client: 'Centro Comercial Plaza', issueDate: '2025-09-20', dueDate: '2025-10-20', total: 3200000, balance: 1200000, status: 'Emitida', payments: [{amount: 2000000, date: '2025-09-28'}], items: [{ description: 'Servicio de Seguridad Q4', quantity: 1, price: 2689075.63 }] },
  { id: 'FV-003', client: 'Residencial Norte', issueDate: '2025-08-10', dueDate: '2025-09-10', total: 1800000, balance: 0, status: 'Pagada', payments: [{amount: 1800000, date: '2025-09-08'}], items: [{ description: 'Servicio Vigilancia Agosto', quantity: 1, price: 1512605.04 }] },
  { id: 'FV-004', client: 'Banco Nacional', issueDate: '2025-08-01', dueDate: '2025-09-01', total: 450000, balance: 450000, status: 'Vencida', payments: [], items: [{ description: 'Horas extra y adicionales', quantity: 1, price: 378151.26 }] },
];

const AccountsReceivableTab = () => {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [filters, setFilters] = useState({});

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Contabilidad y Finanzas', path: '/accounts-receivable' },
    { label: 'Cuentas por Cobrar', path: '/accounts-receivable', current: true },
  ];

  const filteredInvoices = useMemo(() => {
    return invoices; // Lógica de filtrado se aplicaría aquí
  }, [invoices, filters]);

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
    console.log("Guardando factura:", invoiceData);
    if (selectedInvoice) { // Editando
      setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? {...inv, ...invoiceData} : inv));
    } else { // Creando
      setInvoices([ { ...invoiceData, id: `FV-${Date.now().toString().slice(-6)}`, balance: invoiceData.total, status: 'Emitida', payments: [] }, ...invoices ]);
    }
    setIsFormOpen(false);
  };

  const handleSavePayment = (paymentData) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        const newBalance = inv.balance - paymentData.amount;
        return {
          ...inv,
          balance: newBalance,
          status: newBalance <= 0 ? 'Pagada' : inv.status,
          payments: [...inv.payments, paymentData]
        };
      }
      return inv;
    }));
    setIsPaymentOpen(false);
  };

  const handleSendInvoice = (invoice) => {
      alert(`Factura ${invoice.id} enviada al cliente ${invoice.client}.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-foreground">Cuentas por Cobrar (AR)</h2>
            <p className="text-muted-foreground mt-1">Gestiona el ciclo de facturación a clientes y el registro de ingresos.</p>
          </div>
          <Button onClick={() => handleOpenForm()} iconName="FilePlus">
            Crear Factura de Venta
          </Button>
        </div>
      </div>

      <ARDashboard invoices={invoices} />
      <ARFilters onFilterChange={setFilters} />
      <ARTable 
        invoices={filteredInvoices} 
        onViewDetails={handleOpenDetail}
        onRegisterPayment={handleOpenPayment}
        onEdit={handleOpenForm}
        onSend={handleSendInvoice}
      />
      
      <SalesInvoiceFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveInvoice} existingInvoice={selectedInvoice} />
      <PaymentReceivedModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} onSave={handleSavePayment} invoice={selectedInvoice} />
      <SalesInvoiceDetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} invoice={selectedInvoice} />
    </div>
  );
};

export default AccountsReceivableTab;