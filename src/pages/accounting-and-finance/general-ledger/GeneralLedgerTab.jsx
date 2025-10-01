import React, { useState, useMemo } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import Breadcrumb from 'components/ui/Breadcrumb';

// Componentes del submódulo
import GeneralLedgerStats from './GeneralLedgerStats';
import GeneralLedgerFilters from './GeneralLedgerFilters';
import GeneralLedgerTable from './GeneralLedgerTable';
import JournalEntryModal from './JournalEntryModal';
import JournalEntryDetailModal from './JournalEntryDetailModal';
import ConfirmationModal from './ConfirmationModal';

const mockJournalEntries = [
  { journalEntryId: 'JE-001', id: 1, date: '2025-09-01', account: '1105 - Caja', description: 'Venta de contado Factura N° 101', ref: 'FV-101', debit: 1500000, credit: 0, status: 'Contabilizado' },
  { journalEntryId: 'JE-001', id: 2, date: '2025-09-01', account: '4135 - Ingresos por Ventas', description: 'Venta de contado Factura N° 101', ref: 'FV-101', debit: 0, credit: 1500000, status: 'Contabilizado' },
  { journalEntryId: 'JE-002', id: 3, date: '2025-09-02', account: '6205 - Compra de Mercancía', description: 'Compra a proveedor A', ref: 'FC-A01', debit: 800000, credit: 0, status: 'Contabilizado' },
  { journalEntryId: 'JE-002', id: 4, date: '2025-09-02', account: '2205 - Proveedores Nacionales', description: 'Compra a proveedor A', ref: 'FC-A01', debit: 0, credit: 800000, status: 'Contabilizado' },
  { journalEntryId: 'JE-003', id: 5, date: '2025-09-03', account: '5135 - Servicios Públicos', description: 'Pago de factura de energía', ref: 'SP-0925', debit: 250000, credit: 0, status: 'Borrador' },
  { journalEntryId: 'JE-003', id: 6, date: '2025-09-03', account: '1110 - Bancos', description: 'Pago de factura de energía', ref: 'SP-0925', debit: 0, credit: 250000, status: 'Borrador' },
];

const GeneralLedgerTab = () => {
  const [entries, setEntries] = useState(mockJournalEntries);
  const [filters, setFilters] = useState({ status: '', account: '', description: '', dateFrom: '', dateTo: '' });
  
  // Estados para los modales
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // Estado para la lógica de edición, anulación y visualización
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [entryToAction, setEntryToAction] = useState(null);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Contabilidad y Finanzas', path: '/general-ledger' },
    { label: 'Libro Mayor', path: '/general-ledger', current: true },
  ];
  
  const groupedEntries = useMemo(() => {
    const groups = entries.reduce((acc, entry) => {
      (acc[entry.journalEntryId] = acc[entry.journalEntryId] || []).push(entry);
      return acc;
    }, {});
    
    return Object.values(groups).map(group => ({
        journalEntryId: group[0].journalEntryId,
        date: group[0].date,
        description: group[0].description,
        ref: group[0].ref,
        status: group[0].status,
        movements: group,
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [entries]);

  const filteredGroupedEntries = useMemo(() => {
    return groupedEntries.filter(group => {
        if (filters.status && group.status !== filters.status) return false;
        if (filters.description && !group.description.toLowerCase().includes(filters.description.toLowerCase())) return false;
        if (filters.dateFrom && new Date(group.date) < new Date(filters.dateFrom)) return false;
        if (filters.dateTo && new Date(group.date) > new Date(filters.dateTo)) return false;
        if (filters.account && !group.movements.some(m => m.account === filters.account)) return false;
        return true;
    });
  }, [groupedEntries, filters]);
  
  const handleExport = () => {
      const dataToExport = filteredGroupedEntries.flatMap(group => 
          group.movements.map(mov => ({
              ID_Asiento: group.journalEntryId,
              Fecha: group.date,
              Referencia: group.ref,
              Descripción: group.description,
              Cuenta: mov.account,
              Débito: mov.debit,
              Crédito: mov.credit,
              Estado: group.status,
          }))
      );
      
      if (dataToExport.length === 0) {
        alert("No hay datos para exportar con los filtros actuales.");
        return;
      }
      
      const headers = Object.keys(dataToExport[0]).join(',');
      const csv = dataToExport.map(row => Object.values(row).join(',')).join('\n');
      const csvContent = `${headers}\n${csv}`;
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `libro_mayor_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handleCreateNew = () => {
    setEditingEntry(null);
    setIsEntryModalOpen(true);
  };
  
  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setIsDetailModalOpen(true);
  };
  
  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsEntryModalOpen(true);
  };
  
  const handleAnnulPrompt = (entry) => {
    setEntryToAction(entry);
    setIsConfirmModalOpen(true);
  };
  
  const handleAnnulConfirm = () => {
    const reversalEntryId = `AN-${entryToAction.journalEntryId}`;
    const reversalDescription = `ANULACIÓN: ${entryToAction.description}`;
    const maxId = Math.max(...entries.map(e => e.id));

    const reversalMovements = entryToAction.movements.map((mov, index) => ({
      ...mov,
      id: maxId + 1 + index,
      journalEntryId: reversalEntryId,
      description: reversalDescription,
      debit: mov.credit,
      credit: mov.debit,
      status: 'Contabilizado',
    }));

    setEntries(prev => [
      ...prev.map(e => e.journalEntryId === entryToAction.journalEntryId ? { ...e, status: 'Anulado' } : e),
      ...reversalMovements
    ]);
    
    setIsConfirmModalOpen(false);
    setEntryToAction(null);
  };
  
  const handlePost = (entryToPost) => {
      setEntries(prev => prev.map(entry => 
          entry.journalEntryId === entryToPost.journalEntryId 
          ? { ...entry, status: 'Contabilizado' }
          : entry
      ));
  };
  
  const handleSave = (savedEntry) => {
    // Lógica de Edición
    if (editingEntry) {
      const otherEntries = entries.filter(e => e.journalEntryId !== editingEntry.journalEntryId);
      const updatedMovements = savedEntry.movements.map((mov, index) => ({
        ...mov,
        id: editingEntry.movements[index]?.id || `new-${Date.now()}-${index}`,
        journalEntryId: editingEntry.journalEntryId,
        date: savedEntry.date,
        description: savedEntry.description,
        ref: savedEntry.ref,
        status: savedEntry.status,
      }));
      setEntries([...otherEntries, ...updatedMovements]);
    } 
    // Lógica de Creación
    else {
      const newJournalId = `JE-${Date.now()}`;
      const maxId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) : 0;
      const newMovements = savedEntry.movements.map((mov, index) => ({
        ...mov,
        id: maxId + 1 + index,
        journalEntryId: newJournalId,
        date: savedEntry.date,
        description: savedEntry.description,
        ref: savedEntry.ref,
        status: savedEntry.status,
      }));
      setEntries(prev => [...prev, ...newMovements]);
    }
    setIsEntryModalOpen(false);
    setEditingEntry(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Libro Mayor (General Ledger)</h2>
            <p className="text-muted-foreground mt-1">El registro central de todas las transacciones financieras de la empresa.</p>
          </div>
          <Button onClick={handleCreateNew} iconName="PlusCircle">
            Crear Asiento Contable
          </Button>
        </div>
      </div>

      <GeneralLedgerStats entries={filteredGroupedEntries.flatMap(g => g.movements)} />
      <GeneralLedgerFilters filters={filters} onFilterChange={setFilters} onExport={handleExport} />
      <GeneralLedgerTable 
        groupedEntries={filteredGroupedEntries}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onAnnul={handleAnnulPrompt}
        onPost={handlePost}
      />
      
      <JournalEntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        onSave={handleSave}
        existingEntry={editingEntry}
      />
      <JournalEntryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        entry={selectedEntry}
      />
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleAnnulConfirm}
        title="Anular Asiento Contable"
        message={`¿Estás seguro de que deseas anular el asiento ${entryToAction?.ref}? Esta acción creará un asiento de reversión y no se puede deshacer.`}
      />
    </div>
  );
};

export default GeneralLedgerTab;