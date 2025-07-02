export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assets: {
        Row: {
          acquisition_date: string | null
          acquisition_value: number | null
          anexos: string[] | null
          category: string
          condition: string | null
          created_at: string
          current_value: number | null
          description: string | null
          fabricante: string | null
          id: string
          location: string | null
          maintenance_schedule: string | null
          modelo: string | null
          name: string
          numero_serie: string | null
          tipo_ativo: string | null
          updated_at: string
          user_id: string
          vida_util_anos: number | null
          warranty_expiry: string | null
        }
        Insert: {
          acquisition_date?: string | null
          acquisition_value?: number | null
          anexos?: string[] | null
          category: string
          condition?: string | null
          created_at?: string
          current_value?: number | null
          description?: string | null
          fabricante?: string | null
          id?: string
          location?: string | null
          maintenance_schedule?: string | null
          modelo?: string | null
          name: string
          numero_serie?: string | null
          tipo_ativo?: string | null
          updated_at?: string
          user_id: string
          vida_util_anos?: number | null
          warranty_expiry?: string | null
        }
        Update: {
          acquisition_date?: string | null
          acquisition_value?: number | null
          anexos?: string[] | null
          category?: string
          condition?: string | null
          created_at?: string
          current_value?: number | null
          description?: string | null
          fabricante?: string | null
          id?: string
          location?: string | null
          maintenance_schedule?: string | null
          modelo?: string | null
          name?: string
          numero_serie?: string | null
          tipo_ativo?: string | null
          updated_at?: string
          user_id?: string
          vida_util_anos?: number | null
          warranty_expiry?: string | null
        }
        Relationships: []
      }
      common_areas: {
        Row: {
          advance_booking_days: number | null
          amenities: string[] | null
          capacity: number | null
          created_at: string
          daily_rate: number | null
          description: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          max_booking_duration_hours: number | null
          name: string
          requires_approval: boolean | null
          rules: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          advance_booking_days?: number | null
          amenities?: string[] | null
          capacity?: number | null
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          max_booking_duration_hours?: number | null
          name: string
          requires_approval?: boolean | null
          rules?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          advance_booking_days?: number | null
          amenities?: string[] | null
          capacity?: number | null
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          max_booking_duration_hours?: number | null
          name?: string
          requires_approval?: boolean | null
          rules?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          created_by: string
          description: string
          id: string
          transaction_date: string
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          created_by: string
          description: string
          id?: string
          transaction_date?: string
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          transaction_date?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      maintenance_requests: {
        Row: {
          actual_cost: number | null
          anexos: string[] | null
          asset_id: string | null
          assigned_to: string | null
          category: string
          completed_date: string | null
          created_at: string
          data_ocorrido: string | null
          description: string
          especificar_local: string | null
          estimated_cost: number | null
          id: string
          local_ocorrido: string | null
          location: string | null
          nome_solicitante: string | null
          notes: string | null
          priority: string | null
          requested_date: string
          scheduled_date: string | null
          status: string | null
          title: string
          unidade_ocorrido: string | null
          unidade_solicitante: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_cost?: number | null
          anexos?: string[] | null
          asset_id?: string | null
          assigned_to?: string | null
          category: string
          completed_date?: string | null
          created_at?: string
          data_ocorrido?: string | null
          description: string
          especificar_local?: string | null
          estimated_cost?: number | null
          id?: string
          local_ocorrido?: string | null
          location?: string | null
          nome_solicitante?: string | null
          notes?: string | null
          priority?: string | null
          requested_date?: string
          scheduled_date?: string | null
          status?: string | null
          title: string
          unidade_ocorrido?: string | null
          unidade_solicitante?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_cost?: number | null
          anexos?: string[] | null
          asset_id?: string | null
          assigned_to?: string | null
          category?: string
          completed_date?: string | null
          created_at?: string
          data_ocorrido?: string | null
          description?: string
          especificar_local?: string | null
          estimated_cost?: number | null
          id?: string
          local_ocorrido?: string | null
          location?: string | null
          nome_solicitante?: string | null
          notes?: string | null
          priority?: string | null
          requested_date?: string
          scheduled_date?: string | null
          status?: string | null
          title?: string
          unidade_ocorrido?: string | null
          unidade_solicitante?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      manutencoes_preventivas: {
        Row: {
          anexos: string[] | null
          asset_id: string | null
          created_at: string
          custo_estimado: number | null
          descricao: string
          especificar_uso: string | null
          id: string
          periodicidade: string
          proxima_data_prevista: string
          responsavel_execucao: string
          status: string | null
          tipo_manutencao: string
          updated_at: string
          user_id: string
        }
        Insert: {
          anexos?: string[] | null
          asset_id?: string | null
          created_at?: string
          custo_estimado?: number | null
          descricao: string
          especificar_uso?: string | null
          id?: string
          periodicidade: string
          proxima_data_prevista: string
          responsavel_execucao: string
          status?: string | null
          tipo_manutencao: string
          updated_at?: string
          user_id: string
        }
        Update: {
          anexos?: string[] | null
          asset_id?: string | null
          created_at?: string
          custo_estimado?: number | null
          descricao?: string
          especificar_uso?: string | null
          id?: string
          periodicidade?: string
          proxima_data_prevista?: string
          responsavel_execucao?: string
          status?: string | null
          tipo_manutencao?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manutencoes_preventivas_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          is_admin: boolean | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          is_admin?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          is_admin?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          common_area_id: string
          concorda_regras: boolean | null
          created_at: string
          end_datetime: string
          especificar_mobiliario: string | null
          expected_guests: number | null
          id: string
          necessita_limpeza: boolean | null
          necessita_mobiliario: boolean | null
          nome_responsavel: string | null
          notes: string | null
          payment_status: string | null
          purpose: string | null
          special_requests: string | null
          start_datetime: string
          status: string | null
          tipo_area: string | null
          total_cost: number | null
          unidade_responsavel: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          common_area_id: string
          concorda_regras?: boolean | null
          created_at?: string
          end_datetime: string
          especificar_mobiliario?: string | null
          expected_guests?: number | null
          id?: string
          necessita_limpeza?: boolean | null
          necessita_mobiliario?: boolean | null
          nome_responsavel?: string | null
          notes?: string | null
          payment_status?: string | null
          purpose?: string | null
          special_requests?: string | null
          start_datetime: string
          status?: string | null
          tipo_area?: string | null
          total_cost?: number | null
          unidade_responsavel?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          common_area_id?: string
          concorda_regras?: boolean | null
          created_at?: string
          end_datetime?: string
          especificar_mobiliario?: string | null
          expected_guests?: number | null
          id?: string
          necessita_limpeza?: boolean | null
          necessita_mobiliario?: boolean | null
          nome_responsavel?: string | null
          notes?: string | null
          payment_status?: string | null
          purpose?: string | null
          special_requests?: string | null
          start_datetime?: string
          status?: string | null
          tipo_area?: string | null
          total_cost?: number | null
          unidade_responsavel?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_common_area_id_fkey"
            columns: ["common_area_id"]
            isOneToOne: false
            referencedRelation: "common_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          agencia: string | null
          bairro: string | null
          banco: string | null
          category: string
          celular: string | null
          cep: string | null
          cidade_endereco: string | null
          city: string | null
          cnpj: string | null
          company_name: string | null
          complemento: string | null
          conta: string | null
          cpf_cnpj: string | null
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          ie: string | null
          im: string | null
          is_active: boolean | null
          name: string
          nome_fantasia: string | null
          notes: string | null
          numero: string | null
          observacoes: string | null
          phone: string | null
          rating: number | null
          services: string[] | null
          state: string | null
          telefone_fixo: string | null
          tipo_conta: string | null
          tipo_pessoa: string | null
          updated_at: string
          user_id: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          agencia?: string | null
          bairro?: string | null
          banco?: string | null
          category: string
          celular?: string | null
          cep?: string | null
          cidade_endereco?: string | null
          city?: string | null
          cnpj?: string | null
          company_name?: string | null
          complemento?: string | null
          conta?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          ie?: string | null
          im?: string | null
          is_active?: boolean | null
          name: string
          nome_fantasia?: string | null
          notes?: string | null
          numero?: string | null
          observacoes?: string | null
          phone?: string | null
          rating?: number | null
          services?: string[] | null
          state?: string | null
          telefone_fixo?: string | null
          tipo_conta?: string | null
          tipo_pessoa?: string | null
          updated_at?: string
          user_id: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          agencia?: string | null
          bairro?: string | null
          banco?: string | null
          category?: string
          celular?: string | null
          cep?: string | null
          cidade_endereco?: string | null
          city?: string | null
          cnpj?: string | null
          company_name?: string | null
          complemento?: string | null
          conta?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          ie?: string | null
          im?: string | null
          is_active?: boolean | null
          name?: string
          nome_fantasia?: string | null
          notes?: string | null
          numero?: string | null
          observacoes?: string | null
          phone?: string | null
          rating?: number | null
          services?: string[] | null
          state?: string | null
          telefone_fixo?: string | null
          tipo_conta?: string | null
          tipo_pessoa?: string | null
          updated_at?: string
          user_id?: string
          zip_code?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
