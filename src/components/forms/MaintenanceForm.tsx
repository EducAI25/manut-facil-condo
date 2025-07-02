import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaintenance, type MaintenanceRequest } from '@/hooks/useMaintenance';
import { useAssets } from '@/hooks/useAssets';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Wrench } from 'lucide-react';

interface MaintenanceFormProps {
  editingRequest?: MaintenanceRequest | null;
  onClose?: () => void;
}

export function MaintenanceForm({ editingRequest, onClose }: MaintenanceFormProps = {}) {
  const { requests, loading, createRequest, updateRequest, deleteRequest } = useMaintenance();
  const { assets } = useAssets();
  const [formData, setFormData] = useState({
    title: editingRequest?.title || '',
    description: editingRequest?.description || '',
    priority: editingRequest?.priority || 'medium',
    status: editingRequest?.status || 'open',
    category: editingRequest?.category || '',
    location: editingRequest?.location || '',
    asset_id: editingRequest?.asset_id || '',
    requested_date: editingRequest?.requested_date || new Date().toISOString().split('T')[0],
    scheduled_date: editingRequest?.scheduled_date || '',
    assigned_to: editingRequest?.assigned_to || '',
    estimated_cost: editingRequest?.estimated_cost?.toString() || '',
    actual_cost: editingRequest?.actual_cost?.toString() || '',
    notes: editingRequest?.notes || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requestData = {
      ...formData,
      estimated_cost: formData.estimated_cost ? parseFloat(formData.estimated_cost) : undefined,
      actual_cost: formData.actual_cost ? parseFloat(formData.actual_cost) : undefined,
      asset_id: formData.asset_id || undefined,
    };

    if (editingRequest) {
      await updateRequest(editingRequest.id, requestData);
    } else {
      await createRequest(requestData);
    }

    if (!editingRequest) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'open',
        category: '',
        location: '',
        asset_id: '',
        requested_date: new Date().toISOString().split('T')[0],
        scheduled_date: '',
        assigned_to: '',
        estimated_cost: '',
        actual_cost: '',
        notes: '',
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

  const handleEdit = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este chamado?')) {
      await deleteRequest(id);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'secondary',
      medium: 'outline',
      high: 'default',
      urgent: 'destructive'
    } as const;
    
    const labels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      urgent: 'Urgente'
    };

    return (
      <Badge variant={variants[priority as keyof typeof variants] || 'secondary'}>
        {labels[priority as keyof typeof labels] || priority}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'destructive',
      in_progress: 'default',
      completed: 'secondary',
      cancelled: 'outline'
    } as const;
    
    const labels = {
      open: 'Aberto',
      in_progress: 'Em Andamento',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  if (editingRequest || selectedRequest) {
    const currentRequest = editingRequest || selectedRequest;
    return (
      <Dialog open={true} onOpenChange={() => {
        setSelectedRequest(null);
        if (onClose) onClose();
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingRequest ? 'Editar Chamado' : 'Novo Chamado'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Chamado</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Reparo no ar condicionado do salão"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Aberto</SelectItem>
                    <SelectItem value="in_progress">Em Andamento</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
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
                  placeholder="Ex: Elétrica, Hidráulica"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="asset_id">Ativo Relacionado</Label>
                <Select value={formData.asset_id} onValueChange={(value) => handleSelectChange('asset_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um ativo (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhum ativo selecionado</SelectItem>
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name} - {asset.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição do Problema</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva detalhadamente o problema encontrado"
                rows={4}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : (editingRequest ? 'Atualizar' : 'Abrir Chamado')}
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                setSelectedRequest(null);
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
              <CardTitle>Chamados de Manutenção</CardTitle>
              <CardDescription>
                Gerencie todas as solicitações de manutenção
              </CardDescription>
            </div>
            <Button onClick={() => setSelectedRequest({} as MaintenanceRequest)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Chamado
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Carregando chamados...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum chamado de manutenção</p>
              <Button 
                onClick={() => setSelectedRequest({} as MaintenanceRequest)} 
                variant="outline" 
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Abrir Primeiro Chamado
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.category}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {new Date(request.requested_date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(request)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(request.id)}
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