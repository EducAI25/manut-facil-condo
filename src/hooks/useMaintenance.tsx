import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface MaintenanceRequest {
  id: string;
  user_id: string;
  asset_id?: string | null;
  title: string;
  description: string;
  priority: string; // Changed from union type to string
  status: string; // Changed from union type to string
  category: string;
  location?: string | null;
  requested_date: string;
  scheduled_date?: string | null;
  completed_date?: string | null;
  assigned_to?: string | null;
  estimated_cost?: number | null;
  actual_cost?: number | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export const useMaintenance = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests((data || []) as MaintenanceRequest[]);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar chamados',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData: Omit<MaintenanceRequest, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .insert([{ ...requestData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setRequests(prev => [data as MaintenanceRequest, ...prev]);
      toast({
        title: 'Sucesso',
        description: 'Chamado aberto com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao abrir chamado',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateRequest = async (id: string, updates: Partial<MaintenanceRequest>) => {
    try {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setRequests(prev => prev.map(request => 
        request.id === id ? { ...request, ...data } as MaintenanceRequest : request
      ));
      toast({
        title: 'Sucesso',
        description: 'Chamado atualizado com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating maintenance request:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar chamado',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('maintenance_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRequests(prev => prev.filter(request => request.id !== id));
      toast({
        title: 'Sucesso',
        description: 'Chamado excluído com sucesso',
      });
      return { error: null };
    } catch (error) {
      console.error('Error deleting maintenance request:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir chamado',
        variant: 'destructive',
      });
      return { error };
    }
  };

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  return {
    requests,
    loading,
    createRequest,
    updateRequest,
    deleteRequest,
    refetch: fetchRequests,
  };
};