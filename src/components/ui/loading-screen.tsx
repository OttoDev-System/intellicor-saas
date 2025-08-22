import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Carregando...",
  className 
}) => {
  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center bg-background",
      className
    )}>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-lg">IC</span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">INTELLICOR</h2>
          <p className="text-sm text-muted-foreground">Plataforma SaaS para Corretoras</p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      </div>
    </div>
  );
};