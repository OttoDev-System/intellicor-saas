import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { UserRole } from '@/types/auth';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  userName?: string;
  organizationName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  userRole,
  userName,
  organizationName
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        userRole={userRole}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          userRole={userRole}
          userName={userName}
          organizationName={organizationName}
        />
        
        <main className={cn(
          "flex-1 overflow-y-auto bg-background p-6",
          "scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        )}>
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};