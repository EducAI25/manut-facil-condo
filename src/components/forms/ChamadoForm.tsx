import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaintenance } from '@/hooks/useMaintenance';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const prioridades = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' }
];

const tiposChamado = [
  'Manutenção Predial',
  'Problema com Áreas Comuns',
  'Reclamação de Vizinhança',
  'Segurança',
  'Financeiro',
  'Outro'
];

const locaisOcorrido = [
  'Apartamento',
  'Área Comum',
  'Entrada/Portaria',
  'Garagem',
  'Elevador',
  'Outro'
];

export function ChamadoForm() {
  const { createRequest } = useMaintenance();
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    priority: '',
    category: '',
    local_ocorrido: '',
    unidade_ocorrido: '',
    especificar_local: '',
    description: '',
    data_ocorrido: '',
    nome_solicitante: user?.email || '',
    unidade_solicitante: 'Apto 101',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    // Validação manual dos campos obrigatórios
    if (!formData.title || !formData.priority || !formData.category || !formData.local_ocorrido || !formData.description || !formData.data_ocorrido) {
      setFormError('Preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }
    if (formData.local_ocorrido === 'Apartamento' && !formData.unidade_ocorrido) {
      setFormError('Informe a unidade do ocorrido.');
      setIsSubmitting(false);
      return;
    }
    if ((formData.local_ocorrido === 'Área Comum' || formData.local_ocorrido === 'Outro') && !formData.especificar_local) {
      setFormError('Especifique o local do ocorrido.');
      setIsSubmitting(false);
      return;
    }

    const requestData = {
      title: formData.title,
      priority: formData.priority,
      category: formData.category,
      description: formData.description,
      status: 'open',
      location: formData.local_ocorrido === 'Apartamento' ? formData.unidade_ocorrido : formData.especificar_local,
      requested_date: formData.data_ocorrido.split('T')[0],
      // Os demais campos opcionais não são enviados
    };

    const { error } = await createRequest(requestData);
    if (error) {
      setFormError(error.message || 'Erro ao abrir chamado.');
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao abrir chamado.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: 'Sucesso',
      description: 'Chamado aberto com sucesso!',
    });
    // Reset form
    setFormData({
      title: '',
      priority: '',
      category: '',
      local_ocorrido: '',
      unidade_ocorrido: '',
      especificar_local: '',
      description: '',
      data_ocorrido: '',
      nome_solicitante: user?.email || '',
      unidade_solicitante: 'Apto 101',
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Abrir Chamado
        </CardTitle>
        <CardDescription>
          Registre solicitações ou problemas no condomínio
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formError && (
          <div className="mb-4 text-red-600 text-sm font-semibold">{formError}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações do Chamado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Título do Chamado *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Resumo do problema ou solicitação"
                  required
                />
              </div>
              <div>
                <Label>Prioridade *</Label>
                <Select value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    {prioridades.map(prioridade => (
                      <SelectItem key={prioridade.value} value={prioridade.value}>
                        {prioridade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo de Chamado *</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposChamado.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Localização */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Local do Ocorrido</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Local do Ocorrido *</Label>
                <Select value={formData.local_ocorrido} onValueChange={(value) => handleSelectChange('local_ocorrido', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o local" />
                  </SelectTrigger>
                  <SelectContent>
                    {locaisOcorrido.map(local => (
                      <SelectItem key={local} value={local}>{local}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.local_ocorrido === 'Apartamento' && (
                <div>
                  <Label htmlFor="unidade_ocorrido">Unidade *</Label>
                  <Input
                    id="unidade_ocorrido"
                    name="unidade_ocorrido"
                    value={formData.unidade_ocorrido}
                    onChange={handleChange}
                    placeholder="Ex: Apto 101, Bloco A"
                    required
                  />
                </div>
              )}
              {(formData.local_ocorrido === 'Área Comum' || formData.local_ocorrido === 'Outro') && (
                <div>
                  <Label htmlFor="especificar_local">Especificar Local *</Label>
                  <Input
                    id="especificar_local"
                    name="especificar_local"
                    value={formData.especificar_local}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="Detalhe o local específico"
                    required
                  />
                </div>
              )}
              <div>
                <Label htmlFor="data_ocorrido">Data/Hora do Ocorrido *</Label>
                <Input
                  id="data_ocorrido"
                  name="data_ocorrido"
                  type="datetime-local"
                  value={formData.data_ocorrido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Descrição Detalhada</h3>
            <div>
              <Label htmlFor="description">Descrição do Problema/Solicitação *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={1000}
                rows={5}
                placeholder="Descreva detalhadamente o problema ou solicitação..."
                required
              />
              <div className="text-xs text-muted-foreground mt-1">
                {formData.description.length}/1000 caracteres
              </div>
            </div>
          </div>

          {/* Dados do Solicitante */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Solicitante</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome_solicitante">Nome do Solicitante</Label>
                <Input
                  id="nome_solicitante"
                  name="nome_solicitante"
                  value={formData.nome_solicitante}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="unidade_solicitante">Unidade do Solicitante</Label>
                <Input
                  id="unidade_solicitante"
                  name="unidade_solicitante"
                  value={formData.unidade_solicitante}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Abrindo Chamado...' : 'Abrir Chamado'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}