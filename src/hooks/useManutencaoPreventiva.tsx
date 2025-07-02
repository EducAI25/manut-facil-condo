import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface ManutencaoPreventiva {
  id: string;
  user_id: string;
  asset_id?: string | null;
  tipo_manutencao: string;
  descricao: string;
  periodicidade: string;
  especificar_uso?: string | null;
  proxima_data_prevista: string;
  responsavel_execucao: string;
  custo_estimado?: number | null;
  anexos?: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useManutencaoPreventiva = () => {
  const [manutencoes, setManutencoes] = useState<ManutencaoPreventiva[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchManutencoes = async () => {
    try {
      const { data, error } = await supabase
        .from('manutencoes_preventivas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setManutencoes((data || []) as ManutencaoPreventiva[]);
    } catch (error) {
      console.error('Error fetching preventive maintenances:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar manutenções preventivas',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createManutencao = async (manutencaoData: Omit<ManutencaoPreventiva, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('manutencoes_preventivas')
        .insert([{ ...manutencaoData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setManutencoes(prev => [data as ManutencaoPreventiva, ...prev]);
      toast({
        title: 'Sucesso',
        description: 'Manutenção preventiva cadastrada com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating preventive maintenance:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar manutenção preventiva',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateManutencao = async (id: string, updates: Partial<ManutencaoPreventiva>) => {
    try {
      const { data, error } = await supabase
        .from('manutencoes_preventivas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setManutencoes(prev => prev.map(manutencao => 
        manutencao.id === id ? { ...manutencao, ...data } as ManutencaoPreventiva : manutencao
      ));
      toast({
        title: 'Sucesso',
        description: 'Manutenção preventiva atualizada com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating preventive maintenance:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar manutenção preventiva',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteManutencao = async (id: string) => {
    try {
      const { error } = await supabase
        .from('manutencoes_preventivas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setManutencoes(prev => prev.filter(manutencao => manutencao.id !== id));
      toast({
        title: 'Sucesso',
        description: 'Manutenção preventiva excluída com sucesso',
      });
      return { error: null };
    } catch (error) {
      console.error('Error deleting preventive maintenance:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir manutenção preventiva',
        variant: 'destructive',
      });
      return { error };
    }
  };

  useEffect(() => {
    if (user) {
      fetchManutencoes();
    }
  }, [user]);

  return {
    manutencoes,
    loading,
    createManutencao,
    updateManutencao,
    deleteManutencao,
    refetch: fetchManutencoes,
  };
};