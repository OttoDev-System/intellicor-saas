import { useMemo } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import type { UserRole } from '@/types/auth';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  conditions?: Record<string, any>;
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    { resource: '*', action: 'create' },
    { resource: '*', action: 'read' },
    { resource: '*', action: 'update' },
    { resource: '*', action: 'delete' },
  ],
  corretor: [
    { resource: 'clients', action: 'create' },
    { resource: 'clients', action: 'read' },
    { resource: 'clients', action: 'update' },
    { resource: 'quotes', action: 'create' },
    { resource: 'quotes', action: 'read' },
    { resource: 'quotes', action: 'update' },
    { resource: 'policies', action: 'read' },
    { resource: 'commissions', action: 'read' },
  ],
  suporte: [
    { resource: 'leads', action: 'read' },
    { resource: 'leads', action: 'update' },
    { resource: 'tickets', action: 'create' },
    { resource: 'tickets', action: 'read' },
    { resource: 'tickets', action: 'update' },
    { resource: 'clients', action: 'read' },
    { resource: 'knowledge', action: 'read' },
  ],
};

export const usePermissions = () => {
  const { user } = useAuth();

  const permissions = useMemo(() => {
    if (!user) return [];
    return ROLE_PERMISSIONS[user.role] || [];
  }, [user]);

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;

    // Admin has all permissions
    if (user.role === 'admin') return true;

    return permissions.some(
      (permission) =>
        (permission.resource === '*' || permission.resource === resource) &&
        permission.action === action
    );
  };

  const canAccess = (resource: string): boolean => {
    return hasPermission(resource, 'read');
  };

  const canCreate = (resource: string): boolean => {
    return hasPermission(resource, 'create');
  };

  const canUpdate = (resource: string): boolean => {
    return hasPermission(resource, 'update');
  };

  const canDelete = (resource: string): boolean => {
    return hasPermission(resource, 'delete');
  };

  return {
    permissions,
    hasPermission,
    canAccess,
    canCreate,
    canUpdate,
    canDelete,
  };
};