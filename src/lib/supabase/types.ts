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
          created_at: string | null
          document_name: string | null
          docusign_status: string | null
          expiration_date: string | null
          id: string
          is_critical: boolean | null
          manager_approval: boolean | null
          property_id: string | null
          status: string | null
          template: string | null
          tenant_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          document_name?: string | null
          docusign_status?: string | null
          expiration_date?: string | null
          id: string
          is_critical?: boolean | null
          manager_approval?: boolean | null
          property_id?: string | null
          status?: string | null
          template?: string | null
          tenant_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          document_name?: string | null
          docusign_status?: string | null
          expiration_date?: string | null
          id?: string
          is_critical?: boolean | null
          manager_approval?: boolean | null
          property_id?: string | null
          status?: string | null
          template?: string | null
          tenant_name?: string | null
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
      properties: {
        Row: {
          address: string
          created_at: string | null
          id: string
          image: string | null
          location_x: number | null
          location_y: number | null
          rent_value: number | null
          sla_start: string | null
          status: string
          tenant: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          id: string
          image?: string | null
          location_x?: number | null
          location_y?: number | null
          rent_value?: number | null
          sla_start?: string | null
          status: string
          tenant?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: string
          image?: string | null
          location_x?: number | null
          location_y?: number | null
          rent_value?: number | null
          sla_start?: string | null
          status?: string
          tenant?: string | null
          title?: string
          type?: string
          updated_at?: string | null
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

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: app_audit_logs
//   id: text (not null)
//   property_id: text (nullable)
//   action: text (nullable)
//   user_name: text (nullable)
//   user_email: text (nullable)
//   timestamp: timestamp with time zone (nullable, default: now())
//   details: text (nullable)
//   ip_address: text (nullable)
// Table: app_settings
//   id: uuid (not null, default: gen_random_uuid())
//   tenant_id: text (nullable)
//   client_id: text (nullable)
//   default_domain: text (nullable)
//   agency_profile: jsonb (nullable)
//   role_settings: jsonb (nullable)
//   security_settings: jsonb (nullable)
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: app_users
//   id: text (not null)
//   name: text (nullable)
//   email: text (nullable)
//   role: text (nullable, default: 'Vistoriador'::text)
//   avatar: text (nullable)
// Table: contracts
//   id: text (not null)
//   property_id: text (nullable)
//   tenant_name: text (nullable)
//   template: text (nullable)
//   status: text (nullable)
//   document_name: text (nullable)
//   expiration_date: text (nullable)
//   docusign_status: text (nullable)
//   is_critical: boolean (nullable, default: false)
//   manager_approval: boolean (nullable, default: false)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: inspections
//   property_id: text (not null)
//   wall_condition: text (nullable)
//   furniture_notes: text (nullable)
//   general_notes: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: key_control
//   id: text (not null)
//   contract_id: text (nullable)
//   property_id: text (nullable)
//   tenant_name: text (nullable)
//   property_address: text (nullable)
//   type: text (nullable)
//   status: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: maintenance
//   id: text (not null)
//   property_id: text (nullable)
//   address: text (nullable)
//   item: text (nullable)
//   notes: text (nullable)
//   photo: text (nullable)
//   status: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: properties
//   id: text (not null)
//   title: text (not null)
//   address: text (not null)
//   type: text (not null)
//   status: text (not null)
//   image: text (nullable)
//   sla_start: text (nullable)
//   tenant: text (nullable)
//   rent_value: numeric (nullable)
//   location_x: numeric (nullable)
//   location_y: numeric (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: app_audit_logs
//   PRIMARY KEY app_audit_logs_pkey: PRIMARY KEY (id)
// Table: app_settings
//   PRIMARY KEY app_settings_pkey: PRIMARY KEY (id)
// Table: app_users
//   PRIMARY KEY app_users_pkey: PRIMARY KEY (id)
// Table: contracts
//   PRIMARY KEY contracts_pkey: PRIMARY KEY (id)
// Table: inspections
//   PRIMARY KEY inspections_pkey: PRIMARY KEY (property_id)
//   FOREIGN KEY inspections_property_id_fkey: FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
// Table: key_control
//   PRIMARY KEY key_control_pkey: PRIMARY KEY (id)
// Table: maintenance
//   PRIMARY KEY maintenance_pkey: PRIMARY KEY (id)
// Table: properties
//   PRIMARY KEY properties_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: app_audit_logs
//   Policy "authenticated_all_app_audit_logs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: app_settings
//   Policy "anon_select_app_settings" (SELECT, PERMISSIVE) roles={anon}
//     USING: true
//   Policy "authenticated_all_app_settings" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: app_users
//   Policy "authenticated_all_app_users" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: contracts
//   Policy "authenticated_all_contracts" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: inspections
//   Policy "authenticated_all_inspections" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: key_control
//   Policy "authenticated_all_key_control" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: maintenance
//   Policy "authenticated_all_maintenance" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: properties
//   Policy "authenticated_all_properties" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
