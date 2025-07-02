import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface CommonArea {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  hourly_rate?: number;
  daily_rate?: number;
  amenities?: string[];
  rules?: string;
  is_active: boolean;
  requires_approval: boolean;
  advance_booking_days: number;
  max_booking_duration_hours: number;
}

export interface Reservation {
  id: string;
  user_id: string;
  common_area_id: string;
  start_datetime: string;
  end_datetime: string;
  status: string; // Changed from union type to string
  purpose?: string | null;
  expected_guests?: number | null;
  total_cost?: number | null;
  payment_status: string; // Changed from union type to string
  special_requests?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  common_areas?: CommonArea;
}

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [commonAreas, setCommonAreas] = useState<CommonArea[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCommonAreas = async () => {
    try {
      const { data, error } = await supabase
        .from('common_areas')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCommonAreas(data || []);
    } catch (error) {
      console.error('Error fetching common areas:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          common_areas (
            id, name, description, capacity, hourly_rate, daily_rate
          )
        `)
        .order('start_datetime', { ascending: false });

      if (error) throw error;
      setReservations((data || []) as Reservation[]);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar reservas',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createReservation = async (reservationData: Omit<Reservation, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'common_areas'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([{ ...reservationData, user_id: user.id }])
        .select(`
          *,
          common_areas (
            id, name, description, capacity, hourly_rate, daily_rate
          )
        `)
        .single();

      if (error) throw error;

      setReservations(prev => [data as Reservation, ...prev]);
      toast({
        title: 'Sucesso',
        description: 'Reserva criada com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao criar reserva',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateReservation = async (id: string, updates: Partial<Reservation>) => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          common_areas (
            id, name, description, capacity, hourly_rate, daily_rate
          )
        `)
        .single();

      if (error) throw error;

      setReservations(prev => prev.map(reservation => 
        reservation.id === id ? { ...reservation, ...data } as Reservation : reservation
      ));
      toast({
        title: 'Sucesso',
        description: 'Reserva atualizada com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar reserva',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteReservation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReservations(prev => prev.filter(reservation => reservation.id !== id));
      toast({
        title: 'Sucesso',
        description: 'Reserva excluída com sucesso',
      });
      return { error: null };
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir reserva',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const createCommonArea = async (areaData: Omit<CommonArea, 'id'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('common_areas')
        .insert([{ ...areaData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setCommonAreas(prev => [...prev, data]);
      toast({
        title: 'Sucesso',
        description: 'Área comum cadastrada com sucesso',
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating common area:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar área comum',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  useEffect(() => {
    if (user) {
      fetchCommonAreas();
      fetchReservations();
    }
  }, [user]);

  return {
    reservations,
    commonAreas,
    loading,
    createReservation,
    updateReservation,
    deleteReservation,
    createCommonArea,
    refetch: fetchReservations,
  };
};