import React from 'react';
import Icon from 'components/AppIcon';

const RecruitmentDashboard = () => {
    const stats = [
        { title: 'Vacantes Abiertas', value: '4', icon: 'Briefcase', color: 'text-primary' },
        { title: 'Nuevos Candidatos (Hoy)', value: '12', icon: 'UserPlus', color: 'text-success' },
        { title: 'Entrevistas Programadas', value: '8', icon: 'Calendar', color: 'text-warning' },
        { title: 'Contrataciones (Mes)', value: '3', icon: 'Award', color: 'text-secondary' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(card => (
                <div key={card.title} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-muted rounded-lg">
                            <Icon name={card.icon} size={24} className={card.color} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{card.title}</p>
                            <p className="text-2xl font-bold text-foreground">{card.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecruitmentDashboard;