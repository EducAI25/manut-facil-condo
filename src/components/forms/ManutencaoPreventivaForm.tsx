import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useManutencaoPreventiva } from '@/hooks/useManutencaoPreventiva';
import { useAssets } from '@/hooks/useAssets';
import { useSuppliers } from '@/hooks/useSuppliers';
import { Calendar, Settings, Trash2 } from 'lucide-react';

const tiposManutencao = [
  'Elétrica',
  'Hidráulica',
  'Mecânica',
  'Civil',
  'Segurança',
  'Jardinagem',
  'Limpeza',
  'Outro'
];

const periodicidades = [
  { value: 'diaria', label: 'Diária' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'quinzenal', label: 'Quinzenal' },
  { value: 'mensal', label: 'Mensal' },
  { value: 'trimestral', label: 'Trimestral' },
  { value: 'semestral', label: 'Semestral' },
  { value: 'anual', label: 'Anual' },
  { value: 'por_uso', label: 'Por Uso' }
];

export function ManutencaoPreventivaForm() {
  const { manutencoes, loading, createManutencao, deleteManutencao } = useManutencaoPreventiva();
  const { assets } = useAssets();
  const { suppliers } = useSuppliers();
  
  const [formData, setFormData] = useState({
    asset_id: '',
    tipo_manutencao: '',
    descricao: '',
    periodicidade: '',
    especificar_uso: '',
    proxima_data_prevista: '',
    responsavel_execucao: '',
    custo_estimado: '',
    status: 'pendente',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const manutencaoData = {
      ...formData,
      custo_estimado: formData.custo_estimado ? parseFloat(formData.custo_estimado) : undefined,
    };

    await createManutencao(manutencaoData);
    
    // Reset form
    setFormData({
      asset_id: '',
      tipo_manutencao: '',
      descricao: '',
      periodicidade: '',
      especificar_uso: '',
      proxima_data_prevista: '',
      responsavel_execucao: '',
      custo_estimado: '',
      status: 'pendente',
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pendente: 'secondary',
      agendada: 'default',
      em_andamento: 'outline',
      concluida: 'default',
      cancelada: 'destructive'
    } as const;

    const labels = {
      pendente: 'Pendente',
      agendada: 'Agendada',
      em_andamento: 'Em Andamento',
      concluida: 'Concluída',
      cancelada: 'Cancelada'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Manutenções Preventivas
          </CardTitle>
          <CardDescription>
            Registre e planeje as manutenções programadas dos ativos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ativo e Tipo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Ativo Relacionado *</Label>
                  <Select value={formData.asset_id} onValueChange={(value) => handleSelectChange('asset_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ativo" />
                    </SelectTrigger>
                    <SelectContent>
                      {assets.map(asset => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.name} - {asset.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo de Manutenção *</Label>
                  <Select value={formData.tipo_manutencao} onValueChange={(value) => handleSelectChange('tipo_manutencao', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposManutencao.map(tipo => (
                        <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="descricao">Descrição da Manutenção *</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  maxLength={500}
                  rows={3}
                  placeholder="Detalhes sobre o que será feito na manutenção..."
                  required
                />
              </div>
            </div>

            {/* Periodicidade */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Periodicidade</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Periodicidade *</Label>
                  <Select value={formData.periodicidade} onValueChange={(value) => handleSelectChange('periodicidade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a periodicidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {periodicidades.map(periodicidade => (
                        <SelectItem key={periodicidade.value} value={periodicidade.value}>
                          {periodicidade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.periodicidade === 'por_uso' && (
                  <div>
                    <Label htmlFor="especificar_uso">Especificar Uso *</Label>
                    <Input
                      id="especificar_uso"
                      name="especificar_uso"
                      value={formData.especificar_uso}
                      onChange={handleChange}
                      maxLength={100}
                      placeholder="Ex: A cada 1000 horas de uso"
                      required
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="proxima_data_prevista">Próxima Data Prevista *</Label>
                  <Input
                    id="proxima_data_prevista"
                    name="proxima_data_prevista"
                    type="date"
                    value={formData.proxima_data_prevista}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Responsável e Custo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Execução</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Responsável pela Execução *</Label>
                  <Select value={formData.responsavel_execucao} onValueChange={(value) => handleSelectChange('responsavel_execucao', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(supplier => (
                        <SelectItem key={supplier.id} value={supplier.name}>
                          {supplier.name} - {supplier.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="custo_estimado">Custo Estimado (R$)</Label>
                  <Input
                    id="custo_estimado"
                    name="custo_estimado"
                    type="number"
                    step="0.01"
                    value={formData.custo_estimado}
                    onChange={handleChange}
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Salvando...' : 'Cadastrar Manutenção Preventiva'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Manutenções */}
      <Card>
        <CardHeader>
          <CardTitle>Manutenções Preventivas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Carregando manutenções...</div>
          ) : manutencoes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma manutenção preventiva cadastrada</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Periodicidade</TableHead>
                  <TableHead>Próxima Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {manutencoes.map((manutencao) => (
                  <TableRow key={manutencao.id}>
                    <TableCell>{manutencao.tipo_manutencao}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {manutencao.descricao}
                    </TableCell>
                    <TableCell>
                      {periodicidades.find(p => p.value === manutencao.periodicidade)?.label || manutencao.periodicidade}
                    </TableCell>
                    <TableCell>
                      {new Date(manutencao.proxima_data_prevista).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>{getStatusBadge(manutencao.status)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteManutencao(manutencao.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}