import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Save, X, Users } from 'lucide-react';

interface ReservationFormProps {
  onClose: () => void;
  onSave: (reservation: any) => void;
}

export function ReservationForm({ onClose, onSave }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    area: '',
    resident: '',
    apartment: '',
    date: '',
    startTime: '',
    endTime: '',
    event: '',
    guests: '',
    phone: '',
    email: '',
    notes: ''
  });

  const areas = [
    { id: 'salao', name: 'Salão de Festas', rate: 80 },
    { id: 'churrasqueira', name: 'Churrasqueira', rate: 35 },
    { id: 'quadra', name: 'Quadra Poliesportiva', rate: 25 },
    { id: 'gourmet', name: 'Espaço Gourmet', rate: 60 }
  ];

  const eventTypes = [
    'Aniversário',
    'Casamento',
    'Confraternização',
    'Reunião Familiar',
    'Festa Infantil',
    'Evento Corporativo',
    'Outros'
  ];

  const calculateTotal = () => {
    const selectedArea = areas.find(area => area.id === formData.area);
    if (!selectedArea || !formData.startTime || !formData.endTime) return 0;
    
    const start = new Date(`2024-01-01T${formData.startTime}`);
    const end = new Date(`2024-01-01T${formData.endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    return hours * selectedArea.rate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = calculateTotal();
    onSave({ ...formData, totalCost: `R$ ${total.toFixed(2)}` });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Nova Reserva
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Área Comum</Label>
              <Select value={formData.area} onValueChange={(value) => handleChange('area', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name} - R$ {area.rate},00/hora
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Horário de Início</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">Horário de Término</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resident">Nome do Morador</Label>
              <Input
                id="resident"
                value={formData.resident}
                onChange={(e) => handleChange('resident', e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apartment">Apartamento</Label>
              <Input
                id="apartment"
                value={formData.apartment}
                onChange={(e) => handleChange('apartment', e.target.value)}
                placeholder="Ex: 101-A"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event">Tipo de Evento</Label>
              <Select value={formData.event} onValueChange={(value) => handleChange('event', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guests">Número de Convidados</Label>
              <Input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={(e) => handleChange('guests', e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Informações adicionais sobre o evento..."
              rows={2}
            />
          </div>

          {calculateTotal() > 0 && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Valor Total:</span>
                <span className="text-lg font-bold text-primary">R$ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Confirmar Reserva
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}