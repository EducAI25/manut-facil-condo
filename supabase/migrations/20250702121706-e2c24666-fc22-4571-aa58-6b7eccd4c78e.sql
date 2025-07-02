-- Adicionar campos para fornecedores
ALTER TABLE public.suppliers 
ADD COLUMN nome_fantasia TEXT,
ADD COLUMN tipo_pessoa TEXT CHECK (tipo_pessoa IN ('pj', 'pf')),
ADD COLUMN cpf_cnpj TEXT,
ADD COLUMN ie TEXT,
ADD COLUMN im TEXT,
ADD COLUMN telefone_fixo TEXT,
ADD COLUMN celular TEXT,
ADD COLUMN cep TEXT,
ADD COLUMN endereco TEXT,
ADD COLUMN numero TEXT,
ADD COLUMN complemento TEXT,
ADD COLUMN bairro TEXT,
ADD COLUMN cidade_endereco TEXT,
ADD COLUMN estado TEXT,
ADD COLUMN banco TEXT,
ADD COLUMN agencia TEXT,
ADD COLUMN conta TEXT,
ADD COLUMN tipo_conta TEXT CHECK (tipo_conta IN ('corrente', 'poupanca')),
ADD COLUMN observacoes TEXT;

-- Adicionar campos para chamados/manutenção
ALTER TABLE public.maintenance_requests 
ADD COLUMN anexos TEXT[],
ADD COLUMN data_ocorrido TIMESTAMP WITH TIME ZONE,
ADD COLUMN local_ocorrido TEXT,
ADD COLUMN unidade_ocorrido TEXT,
ADD COLUMN especificar_local TEXT,
ADD COLUMN nome_solicitante TEXT,
ADD COLUMN unidade_solicitante TEXT;

-- Adicionar campos para ativos
ALTER TABLE public.assets 
ADD COLUMN tipo_ativo TEXT,
ADD COLUMN numero_serie TEXT,
ADD COLUMN fabricante TEXT,
ADD COLUMN modelo TEXT,
ADD COLUMN vida_util_anos INTEGER,
ADD COLUMN anexos TEXT[];

-- Adicionar campos específicos para reservas
ALTER TABLE public.reservations 
ADD COLUMN necessita_limpeza BOOLEAN DEFAULT false,
ADD COLUMN necessita_mobiliario BOOLEAN DEFAULT false,
ADD COLUMN especificar_mobiliario TEXT,
ADD COLUMN concorda_regras BOOLEAN DEFAULT false,
ADD COLUMN tipo_area TEXT DEFAULT 'geral',
ADD COLUMN nome_responsavel TEXT,
ADD COLUMN unidade_responsavel TEXT;

-- Criar tabela para manutenções preventivas
CREATE TABLE public.manutencoes_preventivas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  asset_id UUID REFERENCES public.assets(id),
  tipo_manutencao TEXT NOT NULL,
  descricao TEXT NOT NULL,
  periodicidade TEXT NOT NULL,
  especificar_uso TEXT,
  proxima_data_prevista DATE NOT NULL,
  responsavel_execucao TEXT NOT NULL,
  custo_estimado NUMERIC,
  anexos TEXT[],
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'agendada', 'em_andamento', 'concluida', 'cancelada')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na nova tabela
ALTER TABLE public.manutencoes_preventivas ENABLE ROW LEVEL SECURITY;

-- Criar políticas para manutenções preventivas
CREATE POLICY "Users can view all preventive maintenances" 
ON public.manutencoes_preventivas 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create preventive maintenances" 
ON public.manutencoes_preventivas 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preventive maintenances" 
ON public.manutencoes_preventivas 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preventive maintenances" 
ON public.manutencoes_preventivas 
FOR DELETE 
USING (auth.uid() = user_id);

-- Criar trigger para updated_at
CREATE TRIGGER update_manutencoes_preventivas_updated_at
BEFORE UPDATE ON public.manutencoes_preventivas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();