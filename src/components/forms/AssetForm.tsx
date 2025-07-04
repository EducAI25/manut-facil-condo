import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssets, type Asset } from '@/hooks/useAssets';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';

interface AssetFormProps {
  editingAsset?: Asset | null;
  onClose?: () => void;
}

export function AssetForm({ editingAsset, onClose }: AssetFormProps = {}) {
  const { assets, loading, createAsset, updateAsset, deleteAsset } = useAssets();
  const [formData, setFormData] = useState({
    name: editingAsset?.name || '',
    description: editingAsset?.description || '',
    category: editingAsset?.category || '',
    tipo_ativo: editingAsset?.tipo_ativo || '',
    location: editingAsset?.location || '',
    numero_serie: editingAsset?.numero_serie || '',
    fabricante: editingAsset?.fabricante || '',
    modelo: editingAsset?.modelo || '',
    acquisition_date: editingAsset?.acquisition_date || '',
    acquisition_value: editingAsset?.acquisition_value?.toString() || '',
    current_value: editingAsset?.current_value?.toString() || '',
    vida_util_anos: editingAsset?.vida_util_anos?.toString() || '',
    condition: editingAsset?.condition || 'good',
    warranty_expiry: editingAsset?.warranty_expiry || '',
    maintenance_schedule: editingAsset?.maintenance_schedule || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const assetData = {
      ...formData,
      acquisition_value: formData.acquisition_value ? parseFloat(formData.acquisition_value) : undefined,
      current_value: formData.current_value ? parseFloat(formData.current_value) : undefined,
      vida_util_anos: formData.vida_util_anos ? parseInt(formData.vida_util_anos) : undefined,
    };

    if (editingAsset) {
      await updateAsset(editingAsset.id, assetData);
    } else {
      await createAsset(assetData);
    }

    if (!editingAsset) {
      setFormData({
        name: '',
        description: '',
        category: '',
        tipo_ativo: '',
        location: '',
        numero_serie: '',
        fabricante: '',
        modelo: '',
        acquisition_date: '',
        acquisition_value: '',
        current_value: '',
        vida_util_anos: '',
        condition: 'good',
        warranty_expiry: '',
        maintenance_schedule: '',
      });
    }

    setIsSubmitting(false);
    if (onClose) onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este ativo?')) {
      await deleteAsset(id);
    }
  };

  const getConditionBadge = (condition: string) => {
    const variants = {
      excellent: 'default',
      good: 'secondary',
      fair: 'outline',
      poor: 'destructive'
    } as const;
    
    const labels = {
      excellent: 'Excelente',
      good: 'Bom',
      fair: 'Regular',
      poor: 'Ruim'
    };

    return (
      <Badge variant={variants[condition as keyof typeof variants] || 'secondary'}>
        {labels[condition as keyof typeof labels] || condition}
      </Badge>
    );
  };

  if (editingAsset || selectedAsset) {
    const currentAsset = editingAsset || selectedAsset;
    return (
      <Dialog open={true} onOpenChange={() => {
        setSelectedAsset(null);
        if (onClose) onClose();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingAsset ? 'Editar Ativo' : 'Novo Ativo'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Ativo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Geladeira, Ar Condicionado"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Ativo</Label>
                <Select value={formData.tipo_ativo} onValueChange={(value) => handleSelectChange('tipo_ativo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipamento_eletrico">Equipamento Elétrico</SelectItem>
                    <SelectItem value="equipamento_hidraulico">Equipamento Hidráulico</SelectItem>
                    <SelectItem value="veiculo">Veículo</SelectItem>
                    <SelectItem value="mobiliario">Mobiliário</SelectItem>
                    <SelectItem value="estrutura">Estrutura</SelectItem>
                    <SelectItem value="seguranca">Segurança</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Ex: Eletrodomésticos, Móveis"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localização no Condomínio</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: Casa de Máquinas, Hall Social Torre B"
                  maxLength={150}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_serie">Número de Série/Identificação</Label>
                <Input
                  id="numero_serie"
                  name="numero_serie"
                  value={formData.numero_serie}
                  onChange={handleChange}
                  placeholder="Código único de identificação"
                  maxLength={50}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fabricante">Fabricante</Label>
                <Input
                  id="fabricante"
                  name="fabricante"
                  value={formData.fabricante}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condição</Label>
                <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excelente</SelectItem>
                    <SelectItem value="good">Bom</SelectItem>
                    <SelectItem value="fair">Regular</SelectItem>
                    <SelectItem value="poor">Ruim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="acquisition_date">Data de Aquisição</Label>
                <Input
                  id="acquisition_date"
                  name="acquisition_date"
                  type="date"
                  value={formData.acquisition_date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acquisition_value">Valor de Aquisição</Label>
                <Input
                  id="acquisition_value"
                  name="acquisition_value"
                  type="number"
                  step="0.01"
                  value={formData.acquisition_value}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current_value">Valor Atual</Label>
                <Input
                  id="current_value"
                  name="current_value"
                  type="number"
                  step="0.01"
                  value={formData.current_value}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vida_util_anos">Vida Útil Estimada (anos)</Label>
                <Input
                  id="vida_util_anos"
                  name="vida_util_anos"
                  type="number"
                  value={formData.vida_util_anos}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warranty_expiry">Vencimento da Garantia</Label>
                <Input
                  id="warranty_expiry"
                  name="warranty_expiry"
                  type="date"
                  value={formData.warranty_expiry}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva o ativo detalhadamente"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance_schedule">Cronograma de Manutenção</Label>
              <Textarea
                id="maintenance_schedule"
                name="maintenance_schedule"
                value={formData.maintenance_schedule}
                onChange={handleChange}
                placeholder="Ex: Manutenção preventiva a cada 6 meses"
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : (editingAsset ? 'Atualizar' : 'Cadastrar')}
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                setSelectedAsset(null);
                if (onClose) onClose();
              }}>
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg border border-border shadow-md">
      <h2 className="text-2xl font-bold mb-4">Novo Ativo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Ativo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Geladeira, Ar Condicionado"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Ativo</Label>
            <Select value={formData.tipo_ativo} onValueChange={(value) => handleSelectChange('tipo_ativo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipamento_eletrico">Equipamento Elétrico</SelectItem>
                <SelectItem value="equipamento_hidraulico">Equipamento Hidráulico</SelectItem>
                <SelectItem value="veiculo">Veículo</SelectItem>
                <SelectItem value="mobiliario">Mobiliário</SelectItem>
                <SelectItem value="estrutura">Estrutura</SelectItem>
                <SelectItem value="seguranca">Segurança</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ex: Eletrodomésticos, Móveis"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização no Condomínio</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Casa de Máquinas, Hall Social Torre B"
              maxLength={150}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numero_serie">Número de Série/Identificação</Label>
            <Input
              id="numero_serie"
              name="numero_serie"
              value={formData.numero_serie}
              onChange={handleChange}
              placeholder="Código único de identificação"
              maxLength={50}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fabricante">Fabricante</Label>
            <Input
              id="fabricante"
              name="fabricante"
              value={formData.fabricante}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo</Label>
            <Input
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition">Condição</Label>
            <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a condição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excelente</SelectItem>
                <SelectItem value="good">Bom</SelectItem>
                <SelectItem value="fair">Regular</SelectItem>
                <SelectItem value="poor">Ruim</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="acquisition_date">Data de Aquisição</Label>
            <Input
              id="acquisition_date"
              name="acquisition_date"
              type="date"
              value={formData.acquisition_date}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="acquisition_value">Valor de Aquisição</Label>
            <Input
              id="acquisition_value"
              name="acquisition_value"
              type="number"
              step="0.01"
              value={formData.acquisition_value}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_value">Valor Atual</Label>
            <Input
              id="current_value"
              name="current_value"
              type="number"
              step="0.01"
              value={formData.current_value}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vida_util_anos">Vida Útil Estimada (anos)</Label>
            <Input
              id="vida_util_anos"
              name="vida_util_anos"
              type="number"
              value={formData.vida_util_anos}
              onChange={handleChange}
              placeholder="Ex: 10"
              required
            />
            </div>
          <div className="space-y-2">
            <Label htmlFor="warranty_expiry">Vencimento da Garantia</Label>
            <Input
              id="warranty_expiry"
              name="warranty_expiry"
              type="date"
              value={formData.warranty_expiry}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descreva o ativo detalhadamente"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maintenance_schedule">Cronograma de Manutenção</Label>
          <Textarea
            id="maintenance_schedule"
            name="maintenance_schedule"
            value={formData.maintenance_schedule}
            onChange={handleChange}
            placeholder="Ex: Manutenção preventiva a cada 6 meses"
            rows={2}
          />
            </div>
                      <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Cadastrar'}
                        </Button>
          <Button type="button" variant="outline" onClick={() => {
            if (onClose) onClose();
          }}>
            Cancelar
                        </Button>
                      </div>
      </form>
    </div>
  );
}