import { 
  LayoutDashboard, 
  Users, 
  Building, 
  BarChart, 
  Settings,
  UserPlus,
  MessageSquare,
  HelpCircle,
  FileText,
  DollarSign,
  Shield,
  Activity,
  Briefcase,
  Bell
} from 'lucide-react';
import { NavigationConfig } from '@/types/navigation';

export const navigationConfig: NavigationConfig = {
  admin: [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/admin',
    },
    { 
      icon: Users, 
      label: 'Usuários', 
      href: '/admin/users',
      badge: 'Novo'
    },
    { 
      icon: Building, 
      label: 'Organização', 
      href: '/admin/organization' 
    },
    { 
      icon: Shield, 
      label: 'Segurança', 
      href: '/admin/security' 
    },
    { 
      icon: BarChart, 
      label: 'Relatórios', 
      href: '/admin/reports' 
    },
    { 
      icon: Activity, 
      label: 'Analytics', 
      href: '/admin/analytics' 
    },
    { 
      icon: Settings, 
      label: 'Configurações', 
      href: '/admin/settings' 
    }
  ],
  corretor: [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/broker' 
    },
    { 
      icon: Users, 
      label: 'Clientes', 
      href: '/broker/clients' 
    },
    { 
      icon: FileText, 
      label: 'Cotações', 
      href: '/broker/quotes',
      badge: 5
    },
    { 
      icon: Briefcase, 
      label: 'Apólices', 
      href: '/broker/policies' 
    },
    { 
      icon: DollarSign, 
      label: 'Comissões', 
      href: '/broker/commissions' 
    },
    { 
      icon: BarChart, 
      label: 'Performance', 
      href: '/broker/performance' 
    }
  ],
  suporte: [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/support' 
    },
    { 
      icon: UserPlus, 
      label: 'Leads', 
      href: '/support/leads',
      badge: 12
    },
    { 
      icon: MessageSquare, 
      label: 'Tickets', 
      href: '/support/tickets',
      badge: 3
    },
    { 
      icon: Users, 
      label: 'Clientes', 
      href: '/support/clients' 
    },
    { 
      icon: HelpCircle, 
      label: 'Base Conhecimento', 
      href: '/support/knowledge' 
    },
    { 
      icon: Bell, 
      label: 'Notificações', 
      href: '/support/notifications' 
    }
  ]
};