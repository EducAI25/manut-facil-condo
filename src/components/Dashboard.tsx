import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Wrench, 
  TrendingUp, 
  Package,
  Calendar,
  DollarSign,
  Activity,
  AlertCircle
} from "lucide-react";

const statsCards = [
  {
    title: "Ativos Ativos",
    value: "24",
    change: "+2 este mês",
    icon: Package,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Manutenções Preventivas",
    value: "8",
    change: "3 próximas",
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Chamados Abertos",
    value: "5",
    change: "2 urgentes",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    title: "Economia Mensal",
    value: "R$ 2.450",
    change: "+12% vs anterior",
    icon: DollarSign,
    color: "text-success",
    bgColor: "bg-success/10"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "maintenance",
    title: "Manutenção Elevador Social",
    description: "Manutenção preventiva concluída",
    time: "2h atrás",
    status: "completed",
    priority: "high"
  },
  {
    id: 2,
    type: "issue",
    title: "Vazamento na Bomba D'água",
    description: "Chamado aberto por João Silva",
    time: "4h atrás",
    status: "open",
    priority: "urgent"
  },
  {
    id: 3,
    type: "preventive",
    title: "Limpeza de Calhas - Bloco A",
    description: "Agendada para amanhã",
    time: "1 dia",
    status: "scheduled",
    priority: "medium"
  },
  {
    id: 4,
    type: "supplier",
    title: "Novo Fornecedor Cadastrado",
    description: "TechElevadores Ltda",
    time: "2 dias atrás",
    status: "completed",
    priority: "low"
  }
];

const upcomingMaintenance = [
  {
    asset: "Elevador Social",
    type: "Preventiva",
    date: "Amanhã",
    responsible: "ElevaCorp",
    priority: "high"
  },
  {
    asset: "Portão Principal",
    type: "Inspeção",
    date: "Em 3 dias",
    responsible: "SeguraMax",
    priority: "medium"
  },
  {
    asset: "Sistema de Bombeamento",
    type: "Troca de Filtros",
    date: "Próxima semana",
    responsible: "HidroTech",
    priority: "medium"
  }
];

export function Dashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "open":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-primary" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da gestão do condomínio</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Activity className="h-5 w-5 text-primary" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>Últimas movimentações do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                  <div className="mt-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground text-sm">{activity.title}</p>
                      <Badge variant="outline" className={getPriorityColor(activity.priority)}>
                        {activity.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-primary/20 hover:bg-primary/5">
              Ver Todas as Atividades
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Maintenance */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Wrench className="h-5 w-5 text-primary" />
              Próximas Manutenções
            </CardTitle>
            <CardDescription>Manutenções preventivas agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMaintenance.map((maintenance, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">{maintenance.asset}</p>
                    <p className="text-xs text-muted-foreground">{maintenance.type}</p>
                    <p className="text-xs text-muted-foreground">por {maintenance.responsible}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className={getPriorityColor(maintenance.priority)}>
                      {maintenance.priority}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{maintenance.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-primary/20 hover:bg-primary/5">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Calendário Completo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
          <CardDescription>Acesso rápido às funcionalidades mais utilizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span className="font-medium">Abrir Chamado</span>
                <span className="text-xs opacity-75">Reportar problema</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 border-primary/20 hover:bg-primary/5">
              <div className="flex flex-col items-center gap-2">
                <Package className="h-6 w-6" />
                <span className="font-medium">Cadastrar Ativo</span>
                <span className="text-xs opacity-75">Novo equipamento</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 border-primary/20 hover:bg-primary/5">
              <div className="flex flex-col items-center gap-2">
                <Calendar className="h-6 w-6" />
                <span className="font-medium">Agendar Área</span>
                <span className="text-xs opacity-75">Reservar espaço</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}