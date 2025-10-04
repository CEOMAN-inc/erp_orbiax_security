import React from 'react';
import Icon from 'components/AppIcon';

const CandidateCard = ({ candidate, onCardClick }) => {
    return (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("candidateId", candidate.id)}
            onClick={() => onCardClick(candidate)}
            className="bg-card border border-border p-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
        >
            <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.vacancy}</p>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                        <Icon name="Mail" size={12} />
                        <span>{candidate.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateCard;