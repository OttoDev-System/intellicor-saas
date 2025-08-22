import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { UserCog, Shield, Headphones } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { UserRole } from '@/types/auth';

export const RoleSwitcher: React.FC = () => {
  const { user, switchRole } = useAuth();

  if (!user) return null;

  const roles: Array<{ role: UserRole; label: string; icon: React.ElementType; description: string }> = [
    { 
      role: 'admin', 
      label: 'Administrador', 
      icon: Shield, 
      description: 'Gestão completa da organização' 
    },
    { 
      role: 'corretor', 
      label: 'Corretor', 
      icon: UserCog, 
      description: 'Vendas e gestão de clientes' 
    },
    { 
      role: 'suporte', 
      label: 'Suporte', 
      icon: Headphones, 
      description: 'Atendimento e leads' 
    }
  ];

  const currentRole = roles.find(r => r.role === user.role);
  const CurrentIcon = currentRole?.icon || Shield;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <CurrentIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{currentRole?.label}</span>
          <Badge variant="outline" className="ml-1">
            Demo
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Alternar Perfil (Demo)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = user.role === role.role;
          
          return (
            <DropdownMenuItem
              key={role.role}
              onClick={() => switchRole(role.role)}
              className="flex items-start gap-3 p-3"
            >
              <Icon className={`h-4 w-4 mt-0.5 ${isActive ? 'text-primary' : ''}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isActive ? 'text-primary' : ''}`}>
                    {role.label}
                  </span>
                  {isActive && (
                    <Badge variant="default" className="text-xs">
                      Ativo
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {role.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};