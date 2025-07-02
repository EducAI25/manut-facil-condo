import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  Clock,
  MapPin,
  User,
  Users,
  CheckCircle,
  AlertCircle,
  Filter
} from "lucide-react";

const commonAreas = [
  {
    id: 1,
    name: "Salão de Festas",
    description: "Espaço amplo para eventos e comemorações",
    capacity: 50,
    features: ["Som ambiente", "Cozinha completa", "Ar condicionado"],
    hourlyRate: "R$ 80,00",
    rules: ["Não permitido fumar", "Término até 22h", "Limpeza obrigatória"],
    status: "disponível"
  },
  {
    id: 2,
    name: "Churrasqueira",
    description: "Área externa com churrasqueira e mesas",
    capacity: 20,
    features: ["Churrasqueira a gás", "4 mesas", "Pia"],
    hourlyRate: "R$ 35,00",
    rules: ["Limpeza obrigatória", "Uso até 21h", "Gás por conta do usuário"],
    status: "disponível"
  },
  {
    id: 3,
    name: "Quadra Poliesportiva",
    description: "Quadra para práticas esportivas",
    capacity: 16,
    features: ["Iluminação LED", "Arquibancada", "Vestiário"],
    hourlyRate: "R$ 25,00",
    rules: ["Calçado apropriado", "Não permitido vidro", "Uso até 20h"],
    status: "manutenção"
  },
  {
    id: 4,
    name: "Espaço Gourmet",
    description: "Área gourmet para confraternizações",
    capacity: 30,
    features: ["Bancada gourmet", "Geladeira", "Freezer", "TV 55\""],
    hourlyRate: "R$ 60,00",
    rules: ["Não permitido pets", "Música até 21h", "Limpeza obrigatória"],
    status: "disponível"
  }
];

const reservations = [
  {
    id: 1,
    area: "Salão de Festas",
    resident: "Maria Silva",
    apartment: "101-A",
    date: "2024-03-20",
    startTime: "19:00",
    endTime: "23:00",
    event: "Aniversário",
    guests: 35,
    status: "confirmada",
    totalCost: "R$ 320,00"
  },
  {
    id: 2,
    area: "Churrasqueira",
    resident: "João Santos",
    apartment: "205-B",
    date: "2024-03-22",
    startTime: "12:00",
    endTime: "18:00",
    event: "Almoço família",
    guests: 12,
    status: "pendente",
    totalCost: "R$ 210,00"
  },
  {
    id: 3,
    area: "Espaço Gourmet",
    resident: "Ana Costa",
    apartment: "302-A",
    date: "2024-03-25",
    startTime: "15:00",
    endTime: "20:00",
    event: "Confraternização",
    guests: 25,
    status: "confirmada",
    totalCost: "R$ 300,00"
  },
  {
    id: 4,
    area: "Quadra Poliesportiva",
    resident: "Carlos Oliveira",
    apartment: "401-C",
    date: "2024-03-18",
    startTime: "08:00",
    endTime: "10:00",
    event: "Treino futebol",
    guests: 14,
    status: "concluída",
    totalCost: "R$ 50,00"
  }
];

const upcomingEvents = [
  {
    area: "Salão de Festas",
    date: "Hoje",
    time: "19:00-23:00",
    resident: "Maria Silva"
  },
  {
    area: "Churrasqueira",
    date: "Amanhã",
    time: "12:00-18:00",
    resident: "João Santos"
  },
  {
    area: "Espaço Gourmet",
    date: "25/03",
    time: "15:00-20:00",
    resident: "Ana Costa"
  }
];

export default function CommonAreas() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponível":
        return "bg-success text-success-foreground";
      case "manutenção":
        return "bg-warning text-warning-foreground";
      case "ocupado":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getReservationStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-success text-success-foreground";
      case "pendente":
        return "bg-warning text-warning-foreground";
      case "cancelada":
        return "bg-destructive text-destructive-foreground";
      case "concluída":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Áreas Comuns</h1>
          <p className="text-muted-foreground">Gestão e agendamento de espaços compartilhados</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Nova Reserva
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Áreas Disponíveis</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Reservas este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Próximos eventos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">85%</p>
                <p className="text-xs text-muted-foreground">Taxa de ocupação</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Areas List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Áreas Disponíveis</CardTitle>
              <CardDescription>Espaços para reserva e suas especificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonAreas.map((area) => (
                  <Card 
                    key={area.id} 
                    className="bg-gradient-card border shadow-card hover:shadow-glow transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-foreground">{area.name}</CardTitle>
                          <CardDescription>{area.description}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(area.status)}>
                          {area.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Capacidade</p>
                          <p className="font-medium text-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {area.capacity} pessoas
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Valor/hora</p>
                          <p className="font-medium text-foreground">{area.hourlyRate}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Recursos</p>
                        <div className="flex flex-wrap gap-1">
                          {area.features.map((feature, index) => (
                            <Badge 
                              key={index}
                              variant="outline" 
                              className="text-xs border-primary/20 text-primary"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Regras de Uso</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {area.rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-primary">•</span>
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-primary/20 hover:bg-primary/5"
                          disabled={area.status !== "disponível"}
                        >
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Reservar
                        </Button>
                        <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                          Ver Agenda
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Events */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg border border-border/50">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground text-sm">{event.area}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{event.date}</span>
                        <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                        <span className="text-muted-foreground">{event.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">por {event.resident}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Reserve */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Reserva Rápida</CardTitle>
              <CardDescription>Agende um espaço rapidamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Salão de Festas
              </Button>
              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Churrasqueira
              </Button>
              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Espaço Gourmet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Reservations */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-foreground">Reservas Recentes</CardTitle>
              <CardDescription>Histórico de agendamentos e status</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar reservas..." 
                  className="pl-10 w-64 bg-background border-border"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div>
                    <p className="font-medium text-foreground">{reservation.area}</p>
                    <p className="text-xs text-muted-foreground">{reservation.event}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {reservation.resident}
                    </p>
                    <p className="text-xs text-muted-foreground">{reservation.apartment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{reservation.date}</p>
                    <p className="text-xs text-muted-foreground">{reservation.startTime} - {reservation.endTime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{reservation.guests}</p>
                    <p className="text-xs text-muted-foreground">convidados</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{reservation.totalCost}</p>
                    <p className="text-xs text-muted-foreground">total</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getReservationStatusColor(reservation.status)}>
                      {reservation.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                      Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}