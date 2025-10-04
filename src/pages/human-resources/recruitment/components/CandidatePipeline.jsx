import React, { useState } from 'react';
import CandidateCard from './CandidateCard';

const initialCandidates = [
    { id: 'CAND-001', name: 'Luisa Fernanda Rojas', email: 'luisa.r@example.com', vacancy: 'Supervisor de Zona', stage: 'new' },
    { id: 'CAND-002', name: 'Andrés Bustamante', email: 'andres.b@example.com', vacancy: 'Guardia de Seguridad', stage: 'new' },
    { id: 'CAND-003', name: 'Mariana Perea', email: 'mariana.p@example.com', vacancy: 'Guardia de Seguridad', stage: 'prescreen' },
    { id: 'CAND-004', name: 'Javier Castaño', email: 'javier.c@example.com', vacancy: 'Supervisor de Zona', stage: 'interview' },
    { id: 'CAND-005', name: 'Sofía Arango', email: 'sofia.a@example.com', vacancy: 'Guardia de Seguridad', stage: 'offer' },
];

const PipelineColumn = ({ title, stage, candidates, onDrop, onCardClick }) => {
    const handleDragOver = (e) => e.preventDefault();
    return (
        <div 
            className="bg-muted/50 rounded-lg p-3 w-72 flex-shrink-0"
            onDragOver={handleDragOver}
            onDrop={(e) => onDrop(stage, e)}
        >
            <h3 className="font-semibold mb-4 px-2">{title} ({candidates.length})</h3>
            <div className="space-y-3 overflow-y-auto h-[calc(100vh-450px)] p-1">
                {candidates.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} onCardClick={onCardClick} />
                ))}
            </div>
        </div>
    );
};

const CandidatePipeline = ({ onCandidateClick }) => {
    const [candidates, setCandidates] = useState(initialCandidates);

    const stages = [
        { id: 'new', title: 'Nuevos Aplicantes' },
        { id: 'prescreen', title: 'Preselección' },
        { id: 'interview', title: 'Entrevista' },
        { id: 'offer', title: 'Oferta Realizada' },
        { id: 'hired', title: 'Contratado' },
    ];

    const handleDrop = (targetStage, e) => {
        const candidateId = e.dataTransfer.getData("candidateId");
        setCandidates(prev => prev.map(cand => 
            cand.id === candidateId ? { ...cand, stage: targetStage } : cand
        ));
    };

    return (
        <div className="flex space-x-4 overflow-x-auto p-2">
            {stages.map(stage => (
                <PipelineColumn
                    key={stage.id}
                    title={stage.title}
                    stage={stage.id}
                    candidates={candidates.filter(c => c.stage === stage.id)}
                    onDrop={handleDrop}
                    onCardClick={onCandidateClick}
                />
            ))}
        </div>
    );
};

export default CandidatePipeline;