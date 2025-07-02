import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface Asset {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category: string;
  location?: string;
  acquisition_date?: string;
  acquisition_value?: number;
  current_value?: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  warranty_expiry?: string;
  maintenance_schedule?: string;
  created_at: string;
  updated_at: string;
}

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets((data || []) as Asset[]);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar ativos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createAsset = async (assetData: Omit<Asset, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('assets')
        .insert([{ ...assetData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setAssets(prev => [data as Asset, ...prev]);
      toast({
        title: 'Sucesso',
        description: 'Ativo cadastrado com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating asset:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar ativo',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateAsset = async (id: string, updates: Partial<Asset>) => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAssets(prev => prev.map(asset => 
        asset.id === id ? { ...asset, ...data } : asset
      ));
      toast({
        title: 'Sucesso',
        description: 'Ativo atualizado com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating asset:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar ativo',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteAsset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAssets(prev => prev.filter(asset => asset.id !== id));
      toast({
        title: 'Sucesso',
        description: 'Ativo excluído com sucesso',
      });
      return { error: null };
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir ativo',
        variant: 'destructive',
      });
      return { error };
    }
  };

  useEffect(() => {
    if (user) {
      fetchAssets();
    }
  }, [user]);

  return {
    assets,
    loading,
    createAsset,
    updateAsset,
    deleteAsset,
    refetch: fetchAssets,
  };
};