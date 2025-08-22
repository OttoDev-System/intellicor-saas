import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  ArrowUpRight,
  Plus,
  Phone
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const SupportDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Leads Novos',
      value: '42',
      change: '+23%',
      trend: 'up',
      icon: UserPlus,
      description: 'Últimas 24h'
    },
    {
      title: 'Tickets Abertos',
      value: '18',
      change: '-12%',
      trend: 'down',
      icon: MessageSquare,
      description: 'Pendentes'
    },
    {
      title: 'Tempo Médio Resposta',
      value: '2.5h',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      description: 'Melhorou'
    },
    {
      title: 'Taxa Resolução',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      description: 'Este mês'
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
            Central de atendimento e gestão de leads
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <MessageSquare className="w-3 h-3 mr-1" />
            18 Tickets Ativos
          </Badge>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Ticket
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
                  <ArrowUpRight className={`h-3 w-3 mr-1 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                </div>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
            <CardDescription>
              Novos leads que precisam de atenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'Carlos Mendes',
                  interest: 'Seguro Auto',
                  source: 'Site',
                  priority: 'Alta',
                  time: '5 min atrás',
                  priorityColor: 'bg-red-500',
                  phone: '(11) 99999-0001'
                },
                {
                  name: 'Fernanda Lima',
                  interest: 'Seguro Vida',
                  source: 'WhatsApp',
                  priority: 'Média',
                  time: '15 min atrás',
                  priorityColor: 'bg-yellow-500',
                  phone: '(11) 99999-0002'
                },
                {
                  name: 'Roberto Souza',
                  interest: 'Consórcio',
                  source: 'Instagram',
                  priority: 'Alta',
                  time: '1h atrás',
                  priorityColor: 'bg-red-500',
                  phone: '(11) 99999-0003'
                },
                {
                  name: 'Juliana Santos',
                  interest: 'Seguro Residencial',
                  source: 'Facebook',
                  priority: 'Baixa',
                  time: '2h atrás',
                  priorityColor: 'bg-green-500',
                  phone: '(11) 99999-0004'
                }
              ].map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${lead.priorityColor}`} />
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.interest} • {lead.source} • {lead.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {lead.priority}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3" />
                    </Button>
                    <span className="text-xs text-muted-foreground">{lead.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Metrics & Actions */}
        <div className="space-y-6">
          {/* Active Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Tickets Ativos</CardTitle>
              <CardDescription>
                Por prioridade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    Alta Prioridade
                  </span>
                  <Badge variant="destructive">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    Média Prioridade
                  </span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Baixa Prioridade
                  </span>
                  <Badge variant="outline">5</Badge>
                </div>
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
                  <UserPlus className="w-4 h-4 mr-2" />
                  Qualificar Lead
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Responder Tickets
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Fazer Ligação
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Base Conhecimento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;