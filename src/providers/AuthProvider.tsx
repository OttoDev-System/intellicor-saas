import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, User as AppUser, Organization, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, fullName: string, organizationSubdomain?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (updates: Partial<AppUser>) => Promise<{ error?: string }>;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    organization: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserData(session.user);
        } else {
          setAuthState({
            user: null,
            organization: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await loadUserData(session.user);
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (user: User) => {
    try {
      // Load user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.error('Error loading profile:', profileError);
        setAuthState({
          user: null,
          organization: null,
          isLoading: false,
          isAuthenticated: false
        });
        return;
      }

      // Load organization
      const { data: organization, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', profile.organization_id)
        .single();

      if (orgError || !organization) {
        console.error('Error loading organization:', orgError);
        setAuthState({
          user: null,
          organization: null,
          isLoading: false,
          isAuthenticated: false
        });
        return;
      }

      // Update last login
      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id);

      const appUser: AppUser = {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role as UserRole,
        organizationId: profile.organization_id,
        avatarUrl: profile.avatar_url,
        phone: profile.phone,
        isActive: profile.is_active,
        lastLogin: profile.last_login,
        createdAt: profile.created_at
      };

      const appOrg: Organization = {
        id: organization.id,
        name: organization.name,
        subdomain: organization.subdomain,
        logoUrl: organization.logo_url,
        theme: organization.theme as any,
        settings: organization.settings as any,
        subscriptionStatus: organization.subscription_status as any,
        createdAt: organization.created_at
      };

      setAuthState({
        user: appUser,
        organization: appOrg,
        isLoading: false,
        isAuthenticated: true
      });

    } catch (error) {
      console.error('Error loading user data:', error);
      setAuthState({
        user: null,
        organization: null,
        isLoading: false,
        isAuthenticated: false
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'Erro inesperado' };
    }
  };

  const register = async (
    email: string, 
    password: string, 
    fullName: string, 
    organizationSubdomain?: string
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            organization_subdomain: organizationSubdomain || 'demo'
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'Erro inesperado' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'Erro inesperado' };
    }
  };

  const updateProfile = async (updates: Partial<AppUser>) => {
    if (!authState.user) {
      return { error: 'Usuário não autenticado' };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.fullName,
          phone: updates.phone,
          avatar_url: updates.avatarUrl
        })
        .eq('id', authState.user.id);

      if (error) {
        return { error: error.message };
      }

      // Reload user data
      const session = await supabase.auth.getSession();
      if (session.data.session?.user) {
        await loadUserData(session.data.session.user);
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'Erro inesperado' };
    }
  };

  const switchRole = (role: UserRole) => {
    // This is a demo function for development - in production, roles should be managed via database
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, role } : null
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      resetPassword,
      updateProfile,
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