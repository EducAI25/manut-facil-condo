import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Package, 
  MapPin, 
  Calendar,
  Wrench,
  ExternalLink,
  Filter
} from "lucide-react";
import { AssetForm } from "@/components/forms/AssetForm";
import { useState } from "react";

const assets = [
  {
    id: 1,
    name: "Elevador Social",
    category: "Vertical",
    location: "Torre A - Térreo",
    manufacturer: "Otis",
    model: "Gen2",
    serialNumber: "OT2024001",
    installDate: "2020-03-15",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    status: "ativo",
    warningLevel: "ok"
  },
  {
    id: 2,
    name: "Bomba D'água Principal",
    category: "Hidráulica",
    location: "Casa de Máquinas",
    manufacturer: "KSB",
    model: "Meganorm",
    serialNumber: "KSB2024002",
    installDate: "2019-11-20",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-03-10",
    status: "ativo",
    warningLevel: "attention"
  },
  {
    id: 3,
    name: "Portão Automático Principal",
    category: "Segurança",
    location: "Entrada Principal",
    manufacturer: "Garen",
    model: "Fast Gatter",
    serialNumber: "GR2024003",
    installDate: "2021-06-10",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-07-20",
    status: "manutenção",
    warningLevel: "urgent"
  },
  {
    id: 4,
    name: "Sistema CFTV - Bloco A",
    category: "Segurança",
    location: "Diversos pontos",
    manufacturer: "Hikvision",
    model: "DS-2CD2T85FWD",
    serialNumber: "HK2024004",
    installDate: "2022-01-15",
    lastMaintenance: "2024-01-25",
    nextMaintenance: "2024-06-25",
    status: "ativo",
    warningLevel: "ok"
  }
];

const categories = ["Todos", "Vertical", "Hidráulica", "Segurança", "Elétrica", "Estrutural"];

export default function Assets() {
  const [showAssetForm, setShowAssetForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-success text-success-foreground";
      case "manutenção":
        return "bg-warning text-warning-foreground";
      case "inativo":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getWarningColor = (level: string) => {
    switch (level) {
      case "ok":
        return "border-success/20 bg-success/5";
      case "attention":
        return "border-warning/20 bg-warning/5";
      case "urgent":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Ativos</h1>
          <p className="text-muted-foreground">Controle completo de equipamentos e infraestrutura</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={() => setShowAssetForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Ativo
        </Button>
      </div>

      {/* Formulário de novo ativo */}
      {showAssetForm && (
        <div className="bg-card p-6 rounded-lg shadow-md border border-border">
          <AssetForm onClose={() => setShowAssetForm(false)} />
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Package className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-xs text-muted-foreground">Total de Ativos</p>
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
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Em Manutenção</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Próx. Manutenção</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <ExternalLink className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Atenção Urgente</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar ativos por nome, modelo ou localização..." 
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  size="sm"
                  className="border-primary/20 hover:bg-primary/5"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <Card 
            key={asset.id} 
            className={`bg-gradient-card border shadow-card hover:shadow-glow transition-all duration-300 ${getWarningColor(asset.warningLevel)}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-foreground">{asset.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {asset.location}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(asset.status)}>
                  {asset.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Asset Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Categoria</p>
                  <p className="font-medium text-foreground">{asset.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fabricante</p>
                  <p className="font-medium text-foreground">{asset.manufacturer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Modelo</p>
                  <p className="font-medium text-foreground">{asset.model}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Série</p>
                  <p className="font-medium text-foreground">{asset.serialNumber}</p>
                </div>
              </div>

              {/* Maintenance Timeline */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Cronograma de Manutenção</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Última</p>
                    <p className="font-medium text-foreground">{asset.lastMaintenance}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Próxima</p>
                    <p className="font-medium text-foreground">{asset.nextMaintenance}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
                  Ver Detalhes
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  <Wrench className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  <Calendar className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}