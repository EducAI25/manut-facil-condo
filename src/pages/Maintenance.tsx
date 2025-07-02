import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  User,
  Camera,
  FileText,
  Filter
} from "lucide-react";

const preventiveMaintenance = [
  {
    id: 1,
    title: "Manutenção Elevador Social",
    asset: "Elevador Social - Torre A",
    type: "Preventiva Mensal",
    dueDate: "2024-03-15",
    status: "agendada",
    responsible: "ElevaCorp Ltda",
    priority: "high",
    checklist: ["Verificar cabos", "Testar freios", "Lubrificar guias"]
  },
  {
    id: 2,
    title: "Limpeza Sistema de Bombeamento",
    asset: "Bomba D'água Principal",
    type: "Preventiva Trimestral",
    dueDate: "2024-03-20",
    status: "pendente",
    responsible: "HidroTech Serviços",
    priority: "medium",
    checklist: ["Trocar filtros", "Verificar pressão", "Teste de vazão"]
  },
  {
    id: 3,
    title: "Inspeção CFTV",
    asset: "Sistema CFTV - Bloco A",
    type: "Preventiva Semestral",
    dueDate: "2024-03-25",
    status: "em_andamento",
    responsible: "SecureTech",
    priority: "low",
    checklist: ["Verificar câmeras", "Testar gravação", "Limpar lentes"]
  }
];

const correctiveMaintenance = [
  {
    id: 1,
    title: "Vazamento Bomba D'água",
    asset: "Bomba D'água Principal",
    description: "Identificado vazamento na conexão principal da bomba",
    openedBy: "João Silva - Zelador",
    openedDate: "2024-03-10",
    status: "em_andamento",
    priority: "urgent",
    assignedTo: "HidroTech Serviços",
    estimatedCost: "R$ 450,00",
    attachments: ["foto_vazamento.jpg"]
  },
  {
    id: 2,
    title: "Portão não abre completamente",
    asset: "Portão Automático Principal",
    description: "Portão está parando a meio curso, possível problema no motor",
    openedBy: "Maria Santos - Síndica",
    openedDate: "2024-03-08",
    status: "aguardando_orcamento",
    priority: "high",
    assignedTo: "AutoPortões Express",
    estimatedCost: "Aguardando orçamento",
    attachments: ["video_portao.mp4"]
  },
  {
    id: 3,
    title: "Lâmpada queimada - Garagem",
    asset: "Iluminação Garagem - Bloco B",
    description: "Lâmpada LED queimada na área de circulação",
    openedBy: "Carlos Oliveira - Morador",
    openedDate: "2024-03-12",
    status: "resolvido",
    priority: "low",
    assignedTo: "ElétricaTech",
    estimatedCost: "R$ 35,00",
    attachments: []
  }
];

export default function Maintenance() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendada":
      case "em_andamento":
        return "bg-primary text-primary-foreground";
      case "pendente":
      case "aguardando_orcamento":
        return "bg-warning text-warning-foreground";
      case "resolvido":
        return "bg-success text-success-foreground";
      case "cancelado":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-destructive bg-destructive/5";
      case "high":
        return "border-l-warning bg-warning/5";
      case "medium":
        return "border-l-primary bg-primary/5";
      default:
        return "border-l-muted bg-muted/5";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manutenções</h1>
          <p className="text-muted-foreground">Gestão preventiva e corretiva dos ativos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
            <Plus className="h-4 w-4 mr-2" />
            Nova Preventiva
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Abrir Chamado
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Preventivas Agendadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground">Chamados Abertos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Concluídas este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Clock className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Urgentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="preventive" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted/20">
          <TabsTrigger value="preventive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Manutenções Preventivas
          </TabsTrigger>
          <TabsTrigger value="corrective" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Manutenções Corretivas
          </TabsTrigger>
        </TabsList>

        {/* Preventive Maintenance */}
        <TabsContent value="preventive" className="space-y-4">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar manutenções preventivas..." 
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {preventiveMaintenance.map((maintenance) => (
              <Card 
                key={maintenance.id} 
                className={`bg-gradient-card border shadow-card hover:shadow-glow transition-all duration-300 border-l-4 ${getPriorityColor(maintenance.priority)}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg text-foreground">{maintenance.title}</CardTitle>
                      <CardDescription>{maintenance.asset}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(maintenance.status)}>
                      {maintenance.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tipo</p>
                      <p className="font-medium text-foreground">{maintenance.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data Prevista</p>
                      <p className="font-medium text-foreground">{maintenance.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Responsável</p>
                      <p className="font-medium text-foreground">{maintenance.responsible}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Checklist de Atividades</p>
                    <div className="space-y-1">
                      {maintenance.checklist.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded border-border" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                      <Calendar className="h-3 w-3 mr-1" />
                      Reagendar
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Concluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Corrective Maintenance */}
        <TabsContent value="corrective" className="space-y-4">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar chamados..." 
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {correctiveMaintenance.map((issue) => (
              <Card 
                key={issue.id} 
                className={`bg-gradient-card border shadow-card hover:shadow-glow transition-all duration-300 border-l-4 ${getPriorityColor(issue.priority)}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg text-foreground">{issue.title}</CardTitle>
                      <CardDescription>{issue.asset}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/20 p-3 rounded-lg border border-border/50">
                    <p className="text-sm text-foreground">{issue.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Aberto por</p>
                      <p className="font-medium text-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {issue.openedBy}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data de Abertura</p>
                      <p className="font-medium text-foreground">{issue.openedDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Atribuído a</p>
                      <p className="font-medium text-foreground">{issue.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Custo Estimado</p>
                      <p className="font-medium text-foreground">{issue.estimatedCost}</p>
                    </div>
                  </div>

                  {issue.attachments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Anexos</p>
                      <div className="flex gap-2">
                        {issue.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs bg-muted/20 px-2 py-1 rounded border border-border/50">
                            {file.includes('.jpg') || file.includes('.png') ? 
                              <Camera className="h-3 w-3" /> : 
                              <FileText className="h-3 w-3" />
                            }
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                      <Camera className="h-3 w-3 mr-1" />
                      Anexar Foto
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                      <Wrench className="h-3 w-3 mr-1" />
                      Atualizar Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}