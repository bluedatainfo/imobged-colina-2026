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
      properties: {
        Row: {
          address: string
          created_at: string | null
          id: string
          image: string | null
          location_x: number | null
          location_y: number | null
          owner_id: string | null
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
          owner_id?: string | null
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
          owner_id?: string | null
          rent_value?: number | null
          sla_start?: string | null
          status?: string
          tenant?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'properties_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'owners'
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
// Table: document_templates
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   category: text (not null)
//   property_type: text (nullable, default: 'Todos'::text)
//   guarantee_type: text (nullable, default: 'N/A'::text)
//   content: text (nullable)
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
// Table: owners
//   id: uuid (not null, default: gen_random_uuid())
//   code: text (not null)
//   full_name: text (not null)
//   cpf: text (nullable)
//   rg: text (nullable)
//   full_address: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
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
//   owner_id: uuid (nullable)
// Table: property_documents
//   id: uuid (not null, default: gen_random_uuid())
//   property_id: text (not null)
//   name: text (not null)
//   category: text (not null)
//   entity_code: text (nullable)
//   entity_name: text (nullable)
//   file_path: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: sharepoint_configs
//   id: uuid (not null, default: gen_random_uuid())
//   document_type: text (not null)
//   site_name: text (not null)
//   library_name: text (not null)
//   base_path: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: tenants
//   id: uuid (not null, default: gen_random_uuid())
//   code: text (not null)
//   full_name: text (not null)
//   cpf: text (nullable)
//   rg: text (nullable)
//   full_address: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: app_audit_logs
//   PRIMARY KEY app_audit_logs_pkey: PRIMARY KEY (id)
// Table: app_settings
//   PRIMARY KEY app_settings_pkey: PRIMARY KEY (id)
// Table: app_users
//   PRIMARY KEY app_users_pkey: PRIMARY KEY (id)
// Table: contracts
//   PRIMARY KEY contracts_pkey: PRIMARY KEY (id)
// Table: document_templates
//   PRIMARY KEY document_templates_pkey: PRIMARY KEY (id)
// Table: inspections
//   PRIMARY KEY inspections_pkey: PRIMARY KEY (property_id)
//   FOREIGN KEY inspections_property_id_fkey: FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
// Table: key_control
//   PRIMARY KEY key_control_pkey: PRIMARY KEY (id)
// Table: maintenance
//   PRIMARY KEY maintenance_pkey: PRIMARY KEY (id)
// Table: owners
//   UNIQUE owners_code_key: UNIQUE (code)
//   PRIMARY KEY owners_pkey: PRIMARY KEY (id)
// Table: properties
//   FOREIGN KEY properties_owner_id_fkey: FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE SET NULL
//   PRIMARY KEY properties_pkey: PRIMARY KEY (id)
// Table: property_documents
//   PRIMARY KEY property_documents_pkey: PRIMARY KEY (id)
//   FOREIGN KEY property_documents_property_id_fkey: FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
// Table: sharepoint_configs
//   UNIQUE sharepoint_configs_document_type_key: UNIQUE (document_type)
//   PRIMARY KEY sharepoint_configs_pkey: PRIMARY KEY (id)
// Table: tenants
//   UNIQUE tenants_code_key: UNIQUE (code)
//   PRIMARY KEY tenants_pkey: PRIMARY KEY (id)

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
// Table: document_templates
//   Policy "authenticated_all_document_templates" (ALL, PERMISSIVE) roles={authenticated}
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
// Table: owners
//   Policy "authenticated_all_owners" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: properties
//   Policy "authenticated_all_properties" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: property_documents
//   Policy "authenticated_all_property_documents" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: sharepoint_configs
//   Policy "authenticated_all_sharepoint_configs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: tenants
//   Policy "authenticated_all_tenants" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- INDEXES ---
// Table: owners
//   CREATE UNIQUE INDEX owners_code_key ON public.owners USING btree (code)
// Table: sharepoint_configs
//   CREATE UNIQUE INDEX sharepoint_configs_document_type_key ON public.sharepoint_configs USING btree (document_type)
// Table: tenants
//   CREATE UNIQUE INDEX tenants_code_key ON public.tenants USING btree (code)
