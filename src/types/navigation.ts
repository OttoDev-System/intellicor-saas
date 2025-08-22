import { LucideIcon } from 'lucide-react';
import { UserRole } from './auth';

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string | number;
  children?: NavigationItem[];
}

export type NavigationConfig = Record<UserRole, NavigationItem[]>;