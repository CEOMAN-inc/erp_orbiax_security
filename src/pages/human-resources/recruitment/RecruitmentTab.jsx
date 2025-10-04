import React, { useState } from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import Button from 'components/ui/Button';

// Componentes del submódulo
import RecruitmentDashboard from './components/RecruitmentDashboard';
import CandidatePipeline from './components/CandidatePipeline';
import CandidateProfileModal from './components/CandidateProfileModal';
import JobOpeningModal from './components/JobOpeningModal'; // <-- NUEVA IMPORTACIÓN

const RecruitmentTab = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isVacancyModalOpen, setIsVacancyModalOpen] = useState(false); // <-- NUEVO ESTADO
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const breadcrumbItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Gestión Humana', path: '/recruitment' },
        { label: 'Reclutamiento y Contratación', path: '/recruitment', current: true },
    ];

    const handleCandidateClick = (candidate) => {
        setSelectedCandidate(candidate);
        setIsProfileModalOpen(true);
    };
    
    const handleSaveVacancy = (vacancyData) => {
        console.log("Guardando vacante:", vacancyData);
        setIsVacancyModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-semibold text-foreground">Reclutamiento y Contratación</h2>
                        <p className="text-muted-foreground mt-1">Gestiona tu embudo de contratación, desde vacantes hasta la incorporación.</p>
                    </div>
                    {/* --- Lógica del botón corregida --- */}
                    <Button onClick={() => setIsVacancyModalOpen(true)} iconName="PlusCircle">
                        Crear Nueva Vacante
                    </Button>
                </div>
            </div>

            <RecruitmentDashboard />
            <CandidatePipeline onCandidateClick={handleCandidateClick} />

            {/* --- Renderizado de ambos modales --- */}
            <CandidateProfileModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
                candidate={selectedCandidate} 
            />
            <JobOpeningModal
                isOpen={isVacancyModalOpen}
                onClose={() => setIsVacancyModalOpen(false)}
                onSave={handleSaveVacancy}
            />
        </div>
    );
};

export default RecruitmentTab;