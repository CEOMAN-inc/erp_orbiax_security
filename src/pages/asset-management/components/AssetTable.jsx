import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetTable = ({ assets, onEdit, onAssign, onMaintenance, onViewDetails, onBulkAction }) => {
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-success text-success-foreground';
      case 'En Mantenimiento':
        return 'bg-warning text-warning-foreground';
      case 'Fuera de Servicio':
        return 'bg-error text-error-foreground';
      case 'En Reparación':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAssets(assets?.map(asset => asset?.id));
    } else {
      setSelectedAssets([]);
    }
  };

  const handleSelectAsset = (assetId, checked) => {
    if (checked) {
      setSelectedAssets([...selectedAssets, assetId]);
    } else {
      setSelectedAssets(selectedAssets?.filter(id => id !== assetId));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAssets = [...assets]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const isMaintenanceOverdue = (nextMaintenance) => {
    return nextMaintenance && new Date(nextMaintenance) < new Date();
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions */}
      {selectedAssets?.length > 0 && (
        <div className="bg-muted p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedAssets?.length} activos seleccionados
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('assign', selectedAssets)}
                iconName="UserPlus"
              >
                Asignar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('maintenance', selectedAssets)}
                iconName="Wrench"
              >
                Mantenimiento
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export', selectedAssets)}
                iconName="Download"
              >
                Exportar
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedAssets?.length === assets?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Activo</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Categoría</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Estado</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Ubicación</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">Asignado a</th>
              <th className="text-left p-4">Próximo Mantenimiento</th>
              <th className="text-right p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets?.map((asset) => (
              <tr key={asset?.id} className="border-t border-border hover:bg-muted/50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedAssets?.includes(asset?.id)}
                    onChange={(e) => handleSelectAsset(asset?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{asset?.name}</div>
                    <div className="text-sm text-muted-foreground">{asset?.code}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{asset?.category}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset?.status)}`}>
                      {asset?.status}
                    </span>
                    {isMaintenanceOverdue(asset?.nextMaintenance) && (
                      <Icon name="AlertTriangle" size={16} className="text-accent" />
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{asset?.location}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{asset?.assignedTo || 'No asignado'}</span>
                </td>
                <td className="p-4">
                  <span className={`text-sm ${isMaintenanceOverdue(asset?.nextMaintenance) ? 'text-error' : 'text-foreground'}`}>
                    {asset?.nextMaintenance ? new Date(asset.nextMaintenance)?.toLocaleDateString('es-CO') : 'No programado'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(asset)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(asset)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAssign(asset)}
                      iconName="UserPlus"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMaintenance(asset)}
                      iconName="Wrench"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {assets?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">No hay activos</h3>
          <p className="text-muted-foreground mb-4">No se encontraron activos para mostrar</p>
        </div>
      )}
    </div>
  );
};

export default AssetTable;