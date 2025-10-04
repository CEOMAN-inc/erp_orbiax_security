import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CandidateProfileModal = ({ isOpen, onClose, candidate }) => {
    const [activeTab, setActiveTab] = useState('info');

    if (!isOpen || !candidate) return null;

    const tabs = [
        { id: 'info', label: 'Información', icon: 'User' },
        { id: 'evaluations', label: 'Evaluaciones', icon: 'ClipboardCheck' },
        { id: 'history', label: 'Historial', icon: 'History' },
    ];

    const handleHire = () => {
        // En un flujo real, esto abriría un asistente final para completar
        // los datos del empleado (salario, tipo de contrato, etc.)
        // y luego crearía el registro en Administración de Personal.
        alert(`¡Iniciando proceso de Onboarding para ${candidate.name}!`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">{candidate.name}</h2>
                            <p className="text-sm text-muted-foreground">Aplicando para: <span className="font-medium text-primary">{candidate.vacancy}</span></p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
                </div>

                {/* Tabs */}
                <div className="border-b border-border">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                                <Icon name={tab.icon} size={16} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Contenido de la Pestaña Información */}
                    {activeTab === 'info' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="font-semibold text-lg">Hoja de Vida y Contacto</h3>
                                <p className="text-sm text-muted-foreground"><strong>Email:</strong> {candidate.email}</p>
                                <p className="text-sm text-muted-foreground"><strong>Teléfono:</strong> +57 300 123 4567</p>
                                <Button variant="outline" iconName="Download">Descargar CV</Button>
                            </div>
                            <div className="md:col-span-1 bg-muted/50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Acciones Rápidas</h3>
                                <div className="space-y-2">
                                   <Button fullWidth variant="outline" size="sm">Agendar Entrevista</Button>
                                   <Button fullWidth variant="outline" size="sm">Enviar Prueba Técnica</Button>
                                   <Button fullWidth variant="destructive" size="sm">Rechazar Candidato</Button>
                                </div>
                            </div>
                        </div>
                    )}
                     {/* Contenido de la Pestaña Evaluaciones */}
                    {activeTab === 'evaluations' && (
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Evaluaciones y Comentarios</h3>
                            {/* Aquí iría un componente para añadir y ver comentarios */}
                             <div className="text-center text-muted-foreground py-12">
                                <Icon name="ClipboardCheck" size={40} className="mx-auto mb-2"/>
                                <p>Las notas de las entrevistas aparecerán aquí.</p>
                           </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-4 border-t">
                    <Button variant="outline" onClick={onClose}>Cerrar</Button>
                    <Button variant="success" onClick={handleHire} iconName="CheckCircle">
                        Contratar e Iniciar Onboarding
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfileModal;