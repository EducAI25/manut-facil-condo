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
    location: editingAsset?.location || '',
    acquisition_date: editingAsset?.acquisition_date || '',
    acquisition_value: editingAsset?.acquisition_value?.toString() || '',
    current_value: editingAsset?.current_value?.toString() || '',
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
        location: '',
        acquisition_date: '',
        acquisition_value: '',
        current_value: '',
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
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: Salão de Festas, Portaria"
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gestão de Ativos</CardTitle>
              <CardDescription>
                Gerencie todos os ativos do condomínio
              </CardDescription>
            </div>
            <Button onClick={() => setSelectedAsset({} as Asset)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Ativo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Carregando ativos...</div>
          ) : assets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum ativo cadastrado</p>
              <Button 
                onClick={() => setSelectedAsset({} as Asset)} 
                variant="outline" 
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Primeiro Ativo
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Condição</TableHead>
                  <TableHead>Valor Atual</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.location || '-'}</TableCell>
                    <TableCell>{getConditionBadge(asset.condition)}</TableCell>
                    <TableCell>
                      {asset.current_value 
                        ? `R$ ${asset.current_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(asset)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(asset.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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