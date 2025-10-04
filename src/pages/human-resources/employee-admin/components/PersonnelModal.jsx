import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

// Mock Data: En una app real, esto vendría de la API al seleccionar un empleado.
const mockEmployeeData = {
  id: 1,
  name: "Carlos Rodríguez Martínez",
  personalInfo: {
    documentType: 'CC',
    documentNumber: '1020304050',
    birthDate: '1990-05-15',
    gender: 'Masculino',
    address: 'Calle 45 #12-34, Bogotá',
    phone: '+57 300 123 4567',
    email: 'carlos.rodriguez@orbiax.com',
    emergencyContact: 'María Rodríguez',
    emergencyPhone: '+57 301 234 5678',
  },
  laborInfo: {
    role: 'Guardia de Seguridad',
    department: 'Operaciones',
    status: 'Activo',
    contractType: 'Término Indefinido',
    hireDate: '2023-03-15',
    salary: 2500000,
    eps: 'Sura',
    afp: 'Protección',
  },
  workHistory: [
    { date: '2024-01-01', event: 'Aumento Salarial', description: 'Salario ajustado a $2,500,000 COP por desempeño.', author: 'RRHH' },
    { date: '2023-03-15', event: 'Contratación', description: 'Inicio de labores como Guardia de Seguridad.', author: 'RRHH' },
  ],
  documents: [
    { id: 'doc1', name: 'Contrato_Laboral.pdf', type: 'Contrato', uploadDate: '2023-03-15', size: '1.2 MB' },
    { id: 'doc2', name: 'Cedula_Ciudadania.pdf', type: 'Identificación', uploadDate: '2023-03-15', size: '800 KB' },
    { id: 'doc3', name: 'Certificado_Altura.pdf', type: 'Certificación', uploadDate: '2023-04-10', size: '550 KB' },
  ]
};


const PersonnelModal = ({ isOpen, onClose, onSave, employeeId, mode = 'view' }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [employeeData, setEmployeeData] = useState(mockEmployeeData); // Usamos mock data por ahora

  useEffect(() => {
    if (isOpen) {
      if (mode === 'create') {
        // Inicializa un objeto vacío para un nuevo empleado
        setEmployeeData({ personalInfo: {}, laborInfo: {}, workHistory: [], documents: [] });
      } else {
        // En una app real, aquí harías fetch a la API con employeeId
        setEmployeeData(mockEmployeeData);
      }
      setActiveTab('personal'); // Resetea a la primera pestaña al abrir
    }
  }, [isOpen, employeeId, mode]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: 'User' },
    { id: 'laboral', label: 'Información Laboral', icon: 'Briefcase' },
    { id: 'historial', label: 'Historial Laboral', icon: 'History' },
    { id: 'documentos', label: 'Documentos', icon: 'FileText' },
  ];
  
  const isEditable = mode === 'edit' || mode === 'create';

  // --- RENDERIZADO DE PESTAÑAS ---
  const renderPersonalTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input label="Nombres y Apellidos" defaultValue={employeeData.name} disabled={!isEditable} />
      <Select label="Tipo de Documento" options={[{value: 'CC', label: 'Cédula de Ciudadanía'}]} defaultValue={employeeData.personalInfo.documentType} disabled={!isEditable} />
      <Input label="Número de Documento" defaultValue={employeeData.personalInfo.documentNumber} disabled={!isEditable} />
      <Input label="Fecha de Nacimiento" type="date" defaultValue={employeeData.personalInfo.birthDate} disabled={!isEditable} />
      <Input label="Dirección de Residencia" defaultValue={employeeData.personalInfo.address} disabled={!isEditable} />
      <Input label="Teléfono de Contacto" defaultValue={employeeData.personalInfo.phone} disabled={!isEditable} />
      <Input label="Correo Electrónico" type="email" defaultValue={employeeData.personalInfo.email} disabled={!isEditable} />
      <Input label="Contacto de Emergencia" defaultValue={employeeData.personalInfo.emergencyContact} disabled={!isEditable} />
      <Input label="Teléfono de Emergencia" defaultValue={employeeData.personalInfo.emergencyPhone} disabled={!isEditable} />
    </div>
  );

  const renderLaboralTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Select label="Cargo" options={[{value: 'Guardia de Seguridad', label: 'Guardia de Seguridad'}, {value: 'Supervisor', label: 'Supervisor'}]} defaultValue={employeeData.laborInfo.role} disabled={!isEditable} />
      <Select label="Departamento" options={[{value: 'Operaciones', label: 'Operaciones'}, {value: 'Administrativo', label: 'Administrativo'}]} defaultValue={employeeData.laborInfo.department} disabled={!isEditable} />
      <Select label="Estado del Empleado" options={[{value: 'Activo', label: 'Activo'}, {value: 'Inactivo', label: 'Inactivo'}]} defaultValue={employeeData.laborInfo.status} disabled={!isEditable} />
      <Select label="Tipo de Contrato" options={[{value: 'Término Indefinido', label: 'Término Indefinido'}, {value: 'Término Fijo', label: 'Término Fijo'}]} defaultValue={employeeData.laborInfo.contractType} disabled={!isEditable} />
      <Input label="Fecha de Contratación" type="date" defaultValue={employeeData.laborInfo.hireDate} disabled={!isEditable} />
      <Input label="Salario Básico (COP)" type="number" defaultValue={employeeData.laborInfo.salary} disabled={!isEditable} />
      <Input label="EPS" defaultValue={employeeData.laborInfo.eps} disabled={!isEditable} />
      <Input label="Fondo de Pensiones (AFP)" defaultValue={employeeData.laborInfo.afp} disabled={!isEditable} />
    </div>
  );

  const renderHistorialTab = () => (
    <div className="space-y-4">
      {employeeData.workHistory.map((entry, index) => (
        <div key={index} className="flex items-start space-x-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"><Icon name="Calendar" size={16} className="text-primary-foreground" /></div>
            {index < employeeData.workHistory.length - 1 && <div className="w-0.5 h-12 bg-border mt-2"></div>}
          </div>
          <div>
            <p className="font-semibold text-foreground">{entry.event}</p>
            <p className="text-sm text-muted-foreground">{entry.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{entry.date} - Registrado por: {entry.author}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDocumentosTab = () => (
    <div>
      <div className="flex justify-end mb-4">
          <Button variant="outline" iconName="UploadCloud" size="sm">Subir Documento</Button>
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left text-sm font-medium">Nombre del Archivo</th>
              <th className="p-3 text-left text-sm font-medium">Tipo</th>
              <th className="p-3 text-left text-sm font-medium">Fecha de Carga</th>
              <th className="p-3 text-right text-sm font-medium">Tamaño</th>
              <th className="p-3 text-center text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employeeData.documents.map(doc => (
              <tr key={doc.id}>
                <td className="p-3 font-medium flex items-center space-x-2"><Icon name="File" size={16} className="text-primary"/><span>{doc.name}</span></td>
                <td className="p-3 text-sm text-muted-foreground">{doc.type}</td>
                <td className="p-3 text-sm text-muted-foreground">{doc.uploadDate}</td>
                <td className="p-3 text-right text-sm font-mono">{doc.size}</td>
                <td className="p-3 text-center"><Button variant="ghost" size="icon" title="Descargar"><Icon name="Download" size={16}/></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal': return renderPersonalTab();
      case 'laboral': return renderLaboralTab();
      case 'historial': return renderHistorialTab();
      case 'documentos': return renderDocumentosTab();
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {employeeData.name ? employeeData.name.split(' ').map(n => n[0]).join('') : 'NU'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{mode === 'create' ? 'Nuevo Empleado' : employeeData.name}</h2>
              <p className="text-sm text-muted-foreground">{employeeData.laborInfo?.role || 'Detalles del empleado'}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t">
          <Button variant="outline" onClick={onClose}>{isEditable ? 'Cancelar' : 'Cerrar'}</Button>
          {isEditable && <Button onClick={() => onSave(employeeData)} iconName="Save">{mode === 'create' ? 'Crear Empleado' : 'Guardar Cambios'}</Button>}
        </div>
      </div>
    </div>
  );
};

export default PersonnelModal;