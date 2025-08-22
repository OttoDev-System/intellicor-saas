export type UserRole = 'admin' | 'corretor' | 'suporte';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  organizationId: string;
  avatar?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  settings: {
    theme: {
      primaryColor: string;
      secondaryColor: string;
    };
    features: string[];
  };
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}