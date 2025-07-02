import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSuppliers, type Supplier } from '@/hooks/useSuppliers';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Users } from 'lucide-react';

export function SupplierForm() {
  const { suppliers, loading, createSupplier, updateSupplier, deleteSupplier } = useSuppliers();
  const [formData, setFormData] = useState({
    name: '', company_name: '', email: '', phone: '', category: '', 
    services: '', rating: '', notes: '', is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supplierData = { ...formData, services: formData.services ? formData.services.split(',').map(s => s.trim()) : [], rating: formData.rating ? parseInt(formData.rating) : undefined };
    await createSupplier(supplierData);
    setFormData({ name: '', company_name: '', email: '', phone: '', category: '', services: '', rating: '', notes: '', is_active: true });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Fornecedores</CardTitle>
          <CardDescription>Gerencie todos os fornecedores do condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Nome</Label><Input name="name" value={formData.name} onChange={handleChange} required /></div>
              <div><Label>Empresa</Label><Input name="company_name" value={formData.company_name} onChange={handleChange} /></div>
              <div><Label>E-mail</Label><Input name="email" type="email" value={formData.email} onChange={handleChange} /></div>
              <div><Label>Telefone</Label><Input name="phone" value={formData.phone} onChange={handleChange} /></div>
              <div><Label>Categoria</Label><Input name="category" value={formData.category} onChange={handleChange} required /></div>
            </div>
            <div><Label>Serviços</Label><Textarea name="services" value={formData.services} onChange={handleChange} /></div>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Cadastrar'}</Button>
          </form>
          
          {loading ? <div>Carregando...</div> : (
            <Table>
              <TableHeader><TableRow><TableHead>Nome/Empresa</TableHead><TableHead>Categoria</TableHead><TableHead>Contato</TableHead><TableHead>Ações</TableHead></TableRow></TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.name} {supplier.company_name && `(${supplier.company_name})`}</TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>{supplier.phone || supplier.email}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => deleteSupplier(supplier.id)}><Trash2 className="h-4 w-4" /></Button>
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