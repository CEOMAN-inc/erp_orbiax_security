import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PersonnelTable = ({ 
  employees, 
  selectedEmployees, 
  onSelectEmployee, 
  onSelectAll, 
  onEditEmployee, 
  onViewEmployee,
  sortConfig,
  onSort,
  searchQuery,
  onSearchChange 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(employees?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = employees?.slice(startIndex, startIndex + itemsPerPage);

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Activo': { bg: 'bg-success/20', text: 'text-success', border: 'border-success/30' },
      'Inactivo': { bg: 'bg-error/20', text: 'text-error', border: 'border-error/30' },
      'Suspendido': { bg: 'bg-warning/20', text: 'text-warning', border: 'border-warning/30' }
    };

    const config = statusConfig?.[status] || statusConfig?.['Activo'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.bg} ${config?.text} ${config?.border}`}>
        {status}
      </span>
    );
  };

  const getCertificationBadge = (status) => {
    const statusConfig = {
      'Vigente': { bg: 'bg-success/20', text: 'text-success', border: 'border-success/30' },
      'Por Vencer': { bg: 'bg-warning/20', text: 'text-warning', border: 'border-warning/30' },
      'Vencida': { bg: 'bg-error/20', text: 'text-error', border: 'border-error/30' }
    };

    const config = statusConfig?.[status] || statusConfig?.['Vigente'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.bg} ${config?.text} ${config?.border}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Personal Registrado</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar empleados..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10 w-64"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {employees?.length} empleados
            </span>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedEmployees?.length === employees?.length && employees?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Empleado</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('role')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Cargo</span>
                  <Icon name={getSortIcon('role')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('department')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Departamento</span>
                  <Icon name={getSortIcon('department')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Estado</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Certificaciones</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('hireDate')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Fecha Ingreso</span>
                  <Icon name={getSortIcon('hireDate')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-sm font-medium text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedEmployees?.map((employee) => (
              <tr key={employee?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedEmployees?.includes(employee?.id)}
                    onChange={(e) => onSelectEmployee(employee?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {employee?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{employee?.name}</p>
                      <p className="text-xs text-muted-foreground">{employee?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{employee?.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{employee?.department}</span>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(employee?.status)}
                </td>
                <td className="px-4 py-3">
                  {getCertificationBadge(employee?.certificationStatus)}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{employee?.hireDate}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewEmployee(employee)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditEmployee(employee)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, employees?.length)} de {employees?.length} empleados
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" size={16} />
                Anterior
              </Button>
              <span className="text-sm text-foreground">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Siguiente
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonnelTable;