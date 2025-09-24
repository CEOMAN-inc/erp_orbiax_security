import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemPreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'es',
    timezone: 'America/Bogota',
    dateFormat: 'DD/MM/YYYY',
    currency: 'COP',
    sessionTimeout: 30,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    twoFactorRequired: false,
    loginAttempts: 5,
    accountLockoutTime: 15,
    auditLogRetention: 365,
    backupFrequency: 'daily',
    maintenanceWindow: '02:00',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const themeOptions = [
    { value: 'dark', label: 'Tema Oscuro' },
    { value: 'light', label: 'Tema Claro' },
    { value: 'auto', label: 'Automático' }
  ];

  const languageOptions = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' }
  ];

  const timezoneOptions = [
    { value: 'America/Bogota', label: 'Colombia (UTC-5)' },
    { value: 'America/Mexico_City', label: 'México (UTC-6)' },
    { value: 'America/Lima', label: 'Perú (UTC-5)' },
    { value: 'America/Santiago', label: 'Chile (UTC-3)' }
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  const currencyOptions = [
    { value: 'COP', label: 'Peso Colombiano (COP)' },
    { value: 'USD', label: 'Dólar Americano (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'MXN', label: 'Peso Mexicano (MXN)' }
  ];

  const backupFrequencyOptions = [
    { value: 'hourly', label: 'Cada Hora' },
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
    // Here you would save to your backend
  };

  const handleReset = () => {
    // Reset to default values
    setPreferences({
      theme: 'dark',
      language: 'es',
      timezone: 'America/Bogota',
      dateFormat: 'DD/MM/YYYY',
      currency: 'COP',
      sessionTimeout: 30,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      passwordRequireNumbers: true,
      passwordRequireUppercase: true,
      twoFactorRequired: false,
      loginAttempts: 5,
      accountLockoutTime: 15,
      auditLogRetention: 365,
      backupFrequency: 'daily',
      maintenanceWindow: '02:00',
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Preferencias del Sistema</h2>
          <p className="text-muted-foreground">Configura las opciones generales del sistema</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleReset}>
            Restablecer
          </Button>
          <Button variant="default" iconName="Save" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance & Localization */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Palette" size={20} />
            <span>Apariencia y Localización</span>
          </h3>
          
          <div className="space-y-4">
            <Select
              label="Tema"
              description="Selecciona el tema visual del sistema"
              options={themeOptions}
              value={preferences?.theme}
              onChange={(value) => handlePreferenceChange('theme', value)}
            />
            
            <Select
              label="Idioma"
              description="Idioma predeterminado de la interfaz"
              options={languageOptions}
              value={preferences?.language}
              onChange={(value) => handlePreferenceChange('language', value)}
            />
            
            <Select
              label="Zona Horaria"
              description="Zona horaria para fechas y horas"
              options={timezoneOptions}
              value={preferences?.timezone}
              onChange={(value) => handlePreferenceChange('timezone', value)}
            />
            
            <Select
              label="Formato de Fecha"
              description="Formato de visualización de fechas"
              options={dateFormatOptions}
              value={preferences?.dateFormat}
              onChange={(value) => handlePreferenceChange('dateFormat', value)}
            />
            
            <Select
              label="Moneda"
              description="Moneda predeterminada para valores monetarios"
              options={currencyOptions}
              value={preferences?.currency}
              onChange={(value) => handlePreferenceChange('currency', value)}
            />
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Shield" size={20} />
            <span>Configuración de Seguridad</span>
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Tiempo de Sesión (minutos)"
              description="Tiempo antes de cerrar sesión automáticamente"
              type="number"
              value={preferences?.sessionTimeout}
              onChange={(e) => handlePreferenceChange('sessionTimeout', parseInt(e?.target?.value))}
            />
            
            <Input
              label="Longitud Mínima de Contraseña"
              description="Número mínimo de caracteres para contraseñas"
              type="number"
              value={preferences?.passwordMinLength}
              onChange={(e) => handlePreferenceChange('passwordMinLength', parseInt(e?.target?.value))}
            />
            
            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Requisitos de Contraseña</div>
              
              <Checkbox
                label="Requerir caracteres especiales"
                checked={preferences?.passwordRequireSpecial}
                onChange={(e) => handlePreferenceChange('passwordRequireSpecial', e?.target?.checked)}
              />
              
              <Checkbox
                label="Requerir números"
                checked={preferences?.passwordRequireNumbers}
                onChange={(e) => handlePreferenceChange('passwordRequireNumbers', e?.target?.checked)}
              />
              
              <Checkbox
                label="Requerir mayúsculas"
                checked={preferences?.passwordRequireUppercase}
                onChange={(e) => handlePreferenceChange('passwordRequireUppercase', e?.target?.checked)}
              />
              
              <Checkbox
                label="Requerir autenticación de dos factores"
                checked={preferences?.twoFactorRequired}
                onChange={(e) => handlePreferenceChange('twoFactorRequired', e?.target?.checked)}
              />
            </div>
            
            <Input
              label="Intentos de Login Máximos"
              description="Número de intentos antes de bloquear cuenta"
              type="number"
              value={preferences?.loginAttempts}
              onChange={(e) => handlePreferenceChange('loginAttempts', parseInt(e?.target?.value))}
            />
            
            <Input
              label="Tiempo de Bloqueo (minutos)"
              description="Tiempo de bloqueo después de intentos fallidos"
              type="number"
              value={preferences?.accountLockoutTime}
              onChange={(e) => handlePreferenceChange('accountLockoutTime', parseInt(e?.target?.value))}
            />
          </div>
        </div>

        {/* System Maintenance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Settings" size={20} />
            <span>Mantenimiento del Sistema</span>
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Retención de Logs de Auditoría (días)"
              description="Días para mantener registros de auditoría"
              type="number"
              value={preferences?.auditLogRetention}
              onChange={(e) => handlePreferenceChange('auditLogRetention', parseInt(e?.target?.value))}
            />
            
            <Select
              label="Frecuencia de Respaldo"
              description="Frecuencia de respaldos automáticos"
              options={backupFrequencyOptions}
              value={preferences?.backupFrequency}
              onChange={(value) => handlePreferenceChange('backupFrequency', value)}
            />
            
            <Input
              label="Ventana de Mantenimiento"
              description="Hora para tareas de mantenimiento (HH:MM)"
              type="time"
              value={preferences?.maintenanceWindow}
              onChange={(e) => handlePreferenceChange('maintenanceWindow', e?.target?.value)}
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Bell" size={20} />
            <span>Preferencias de Notificación</span>
          </h3>
          
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-3">
              Configura los canales de notificación predeterminados
            </div>
            
            <Checkbox
              label="Notificaciones por Email"
              description="Enviar notificaciones por correo electrónico"
              checked={preferences?.emailNotifications}
              onChange={(e) => handlePreferenceChange('emailNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Notificaciones por SMS"
              description="Enviar notificaciones por mensaje de texto"
              checked={preferences?.smsNotifications}
              onChange={(e) => handlePreferenceChange('smsNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Notificaciones Push"
              description="Mostrar notificaciones en la aplicación"
              checked={preferences?.pushNotifications}
              onChange={(e) => handlePreferenceChange('pushNotifications', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* System Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Info" size={20} />
          <span>Información del Sistema</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Versión del Sistema</div>
            <div className="text-lg font-semibold text-foreground">v2.1.4</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground">Última Actualización</div>
            <div className="text-lg font-semibold text-foreground">14/01/2025</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground">Tiempo de Actividad</div>
            <div className="text-lg font-semibold text-foreground">15 días, 8 horas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPreferencesTab;