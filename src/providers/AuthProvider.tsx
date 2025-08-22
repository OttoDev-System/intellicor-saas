import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, Organization, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for development
const mockOrganization: Organization = {
  id: 'org-1',
  name: 'Corretora Demo INTELLICOR',
  subdomain: 'demo',
  logo: '',
  settings: {
    theme: {
      primaryColor: '#0D214F',
      secondaryColor: '#5A7A9E'
    },
    features: ['dashboard', 'clients', 'quotes', 'reports']
  },
  createdAt: new Date().toISOString()
};

const mockUsers: Record<UserRole, User> = {
  admin: {
    id: 'user-admin',
    email: 'admin@demo.com',
    fullName: 'Maria Silva Santos',
    role: 'admin',
    organizationId: 'org-1',
    createdAt: new Date().toISOString()
  },
  corretor: {
    id: 'user-corretor',
    email: 'corretor@demo.com',
    fullName: 'João Carlos Oliveira',
    role: 'corretor',
    organizationId: 'org-1',
    createdAt: new Date().toISOString()
  },
  suporte: {
    id: 'user-suporte',
    email: 'suporte@demo.com',
    fullName: 'Ana Paula Costa',
    role: 'suporte',
    organizationId: 'org-1',
    createdAt: new Date().toISOString()
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    organization: null,
    isLoading: true,
    isAuthenticated: false
  });

  // Auto-login for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      const defaultRole: UserRole = 'admin'; // Change this to test different roles
      setAuthState({
        user: mockUsers[defaultRole],
        organization: mockOrganization,
        isLoading: false,
        isAuthenticated: true
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock login logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const role: UserRole = email.includes('admin') ? 'admin' : 
                          email.includes('corretor') ? 'corretor' : 'suporte';
    
    setAuthState({
      user: mockUsers[role],
      organization: mockOrganization,
      isLoading: false,
      isAuthenticated: true
    });
  };

  const logout = async () => {
    setAuthState({
      user: null,
      organization: null,
      isLoading: false,
      isAuthenticated: false
    });
  };

  const switchRole = (role: UserRole) => {
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        user: mockUsers[role]
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};