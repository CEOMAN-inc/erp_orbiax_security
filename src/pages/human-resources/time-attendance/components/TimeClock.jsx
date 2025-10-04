import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const TimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [lastClockIn, setLastClockIn] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockAction = () => {
    const now = new Date();
    if (isClockedIn) {
      // Marcar Salida
      setIsClockedIn(false);
      alert(`Salida marcada a las: ${now.toLocaleTimeString('es-CO')}`);
    } else {
      // Marcar Entrada
      setIsClockedIn(true);
      setLastClockIn(now);
      alert(`Entrada marcada a las: ${now.toLocaleTimeString('es-CO')}`);
    }
  };

  const formattedTime = currentTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        <p className="text-5xl font-mono font-bold text-foreground tracking-widest">{formattedTime}</p>
        <p className="text-muted-foreground mt-2">{formattedDate}</p>
      </div>

      <div className="my-6">
        <Button 
          onClick={handleClockAction} 
          fullWidth
          className={`h-24 text-2xl font-bold transition-all duration-300 ${
            isClockedIn 
              ? 'bg-error hover:bg-error/90' 
              : 'bg-success hover:bg-success/90'
          }`}
        >
          <div className="flex flex-col items-center">
            <span>{isClockedIn ? 'Marcar Salida' : 'Marcar Entrada'}</span>
            <Icon name={isClockedIn ? 'LogOut' : 'LogIn'} size={28} className="mt-1"/>
          </div>
        </Button>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg text-center">
        <p className="text-sm font-medium text-foreground">
          Estado: 
          <span className={`ml-2 font-bold ${isClockedIn ? 'text-success' : 'text-muted-foreground'}`}>
            {isClockedIn ? 'Trabajando' : 'Fuera de Turno'}
          </span>
        </p>
        {isClockedIn && lastClockIn && (
          <p className="text-xs text-muted-foreground mt-1">
            Entrada marcada a las: {lastClockIn.toLocaleTimeString('es-CO')}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeClock;