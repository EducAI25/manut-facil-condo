import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Download, 
  TrendingUp, 
  AlertTriangle,
  DollarSign,
  Calendar,
  Package,
  Wrench,
  FileText,
  Eye
} from "lucide-react";

const costReports = [
  {
    period: "Janeiro 2024",
    totalCost: "R$ 4.850,00",
    preventive: "R$ 2.100,00",
    corrective: "R$ 2.750,00",
    assetBreakdown: [
      { name: "Elevadores", cost: "R$ 1.850,00", percentage: 38 },
      { name: "Hidráulica", cost: "R$ 1.200,00", percentage: 25 },
      { name: "Segurança", cost: "R$ 950,00", percentage: 20 },
      { name: "Elétrica", cost: "R$ 850,00", percentage: 17 }
    ]
  }
];

const problematicAssets = [
  {
    name: "Bomba D'água Principal",
    issues: 8,
    lastIssue: "2024-03-10",
    totalCost: "R$ 1.850,00",
    recommendation: "Considerar substituição",
    severity: "high"
  },
  {
    name: "Portão Automático Garagem",
    issues: 5,
    lastIssue: "2024-03-08",
    totalCost: "R$ 980,00",
    recommendation: "Manutenção preventiva intensiva",
    severity: "medium"
  },
  {
    name: "Elevador Social",
    issues: 3,
    lastIssue: "2024-02-15",
    totalCost: "R$ 650,00",
    recommendation: "Monitoramento regular",
    severity: "low"
  }
];

const maintenanceStats = [
  {
    month: "Janeiro",
    preventive: 12,
    corrective: 8,
    completed: 18,
    pending: 2
  },
  {
    month: "Fevereiro", 
    preventive: 10,
    corrective: 6,
    completed: 14,
    pending: 2
  },
  {
    month: "Março",
    preventive: 8,
    corrective: 5,
    completed: 11,
    pending: 2
  }
];

const supplierPerformance = [
  {
    name: "ElevaCorp Ltda",
    services: 24,
    rating: 4.8,
    avgCost: "R$ 850,00",
    onTime: "95%",
    category: "Elevadores"
  },
  {
    name: "SecureTech Ltda",
    services: 15,
    rating: 4.9,
    avgCost: "R$ 650,00",
    onTime: "100%",
    category: "Segurança"
  },
  {
    name: "HidroTech Serviços",
    services: 18,
    rating: 4.6,
    avgCost: "R$ 420,00",
    onTime: "87%",
    category: "Hidráulica"
  }
];

export default function Reports() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-warning bg-warning/5";
      case "low":
        return "border-l-success bg-success/5";
      default:
        return "border-l-muted bg-muted/5";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-success";
    if (rating >= 4.0) return "text-primary";
    return "text-warning";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios e Analytics</h1>
          <p className="text-muted-foreground">Análise de dados e performance do condomínio</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 14.5k</p>
                <p className="text-xs text-muted-foreground">Gastos Trimestre</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">-12%</p>
                <p className="text-xs text-muted-foreground">vs Trimestre Anterior</p>
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
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Ativos Problemáticos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">92%</p>
                <p className="text-xs text-muted-foreground">Taxa de Conclusão</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Reports Tabs */}
      <Tabs defaultValue="costs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="costs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Custos
          </TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Ativos
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Manutenções
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Fornecedores
          </TabsTrigger>
        </TabsList>

        {/* Cost Reports */}
        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BarChart className="h-5 w-5 text-primary" />
                  Análise de Custos - Janeiro 2024
                </CardTitle>
                <CardDescription>Breakdown detalhado dos gastos por categoria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-lg font-bold text-success">R$ 2.100,00</p>
                    <p className="text-xs text-muted-foreground">Preventiva</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-lg font-bold text-warning">R$ 2.750,00</p>
                    <p className="text-xs text-muted-foreground">Corretiva</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {costReports[0].assetBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">{item.name}</span>
                        <span className="font-medium text-foreground">{item.cost}</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Tendência de Gastos</CardTitle>
                <CardDescription>Evolução dos custos nos últimos meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="text-foreground font-semibold">Nov</p>
                      <p className="text-muted-foreground">R$ 5.2k</p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Dez</p>
                      <p className="text-muted-foreground">R$ 4.1k</p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Jan</p>
                      <p className="text-primary font-semibold">R$ 4.8k</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-foreground">Economia de 12%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Comparado ao trimestre anterior, houve uma redução significativa nos custos devido ao aumento das manutenções preventivas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Problematic Assets */}
        <TabsContent value="assets" className="space-y-4">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Ativos Problemáticos
              </CardTitle>
              <CardDescription>Equipamentos que requerem atenção especial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {problematicAssets.map((asset, index) => (
                  <Card 
                    key={index}
                    className={`border-l-4 ${getSeverityColor(asset.severity)} bg-gradient-card border shadow-card`}
                  >
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="font-medium text-foreground">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">Último problema: {asset.lastIssue}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-destructive">{asset.issues}</p>
                          <p className="text-xs text-muted-foreground">Ocorrências</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-warning">{asset.totalCost}</p>
                          <p className="text-xs text-muted-foreground">Custo Total</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{asset.recommendation}</p>
                          <Button size="sm" variant="outline" className="mt-2 border-primary/20 hover:bg-primary/5">
                            <Eye className="h-3 w-3 mr-1" />
                            Analisar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Stats */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Performance de Manutenções</CardTitle>
                <CardDescription>Estatísticas dos últimos 3 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceStats.map((stat, index) => (
                    <div key={index} className="p-3 bg-muted/20 rounded-lg border border-border/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">{stat.month}</span>
                        <span className="text-sm text-muted-foreground">
                          {stat.completed} concluídas
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-center">
                        <div>
                          <p className="text-success font-semibold">{stat.preventive}</p>
                          <p className="text-muted-foreground">Preventiva</p>
                        </div>
                        <div>
                          <p className="text-warning font-semibold">{stat.corrective}</p>
                          <p className="text-muted-foreground">Corretiva</p>
                        </div>
                        <div>
                          <p className="text-destructive font-semibold">{stat.pending}</p>
                          <p className="text-muted-foreground">Pendente</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Indicadores Chave</CardTitle>
                <CardDescription>KPIs de manutenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-primary/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Taxa de Preventiva</span>
                      <span className="font-bold text-primary">68%</span>
                    </div>
                    <div className="w-full bg-muted/30 h-2 rounded-full mt-2">
                      <div className="w-2/3 h-full bg-gradient-primary rounded-full" />
                    </div>
                  </div>
                  
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Tempo Médio Resolução</span>
                      <span className="font-bold text-success">2.3 dias</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">SLA Cumprido</span>
                      <span className="font-bold text-warning">92%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Supplier Performance */}
        <TabsContent value="suppliers" className="space-y-4">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Performance de Fornecedores</CardTitle>
              <CardDescription>Ranking dos principais prestadores de serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierPerformance.map((supplier, index) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="font-medium text-foreground">{supplier.name}</p>
                        <p className="text-xs text-muted-foreground">{supplier.category}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-foreground">{supplier.services}</p>
                        <p className="text-xs text-muted-foreground">Serviços</p>
                      </div>
                      <div className="text-center">
                        <p className={`font-bold ${getRatingColor(supplier.rating)}`}>
                          {supplier.rating}
                        </p>
                        <p className="text-xs text-muted-foreground">Avaliação</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-foreground">{supplier.avgCost}</p>
                        <p className="text-xs text-muted-foreground">Custo Médio</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-success">{supplier.onTime}</p>
                        <p className="text-xs text-muted-foreground">Pontualidade</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}