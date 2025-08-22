import { useEffect } from 'react';
import { useTenant } from '@/providers/TenantProvider';

export const useTenantTheme = () => {
  const { tenant } = useTenant();

  useEffect(() => {
    if (!tenant) return;

    const root = document.documentElement;
    
    // Convert hex to HSL
    const hexToHsl = (hex: string): string => {
      // Remove # if present
      const cleanHex = hex.replace('#', '');
      
      // Parse RGB values
      const r = parseInt(cleanHex.substr(0, 2), 16) / 255;
      const g = parseInt(cleanHex.substr(2, 2), 16) / 255;
      const b = parseInt(cleanHex.substr(4, 2), 16) / 255;
      
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

    // Apply tenant theme colors
    const primaryHsl = hexToHsl(tenant.theme.primaryColor);
    const secondaryHsl = hexToHsl(tenant.theme.secondaryColor);
    
    root.style.setProperty('--primary', primaryHsl);
    root.style.setProperty('--primary-foreground', '210 40% 98%');
    root.style.setProperty('--secondary', secondaryHsl);
    root.style.setProperty('--secondary-foreground', '222.2 84% 4.9%');
    
    if (tenant.theme.accentColor) {
      const accentHsl = hexToHsl(tenant.theme.accentColor);
      root.style.setProperty('--accent', accentHsl);
      root.style.setProperty('--accent-foreground', '210 40% 98%');
    }

    // Create gradient variations
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${primaryHsl}), hsl(${secondaryHsl}))`);
    
    return () => {
      // Reset to default theme on unmount
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-foreground');
      root.style.removeProperty('--secondary');
      root.style.removeProperty('--secondary-foreground');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-foreground');
      root.style.removeProperty('--gradient-primary');
    };
  }, [tenant]);

  return { tenant };
};