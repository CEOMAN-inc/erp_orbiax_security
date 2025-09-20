import React from 'react';
import { Outlet } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
            <div className="inline-block">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Icon name="Shield" size={48} className="text-white" />
                </div>
            </div>
          <h1 className="text-3xl font-bold text-foreground mt-4">Bienvenido a Orbiax ERP</h1>
          <p className="text-muted-foreground">Security Management System</p>
        </div>
        
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;