import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Tenant } from '@/types/tenant';
import { getTenantBySubdomain, getDefaultTenant } from '@/services/mock/tenants';

interface TenantContextType {
  tenant: Tenant | null;
  isLoading: boolean;
  error: string | null;
  setTenant: (tenant: Tenant) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tenant, setTenantState] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setTenant = (newTenant: Tenant) => {
    setTenantState(newTenant);
    applyTenantTheme(newTenant);
  };

  const applyTenantTheme = (tenant: Tenant) => {
    const root = document.documentElement;
    
    // Convert hex to HSL
    const hexToHsl = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return '0 0% 0%';
      
      const r = parseInt(result[1], 16) / 255;
      const g = parseInt(result[2], 16) / 255;
      const b = parseInt(result[3], 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Apply tenant colors
    root.style.setProperty('--primary', hexToHsl(tenant.theme.primaryColor));
    root.style.setProperty('--secondary', hexToHsl(tenant.theme.secondaryColor));
    
    if (tenant.theme.accentColor) {
      root.style.setProperty('--accent', hexToHsl(tenant.theme.accentColor));
    }
  };

  const loadTenant = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Extract subdomain from URL
      const hostname = window.location.hostname;
      let subdomain = 'demo'; // default

      // Check if it's a subdomain of intellicor.com.br
      if (hostname.includes('intellicor.com.br')) {
        subdomain = hostname.split('.')[0];
      } else if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
        // For development, check URL params or use default
        const urlParams = new URLSearchParams(window.location.search);
        subdomain = urlParams.get('tenant') || 'demo';
      }

      const tenantData = getTenantBySubdomain(subdomain) || getDefaultTenant();
      setTenant(tenantData);

    } catch (err) {
      setError('Erro ao carregar dados da corretora');
      console.error('Error loading tenant:', err);
      
      // Fallback to default tenant
      const defaultTenant = getDefaultTenant();
      setTenant(defaultTenant);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTenant();
  }, []);

  // Update document title and meta tags
  useEffect(() => {
    if (tenant) {
      document.title = `${tenant.name} - Seguros, Planos de Saúde e Consórcios`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${tenant.name} - ${tenant.description || 'Soluções completas em seguros, planos de saúde e consórcios'}`
        );
      }
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, isLoading, error, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};