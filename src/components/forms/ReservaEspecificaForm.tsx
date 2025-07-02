import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReservations } from '@/hooks/useReservations';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, UtensilsCrossed, Flame } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReservaFormProps {
  tipoArea: 'salao' | 'churrasqueira' | 'gourmet' | 'quadra';
}

function ReservaForm({ tipoArea }: ReservaFormProps) {
  const { createReservation, commonAreas, loading } = useReservations();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    start_datetime: '',
    end_datetime: '',
    purpose: '',
    expected_guests: '',
    nome_responsavel: user?.email || '',
    unidade_responsavel: 'Apto 101', // Seria preenchido automaticamente do perfil do usuário
    necessita_limpeza: false,
    necessita_mobiliario: false,
    especificar_mobiliario: '',
    concorda_regras: false,
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (loading || !commonAreas.length) {
      toast({ title: 'Erro', description: 'Áreas comuns ainda não carregadas. Aguarde e tente novamente.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    // Buscar o ID real da área comum pelo nome
    const area = commonAreas.find(a =>
      (tipoArea === 'salao' && a.name.toLowerCase().includes('salão')) ||
      (tipoArea === 'churrasqueira' && a.name.toLowerCase().includes('churrasqueira')) ||
      (tipoArea === 'gourmet' && a.name.toLowerCase().includes('gourmet')) ||
      (tipoArea === 'quadra' && a.name.toLowerCase().includes('quadra'))
    );
    const common_area_id = area?.id;

    if (!common_area_id) {
      toast({ title: 'Erro', description: 'Área comum não encontrada', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    const reservationData = {
      common_area_id,
      start_datetime: formData.start_datetime,
      end_datetime: formData.end_datetime,
      purpose: formData.purpose,
      expected_guests: formData.expected_guests ? parseInt(formData.expected_guests) : undefined,
      status: 'pending',
      payment_status: 'pending',
      tipo_area: tipoArea,
      nome_responsavel: formData.nome_responsavel,
      unidade_responsavel: formData.unidade_responsavel,
      necessita_limpeza: formData.necessita_limpeza,
      necessita_mobiliario: formData.necessita_mobiliario,
      especificar_mobiliario: formData.especificar_mobiliario,
      concorda_regras: formData.concorda_regras,
      notes: formData.notes,
    };

    await createReservation(reservationData);
    
    // Reset form
    setFormData({
      start_datetime: '',
      end_datetime: '',
      purpose: '',
      expected_guests: '',
      nome_responsavel: user?.email || '',
      unidade_responsavel: 'Apto 101',
      necessita_limpeza: false,
      necessita_mobiliario: false,
      especificar_mobiliario: '',
      concorda_regras: false,
      notes: '',
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const getTitle = () => {
    switch (tipoArea) {
      case 'salao': return 'Reserva do Salão de Festas';
      case 'churrasqueira': return 'Reserva da Churrasqueira';
      case 'gourmet': return 'Reserva do Espaço Gourmet';
      case 'quadra': return 'Reserva da Quadra Poliesportiva';
      default: return 'Nova Reserva';
    }
  };

  const getIcon = () => {
    switch (tipoArea) {
      case 'salao': return <Calendar className="h-5 w-5" />;
      case 'churrasqueira': return <Flame className="h-5 w-5" />;
      case 'gourmet': return <UtensilsCrossed className="h-5 w-5" />;
      case 'quadra': return <Calendar className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getRegulamText = () => {
    switch (tipoArea) {
      case 'salao': return 'Li e concordo com o regulamento do Salão de Festas do condomínio.';
      case 'churrasqueira': return 'Li e concordo com o regulamento da Churrasqueira do condomínio.';
      case 'gourmet': return 'Li e concordo com o regulamento do Espaço Gourmet do condomínio.';
      case 'quadra': return 'Li e concordo com o regulamento da Quadra Poliesportiva do condomínio.';
      default: return 'Li e concordo com o regulamento da área comum.';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          {getTitle()}
        </CardTitle>
        <CardDescription>
          Preencha os dados para realizar a reserva
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data e Horário */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Data e Horário</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start_datetime">Data da Reserva *</Label>
                <Input
                  id="start_datetime"
                  name="start_datetime"
                  type="date"
                  value={formData.start_datetime.split('T')[0]}
                  onChange={(e) => {
                    const time = formData.start_datetime.split('T')[1] || '00:00';
                    setFormData(prev => ({ ...prev, start_datetime: `${e.target.value}T${time}` }));
                  }}
                  required
                />
              </div>
              <div>
                <Label htmlFor="start_time">Horário Inicial *</Label>
                <Input
                  id="start_time"
                  name="start_time"
                  type="time"
                  value={formData.start_datetime.split('T')[1] || ''}
                  onChange={(e) => {
                    const date = formData.start_datetime.split('T')[0] || new Date().toISOString().split('T')[0];
                    setFormData(prev => ({ ...prev, start_datetime: `${date}T${e.target.value}` }));
                  }}
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_time">Horário Final *</Label>
                <Input
                  id="end_time"
                  name="end_time"
                  type="time"
                  value={formData.end_datetime.split('T')[1] || ''}
                  onChange={(e) => {
                    const date = formData.start_datetime.split('T')[0] || new Date().toISOString().split('T')[0];
                    setFormData(prev => ({ ...prev, end_datetime: `${date}T${e.target.value}` }));
                  }}
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações do Evento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações do Evento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purpose">Finalidade do Evento *</Label>
                <Input
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder={tipoArea === 'salao' ? 'Ex: Aniversário infantil' : tipoArea === 'churrasqueira' ? 'Ex: Churrasco com amigos' : tipoArea === 'quadra' ? 'Ex: Evento esportivo' : 'Ex: Jantar de aniversário'}
                  required
                />
              </div>
              <div>
                <Label htmlFor="expected_guests">Número de Convidados *</Label>
                <Input
                  id="expected_guests"
                  name="expected_guests"
                  type="number"
                  value={formData.expected_guests}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados do Responsável */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Responsável pela Reserva</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome_responsavel">Nome do Responsável</Label>
                <Input
                  id="nome_responsavel"
                  name="nome_responsavel"
                  value={formData.nome_responsavel}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="unidade_responsavel">Unidade do Responsável</Label>
                <Input
                  id="unidade_responsavel"
                  name="unidade_responsavel"
                  value={formData.unidade_responsavel}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </div>

          {/* Opções Específicas do Salão */}
          {tipoArea === 'salao' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Serviços Adicionais</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="necessita_limpeza"
                    checked={formData.necessita_limpeza}
                    onCheckedChange={(checked) => handleCheckboxChange('necessita_limpeza', checked as boolean)}
                  />
                  <Label htmlFor="necessita_limpeza">Necessita Limpeza Pós-Evento</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="necessita_mobiliario"
                    checked={formData.necessita_mobiliario}
                    onCheckedChange={(checked) => handleCheckboxChange('necessita_mobiliario', checked as boolean)}
                  />
                  <Label htmlFor="necessita_mobiliario">Necessita Mobiliário Extra (Mesas/Cadeiras)</Label>
                </div>
                {formData.necessita_mobiliario && (
                  <div>
                    <Label htmlFor="especificar_mobiliario">Especificar Mobiliário Extra</Label>
                    <Textarea
                      id="especificar_mobiliario"
                      name="especificar_mobiliario"
                      value={formData.especificar_mobiliario}
                      onChange={handleChange}
                      maxLength={200}
                      rows={2}
                      placeholder="Especifique quantidade e tipo de móveis necessários..."
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Observações */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Observações</h3>
            <div>
              <Label htmlFor="notes">Observações Adicionais</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                maxLength={300}
                rows={3}
                placeholder="Informações adicionais sobre a reserva..."
              />
            </div>
          </div>

          {/* Concordância com Regras */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="concorda_regras"
                checked={formData.concorda_regras}
                onCheckedChange={(checked) => handleCheckboxChange('concorda_regras', checked as boolean)}
                required
              />
              <Label htmlFor="concorda_regras" className="text-sm leading-relaxed">
                {getRegulamText()} <a href="#" className="text-primary underline">Ver regulamento</a>
              </Label>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.concorda_regras || loading || !commonAreas.length} className="w-full">
            {isSubmitting ? 'Realizando Reserva...' : 'Confirmar Reserva'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ReservaEspecificaForm() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="salao" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="salao">Salão de Festas</TabsTrigger>
          <TabsTrigger value="churrasqueira">Churrasqueira</TabsTrigger>
          <TabsTrigger value="gourmet">Espaço Gourmet</TabsTrigger>
          <TabsTrigger value="quadra">Quadra Poliesportiva</TabsTrigger>
        </TabsList>
        <TabsContent value="salao">
          <ReservaForm tipoArea="salao" />
        </TabsContent>
        <TabsContent value="churrasqueira">
          <ReservaForm tipoArea="churrasqueira" />
        </TabsContent>
        <TabsContent value="gourmet">
          <ReservaForm tipoArea="gourmet" />
        </TabsContent>
        <TabsContent value="quadra">
          <ReservaForm tipoArea="quadra" />
        </TabsContent>
      </Tabs>
    </div>
  );
}