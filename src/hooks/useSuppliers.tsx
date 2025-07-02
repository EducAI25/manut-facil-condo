import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface Supplier {
  id: string;
  user_id: string;
  name: string;
  company_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  cnpj?: string;
  category: string;
  services?: string[];
  rating?: number;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSuppliers = async () => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuppliers(data || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar fornecedores',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createSupplier = async (supplierData: Omit<Supplier, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert([{ ...supplierData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setSuppliers(prev => [data, ...prev]);
      toast({
        title: 'Sucesso',
        description: 'Fornecedor cadastrado com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating supplier:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar fornecedor',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateSupplier = async (id: string, updates: Partial<Supplier>) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSuppliers(prev => prev.map(supplier => 
        supplier.id === id ? { ...supplier, ...data } : supplier
      ));
      toast({
        title: 'Sucesso',
        description: 'Fornecedor atualizado com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating supplier:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar fornecedor',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
      toast({
        title: 'Sucesso',
        description: 'Fornecedor excluído com sucesso',
      });
      return { error: null };
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir fornecedor',
        variant: 'destructive',
      });
      return { error };
    }
  };

  useEffect(() => {
    if (user) {
      fetchSuppliers();
    }
  }, [user]);

  return {
    suppliers,
    loading,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    refetch: fetchSuppliers,
  };
};