import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  Settings
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const AdminDashboard: React.FC = () => {
  const { user, organization } = useAuth();

  const stats = [
    {
      title: 'Usuários Ativos',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Users,
      description: 'Últimos 30 dias'
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.280',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      description: 'Comparado ao mês anterior'
    },
    {
      title: 'Cotações Ativas',
      value: '156',
      change: '+18%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Em andamento'
    },
    {
      title: 'Taxa Conversão',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      description: 'Leads para clientes'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bem-vindo, {user?.fullName?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Visão geral da {organization?.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <Activity className="w-3 h-3 mr-1" />
            Sistema Online
          </Badge>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">{stat.change}</span>
                </div>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Principais eventos da organização
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Nova cotação criada',
                  user: 'João Corretor',
                  time: '5 min atrás',
                  type: 'success'
                },
                {
                  action: 'Cliente cadastrado',
                  user: 'Ana Suporte',
                  time: '12 min atrás',
                  type: 'info'
                },
                {
                  action: 'Apólice renovada',
                  user: 'Carlos Corretor',
                  time: '1h atrás',
                  type: 'success'
                },
                {
                  action: 'Lead qualificado',
                  user: 'Paula Suporte',
                  time: '2h atrás',
                  type: 'warning'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-success' :
                      activity.type === 'warning' ? 'bg-warning' : 'bg-accent'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">por {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Usuários
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configurações da Org
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Relatórios Detalhados
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                Logs do Sistema
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;