import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Save, X, AlertTriangle } from 'lucide-react';

interface MaintenanceFormProps {
  type: 'preventive' | 'corrective';
  onClose: () => void;
  onSave: (maintenance: any) => void;
}

export function MaintenanceForm({ type, onClose, onSave }: MaintenanceFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    asset: '',
    description: '',
    priority: type === 'corrective' ? 'medium' : 'low',
    responsible: '',
    scheduledDate: '',
    estimatedCost: '',
    category: '',
    notes: ''
  });

  const assets = [
    'Elevador Social - Torre A',
    'Bomba D\'água Principal',
    'Portão Automático Principal',
    'Sistema CFTV - Bloco A',
    'Quadra Poliesportiva',
    'Iluminação Garagem - Bloco B'
  ];

  const suppliers = [
    'ElevaCorp Ltda',
    'HidroTech Serviços',
    'SecureTech Ltda',
    'ElétricaTech',
    'AutoPortões Express'
  ];

  const priorities = [
    { value: 'low', label: 'Baixa', color: 'text-muted-foreground' },
    { value: 'medium', label: 'Média', color: 'text-primary' },
    { value: 'high', label: 'Alta', color: 'text-warning' },
    { value: 'urgent', label: 'Urgente', color: 'text-destructive' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, type });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          {type === 'corrective' ? (
            <AlertTriangle className="h-5 w-5 text-warning" />
          ) : (
            <Wrench className="h-5 w-5 text-primary" />
          )}
          {type === 'corrective' ? 'Novo Chamado' : 'Nova Manutenção Preventiva'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder={type === 'corrective' ? 'Descreva o problema' : 'Nome da manutenção'}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="asset">Ativo</Label>
              <Select value={formData.asset} onValueChange={(value) => handleChange('asset', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ativo" />
                </SelectTrigger>
                <SelectContent>
                  {assets.map((asset) => (
                    <SelectItem key={asset} value={asset}>
                      {asset}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <span className={priority.color}>{priority.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder={type === 'corrective' ? 'Detalhe o problema encontrado...' : 'Atividades a serem realizadas...'}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável</Label>
              <Select value={formData.responsible} onValueChange={(value) => handleChange('responsible', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">
                {type === 'corrective' ? 'Prazo Desejado' : 'Data Agendada'}
              </Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleChange('scheduledDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedCost">Custo Estimado (R$)</Label>
            <Input
              id="estimatedCost"
              type="number"
              step="0.01"
              value={formData.estimatedCost}
              onChange={(e) => handleChange('estimatedCost', e.target.value)}
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Informações adicionais..."
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {type === 'corrective' ? 'Abrir Chamado' : 'Agendar Manutenção'}
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