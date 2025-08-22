import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { LoadingScreen } from '@/components/ui/loading-screen';
import type { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  requiredPermission 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on user role
    const redirectPath = user?.role === 'admin' ? '/admin' : 
                        user?.role === 'corretor' ? '/broker' : 
                        '/support';
    return <Navigate to={redirectPath} replace />;
  }

  // TODO: Implement permission checking when needed
  if (requiredPermission) {
    // For now, just allow access
    // In future, implement proper permission checking
  }

  return <>{children}</>;
};