import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  DollarSign, 
  FileText, 
  Target,
  ArrowUpRight,
  Plus,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const BrokerDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Clientes Ativos',
      value: '87',
      change: '+6%',
      trend: 'up',
      icon: Users,
      description: 'Este mês'
    },
    {
      title: 'Comissões Pendentes',
      value: 'R$ 12.450',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      description: 'A receber'
    },
    {
      title: 'Cotações Ativas',
      value: '23',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      description: 'Em andamento'
    },
    {
      title: 'Meta Mensal',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: Target,
      description: 'R$ 15.600 / R$ 20.000'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Olá, {user?.fullName?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Suas atividades e performance como corretor
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <Target className="w-3 h-3 mr-1" />
            78% da Meta
          </Badge>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Cotação
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Quotes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cotações Recentes</CardTitle>
            <CardDescription>
              Suas últimas cotações e status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  client: 'Maria Santos',
                  product: 'Seguro Auto',
                  value: 'R$ 2.450,00',
                  status: 'Em análise',
                  date: 'Hoje',
                  statusColor: 'bg-yellow-500'
                },
                {
                  client: 'João Silva',
                  product: 'Seguro Vida',
                  value: 'R$ 890,00',
                  status: 'Aprovado',
                  date: 'Ontem',
                  statusColor: 'bg-success'
                },
                {
                  client: 'Ana Costa',
                  product: 'Seguro Residencial',
                  value: 'R$ 1.200,00',
                  status: 'Aguardando docs',
                  date: '2 dias',
                  statusColor: 'bg-orange-500'
                }
              ].map((quote, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${quote.statusColor}`} />
                    <div>
                      <p className="text-sm font-medium">{quote.client}</p>
                      <p className="text-xs text-muted-foreground">{quote.product} • {quote.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {quote.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{quote.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance & Goals */}
        <div className="space-y-6">
          {/* Monthly Goal */}
          <Card>
            <CardHeader>
              <CardTitle>Meta Mensal</CardTitle>
              <CardDescription>
                Progresso atual: R$ 15.600 / R$ 20.000
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={78} className="mb-4" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">78% completo</span>
                <span className="font-medium">R$ 4.400 restantes</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Cotação
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Buscar Cliente
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Follow-up
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Ver Comissões
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;