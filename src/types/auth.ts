export type UserRole = 'admin' | 'corretor' | 'suporte';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  organizationId: string;
  avatarUrl?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  subdomain: string;
  logoUrl?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
  };
  settings: {
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    sessionTimeout: number;
    chatbotEnabled: boolean;
    contactInfo: {
      phone: string;
      email: string;
      address?: string;
    };
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  subscriptionStatus: 'trial' | 'active' | 'suspended' | 'cancelled';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}