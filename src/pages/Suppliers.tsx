import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Star, 
  Phone, 
  Mail,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  Filter,
  TrendingUp
} from "lucide-react";

const suppliers = [
  {
    id: 1,
    name: "ElevaCorp Ltda",
    category: "Elevadores",
    email: "contato@elevacorp.com.br",
    phone: "(11) 3456-7890",
    address: "Rua das Indústrias, 123 - São Paulo/SP",
    cnpj: "12.345.678/0001-90",
    rating: 4.8,
    totalServices: 24,
    lastService: "2024-01-15",
    averageCost: "R$ 850,00",
    specialties: ["Manutenção Preventiva", "Modernização", "Instalação"],
    status: "ativo"
  },
  {
    id: 2,
    name: "HidroTech Serviços",
    category: "Hidráulica",
    email: "comercial@hidrotech.com.br",
    phone: "(11) 2345-6789",
    address: "Av. dos Engenheiros, 456 - São Paulo/SP",
    cnpj: "23.456.789/0001-01",
    rating: 4.6,
    totalServices: 18,
    lastService: "2024-01-20",
    averageCost: "R$ 420,00",
    specialties: ["Bombas D'água", "Encanamento", "Vazamentos"],
    status: "ativo"
  },
  {
    id: 3,
    name: "SecureTech Ltda",
    category: "Segurança",
    email: "suporte@securetech.com.br",
    phone: "(11) 4567-8901",
    address: "Rua da Tecnologia, 789 - São Paulo/SP",
    cnpj: "34.567.890/0001-12",
    rating: 4.9,
    totalServices: 15,
    lastService: "2024-01-25",
    averageCost: "R$ 650,00",
    specialties: ["CFTV", "Controle de Acesso", "Alarmes"],
    status: "ativo"
  },
  {
    id: 4,
    name: "ElétricaTech",
    category: "Elétrica",
    email: "contato@eletricatech.com.br",
    phone: "(11) 5678-9012",
    address: "Rua dos Eletricistas, 321 - São Paulo/SP",
    cnpj: "45.678.901/0001-23",
    rating: 4.2,
    totalServices: 32,
    lastService: "2024-03-12",
    averageCost: "R$ 180,00",
    specialties: ["Iluminação", "Quadros Elétricos", "Emergência"],
    status: "ativo"
  },
  {
    id: 5,
    name: "AutoPortões Express",
    category: "Automação",
    email: "vendas@autoportoes.com.br",
    phone: "(11) 6789-0123",
    address: "Av. da Automação, 654 - São Paulo/SP",
    cnpj: "56.789.012/0001-34",
    rating: 3.8,
    totalServices: 8,
    lastService: "2024-03-08",
    averageCost: "R$ 320,00",
    specialties: ["Portões Automáticos", "Cancelas", "Motores"],
    status: "em_avaliacao"
  }
];

const categories = ["Todos", "Elevadores", "Hidráulica", "Segurança", "Elétrica", "Automação", "Limpeza"];

export default function Suppliers() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-success text-success-foreground";
      case "em_avaliacao":
        return "bg-warning text-warning-foreground";
      case "inativo":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-success";
    if (rating >= 4.0) return "text-primary";
    if (rating >= 3.5) return "text-warning";
    return "text-destructive";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) 
            ? "fill-current text-yellow-400" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fornecedores</h1>
          <p className="text-muted-foreground">Gestão de parceiros e prestadores de serviço</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">28</p>
                <p className="text-xs text-muted-foreground">Total Fornecedores</p>
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
                <p className="text-2xl font-bold text-foreground">4.6</p>
                <p className="text-xs text-muted-foreground">Avaliação Média</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">97</p>
                <p className="text-xs text-muted-foreground">Serviços este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 8.5k</p>
                <p className="text-xs text-muted-foreground">Gastos este mês</p>
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
                  placeholder="Buscar fornecedores por nome, categoria ou especialidade..." 
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
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

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <Card 
            key={supplier.id} 
            className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-foreground">{supplier.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Building className="h-3 w-3" />
                    {supplier.category}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(supplier.status)}>
                    {supplier.status.replace('_', ' ')}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {renderStars(supplier.rating)}
                    <span className={`text-sm font-medium ml-1 ${getRatingColor(supplier.rating)}`}>
                      {supplier.rating}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground text-xs">{supplier.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <p className="text-foreground font-semibold">{supplier.totalServices}</p>
                  <p className="text-muted-foreground">Serviços</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold">{supplier.averageCost}</p>
                  <p className="text-muted-foreground">Custo Médio</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold">{supplier.lastService}</p>
                  <p className="text-muted-foreground">Último Serviço</p>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.specialties.map((specialty, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="text-xs border-primary/20 text-primary"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
                  Ver Histórico
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  <Phone className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  <Mail className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  <Star className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}