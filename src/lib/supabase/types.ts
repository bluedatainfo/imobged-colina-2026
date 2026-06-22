// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      app_audit_logs: {
        Row: {
          action: string | null
          details: string | null
          id: string
          ip_address: string | null
          property_id: string | null
          timestamp: string | null
          user_email: string | null
          user_name: string | null
        }
        Insert: {
          action?: string | null
          details?: string | null
          id: string
          ip_address?: string | null
          property_id?: string | null
          timestamp?: string | null
          user_email?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string | null
          details?: string | null
          id?: string
          ip_address?: string | null
          property_id?: string | null
          timestamp?: string | null
          user_email?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          agency_profile: Json | null
          client_id: string | null
          default_domain: string | null
          id: string
          module_settings: Json | null
          role_settings: Json | null
          security_settings: Json | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          agency_profile?: Json | null
          client_id?: string | null
          default_domain?: string | null
          id?: string
          module_settings?: Json | null
          role_settings?: Json | null
          security_settings?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          agency_profile?: Json | null
          client_id?: string | null
          default_domain?: string | null
          id?: string
          module_settings?: Json | null
          role_settings?: Json | null
          security_settings?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      app_users: {
        Row: {
          avatar: string | null
          email: string | null
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          avatar?: string | null
          email?: string | null
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          avatar?: string | null
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      contracts: {
        Row: {
          content: string | null
          created_at: string | null
          document_name: string | null
          docusign_status: string | null
          expiration_date: string | null
          id: string
          is_critical: boolean | null
          manager_approval: boolean | null
          property_id: string | null
          review_notes: string | null
          status: string | null
          template: string | null
          tenant_name: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          document_name?: string | null
          docusign_status?: string | null
          expiration_date?: string | null
          id: string
          is_critical?: boolean | null
          manager_approval?: boolean | null
          property_id?: string | null
          review_notes?: string | null
          status?: string | null
          template?: string | null
          tenant_name?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          document_name?: string | null
          docusign_status?: string | null
          expiration_date?: string | null
          id?: string
          is_critical?: boolean | null
          manager_approval?: boolean | null
          property_id?: string | null
          review_notes?: string | null
          status?: string | null
          template?: string | null
          tenant_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      document_templates: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          guarantee_type: string | null
          id: string
          name: string
          property_type: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          guarantee_type?: string | null
          id?: string
          name: string
          property_type?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          guarantee_type?: string | null
          id?: string
          name?: string
          property_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inspections: {
        Row: {
          created_at: string | null
          furniture_notes: string | null
          general_notes: string | null
          property_id: string
          updated_at: string | null
          wall_condition: string | null
        }
        Insert: {
          created_at?: string | null
          furniture_notes?: string | null
          general_notes?: string | null
          property_id: string
          updated_at?: string | null
          wall_condition?: string | null
        }
        Update: {
          created_at?: string | null
          furniture_notes?: string | null
          general_notes?: string | null
          property_id?: string
          updated_at?: string | null
          wall_condition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'inspections_property_id_fkey'
            columns: ['property_id']
            isOneToOne: true
            referencedRelation: 'properties'
            referencedColumns: ['id']
          },
        ]
      }
      key_control: {
        Row: {
          contract_id: string | null
          created_at: string | null
          id: string
          property_address: string | null
          property_id: string | null
          status: string | null
          tenant_name: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          contract_id?: string | null
          created_at?: string | null
          id: string
          property_address?: string | null
          property_id?: string | null
          status?: string | null
          tenant_name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          contract_id?: string | null
          created_at?: string | null
          id?: string
          property_address?: string | null
          property_id?: string | null
          status?: string | null
          tenant_name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      maintenance: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          item: string | null
          notes: string | null
          photo: string | null
          property_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id: string
          item?: string | null
          notes?: string | null
          photo?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          item?: string | null
          notes?: string | null
          photo?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      owners: {
        Row: {
          code: string
          cpf: string | null
          created_at: string
          full_address: string | null
          full_name: string
          id: string
          rg: string | null
          updated_at: string
        }
        Insert: {
          code: string
          cpf?: string | null
          created_at?: string
          full_address?: string | null
          full_name: string
          id?: string
          rg?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          cpf?: string | null
          created_at?: string
          full_address?: string | null
          full_name?: string
          id?: string
          rg?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pre_registrations: {
        Row: {
          address: string | null
          category: string | null
          cnpj: string | null
          code: string
          cpf: string | null
          created_at: string
          documents_link: string | null
          email: string | null
          form_data: Json | null
          full_name: string
          id: string
          phone: string | null
          sp_list_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          category?: string | null
          cnpj?: string | null
          code: string
          cpf?: string | null
          created_at?: string
          documents_link?: string | null
          email?: string | null
          form_data?: Json | null
          full_name: string
          id?: string
          phone?: string | null
          sp_list_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          category?: string | null
          cnpj?: string | null
          code?: string
          cpf?: string | null
          created_at?: string
          documents_link?: string | null
          email?: string | null
          form_data?: Json | null
          full_name?: string
          id?: string
          phone?: string | null
          sp_list_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          created_at: string | null
          details: Json | null
          guarantor_id: string | null
          id: string
          image: string | null
          is_resubmission: boolean | null
          location_x: number | null
          location_y: number | null
          owner_id: string | null
          rent_value: number | null
          sla_start: string | null
          status: string
          tenant: string | null
          tenant_id: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          details?: Json | null
          guarantor_id?: string | null
          id: string
          image?: string | null
          is_resubmission?: boolean | null
          location_x?: number | null
          location_y?: number | null
          owner_id?: string | null
          rent_value?: number | null
          sla_start?: string | null
          status: string
          tenant?: string | null
          tenant_id?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          details?: Json | null
          guarantor_id?: string | null
          id?: string
          image?: string | null
          is_resubmission?: boolean | null
          location_x?: number | null
          location_y?: number | null
          owner_id?: string | null
          rent_value?: number | null
          sla_start?: string | null
          status?: string
          tenant?: string | null
          tenant_id?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'properties_guarantor_id_fkey'
            columns: ['guarantor_id']
            isOneToOne: false
            referencedRelation: 'pre_registrations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'properties_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'owners'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'properties_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'pre_registrations'
            referencedColumns: ['id']
          },
        ]
      }
      property_documents: {
        Row: {
          category: string
          created_at: string
          entity_code: string | null
          entity_name: string | null
          file_path: string | null
          id: string
          name: string
          property_id: string
          review_notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          entity_code?: string | null
          entity_name?: string | null
          file_path?: string | null
          id?: string
          name: string
          property_id: string
          review_notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          entity_code?: string | null
          entity_name?: string | null
          file_path?: string | null
          id?: string
          name?: string
          property_id?: string
          review_notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'property_documents_property_id_fkey'
            columns: ['property_id']
            isOneToOne: false
            referencedRelation: 'properties'
            referencedColumns: ['id']
          },
        ]
      }
      sharepoint_configs: {
        Row: {
          base_path: string
          created_at: string
          document_type: string
          id: string
          library_name: string
          site_name: string
          updated_at: string
        }
        Insert: {
          base_path: string
          created_at?: string
          document_type: string
          id?: string
          library_name: string
          site_name: string
          updated_at?: string
        }
        Update: {
          base_path?: string
          created_at?: string
          document_type?: string
          id?: string
          library_name?: string
          site_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          code: string
          cpf: string | null
          created_at: string
          full_address: string | null
          full_name: string
          id: string
          rg: string | null
          updated_at: string
        }
        Insert: {
          code: string
          cpf?: string | null
          created_at?: string
          full_address?: string | null
          full_name: string
          id?: string
          rg?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          cpf?: string | null
          created_at?: string
          full_address?: string | null
          full_name?: string
          id?: string
          rg?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_owners_unified: {
        Args: { search_term: string }
        Returns: {
          code: string
          full_name: string
          id: string
          source: string
        }[]
      }
      unaccent: { Args: { '': string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
