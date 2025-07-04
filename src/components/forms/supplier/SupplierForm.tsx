import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSuppliers, type Supplier } from '@/hooks/useSuppliers';
import { Users } from 'lucide-react';
import { formatCpfCnpj, formatPhone, formatCep, estados, bancos } from './supplier-utils';

export function SupplierForm() {
  const { createSupplier } = useSuppliers();
  const [formData, setFormData] = useState({
    name: '',
    nome_fantasia: '',
    tipo_pessoa: '',
    cpf_cnpj: '',
    ie: '',
    im: '',
    email: '',
    telefone_fixo: '',
    celular: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade_endereco: '',
    estado: '',
    banco: '',
    agencia: '',
    conta: '',
    tipo_conta: '',
    category: '',
    services: '',
    observacoes: '',
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const supplierData = { 
      ...formData, 
      services: formData.services ? formData.services.split(',').map(s => s.trim()) : []
    };
    
    await createSupplier(supplierData);
    setFormData({
      name: '',
      nome_fantasia: '',
      tipo_pessoa: '',
      cpf_cnpj: '',
      ie: '',
      im: '',
      email: '',
      telefone_fixo: '',
      celular: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade_endereco: '',
      estado: '',
      banco: '',
      agencia: '',
      conta: '',
      tipo_conta: '',
      category: '',
      services: '',
      observacoes: '',
      is_active: true,
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
          <Users className="h-5 w-5" />
          Cadastro de Fornecedores
        </CardTitle>
        <CardDescription>
          Registre informações completas sobre prestadores de serviço
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Básicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome/Razão Social *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={150}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nome_fantasia">Nome Fantasia</Label>
                <Input
                  id="nome_fantasia"
                  name="nome_fantasia"
                  value={formData.nome_fantasia}
                  onChange={handleChange}
                  maxLength={100}
                />
              </div>
              <div>
                <Label>Tipo de Pessoa *</Label>
                <Select value={formData.tipo_pessoa} onValueChange={(value) => handleSelectChange('tipo_pessoa', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pj">Pessoa Jurídica (CNPJ)</SelectItem>
                    <SelectItem value="pf">Pessoa Física (CPF)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cpf_cnpj">{formData.tipo_pessoa === 'pf' ? 'CPF' : 'CNPJ'} *</Label>
                <Input
                  id="cpf_cnpj"
                  name="cpf_cnpj"
                  value={formatCpfCnpj(formData.cpf_cnpj, formData.tipo_pessoa)}
                  onChange={(e) => setFormData(prev => ({ ...prev, cpf_cnpj: e.target.value }))}
                  required
                />
              </div>
              {formData.tipo_pessoa === 'pj' && (
                <>
                  <div>
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input
                      id="ie"
                      name="ie"
                      value={formData.ie}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="im">Inscrição Municipal</Label>
                    <Input
                      id="im"
                      name="im"
                      value={formData.im}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone_fixo">Telefone Fixo *</Label>
                <Input
                  id="telefone_fixo"
                  name="telefone_fixo"
                  value={formatPhone(formData.telefone_fixo, false)}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefone_fixo: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="celular">Telefone Celular *</Label>
                <Input
                  id="celular"
                  name="celular"
                  value={formatPhone(formData.celular, true)}
                  onChange={(e) => setFormData(prev => ({ ...prev, celular: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  name="cep"
                  value={formatCep(formData.cep)}
                  onChange={(e) => setFormData(prev => ({ ...prev, cep: e.target.value }))}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  maxLength={200}
                  required
                />
              </div>
              <div>
                <Label htmlFor="numero">Número *</Label>
                <Input
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  maxLength={20}
                  required
                />
              </div>
              <div>
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cidade_endereco">Cidade *</Label>
                <Input
                  id="cidade_endereco"
                  name="cidade_endereco"
                  value={formData.cidade_endereco}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <Label>Estado *</Label>
                <Select value={formData.estado} onValueChange={(value) => handleSelectChange('estado', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map(estado => (
                      <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Dados Bancários */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Bancários</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Banco *</Label>
                <Select value={formData.banco} onValueChange={(value) => handleSelectChange('banco', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o banco" />
                  </SelectTrigger>
                  <SelectContent>
                    {bancos.map(banco => (
                      <SelectItem key={banco} value={banco}>{banco}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agencia">Agência *</Label>
                <Input
                  id="agencia"
                  name="agencia"
                  value={formData.agencia}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="conta">Conta *</Label>
                <Input
                  id="conta"
                  name="conta"
                  value={formData.conta}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Tipo de Conta *</Label>
                <Select value={formData.tipo_conta} onValueChange={(value) => handleSelectChange('tipo_conta', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Conta Poupança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Serviços e Observações */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="services">Serviços (separados por vírgula)</Label>
                <Input
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                maxLength={500}
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Salvando...' : 'Cadastrar Fornecedor'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}