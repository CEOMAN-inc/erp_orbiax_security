import React, { useState, useMemo } from 'react';
import Button from 'components/ui/Button';
import GeneralLedgerStats from './GeneralLedgerStats';
import GeneralLedgerFilters from './GeneralLedgerFilters';
import GeneralLedgerTable from './GeneralLedgerTable';
import JournalEntryModal from './JournalEntryModal';

// Datos de ejemplo (simulando una llamada a la API)
const mockJournalEntries = [
  { id: 1, date: '2025-09-01', account: '1105 - Caja', description: 'Venta de contado Factura N° 101', ref: 'FV-101', debit: 1500000, credit: 0 },
  { id: 2, date: '2025-09-01', account: '4135 - Ingresos por Ventas', description: 'Venta de contado Factura N° 101', ref: 'FV-101', debit: 0, credit: 1500000 },
  { id: 3, date: '2025-09-02', account: '6205 - Compra de Mercancía', description: 'Compra a proveedor A', ref: 'FC-A01', debit: 800000, credit: 0 },
  { id: 4, date: '2025-09-02', account: '2205 - Proveedores Nacionales', description: 'Compra a proveedor A', ref: 'FC-A01', debit: 0, credit: 800000 },
  { id: 5, date: '2025-09-03', account: '5135 - Servicios Públicos', description: 'Pago de factura de energía', ref: 'SP-0925', debit: 250000, credit: 0 },
  { id: 6, date: '2025-09-03', account: '1110 - Bancos', description: 'Pago de factura de energía', ref: 'SP-0925', debit: 0, credit: 250000 },
];

const GeneralLedgerTab = () => {
  const [entries, setEntries] = useState(mockJournalEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    account: '',
    description: ''
  });

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      if (filters.dateFrom && entryDate < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && entryDate > new Date(filters.dateTo)) return false;
      if (filters.account && entry.account !== filters.account) return false;
      if (filters.description && !entry.description.toLowerCase().includes(filters.description.toLowerCase())) return false;
      return true;
    });
  }, [entries, filters]);
  
  const handleSaveEntry = (newEntry) => {
    // Lógica para guardar el nuevo asiento (simulado)
    const newId = Math.max(...entries.map(e => e.id)) + 1;
    const entriesToAdd = newEntry.movements.map((mov, index) => ({
        id: newId + index,
        date: newEntry.date,
        account: mov.account,
        description: newEntry.description,
        ref: newEntry.ref,
        debit: mov.debit,
        credit: mov.credit
    }));
    setEntries(prev => [...prev, ...entriesToAdd].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Libro Mayor (General Ledger)</h2>
          <p className="text-muted-foreground mt-2">El registro central de todas las transacciones financieras de la empresa.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} iconName="PlusCircle">
          Crear Asiento Contable
        </Button>
      </div>
      
      <GeneralLedgerStats entries={filteredEntries} />
      <GeneralLedgerFilters filters={filters} onFilterChange={setFilters} />
      <GeneralLedgerTable entries={filteredEntries} />
      
      <JournalEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEntry}
      />
    </div>
  );
};

export default GeneralLedgerTab;