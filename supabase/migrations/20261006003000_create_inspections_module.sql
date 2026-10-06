-- Migration: 20261006003000_create_inspections_module.sql
-- Description: Módulo de Vistoria - Tabelas inspections, inspection_photos, bucket inspection-photos e seed de sharepoint_configs

-- 1. Adequar ou recriar tabela inspections com id uuid
DO $$
BEGIN
  -- Se inspections existe com PK em property_id, vamos transformá-la ou adicionar as novas colunas
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'inspections' AND column_name = 'property_id'
  ) THEN
    -- Adicionar coluna id se não existir
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'inspections' AND column_name = 'id'
    ) THEN
      ALTER TABLE public.inspections DROP CONSTRAINT IF EXISTS inspections_pkey CASCADE;
      ALTER TABLE public.inspections ADD COLUMN id UUID DEFAULT gen_random_uuid() PRIMARY KEY;
    END IF;

    -- Adicionar demais colunas conforme especificação do módulo
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'MOVE_IN';
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS inspector_name TEXT;
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Aberta';
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS contract_number TEXT;
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS candidate_id UUID REFERENCES public.pre_registrations(id) ON DELETE SET NULL;
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS finished_at TIMESTAMPTZ;
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS observations TEXT;
    ALTER TABLE public.inspections ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
  ELSE
    CREATE TABLE IF NOT EXISTS public.inspections (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
      candidate_id UUID REFERENCES public.pre_registrations(id) ON DELETE SET NULL,
      type TEXT NOT NULL DEFAULT 'MOVE_IN', -- MOVE_IN | MOVE_OUT
      inspector_name TEXT,
      status TEXT NOT NULL DEFAULT 'Aberta', -- Aberta | Finalizada
      contract_number TEXT,
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      finished_at TIMESTAMPTZ,
      observations TEXT,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  END IF;
END $$;

-- Enable RLS on inspections
ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_all_inspections" ON public.inspections;
CREATE POLICY "authenticated_all_inspections" ON public.inspections
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Criar tabela inspection_photos (Galeria de Trabalho)
CREATE TABLE IF NOT EXISTS public.inspection_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id UUID NOT NULL REFERENCES public.inspections(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  original_name TEXT NOT NULL,
  selected BOOLEAN NOT NULL DEFAULT true,
  annotation TEXT,
  attached BOOLEAN NOT NULL DEFAULT false,
  attached_sharepoint_path TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inspection_photos_inspection_id ON public.inspection_photos(inspection_id);
CREATE INDEX IF NOT EXISTS idx_inspection_photos_selected ON public.inspection_photos(selected);
CREATE INDEX IF NOT EXISTS idx_inspection_photos_attached ON public.inspection_photos(attached);

ALTER TABLE public.inspection_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_all_inspection_photos" ON public.inspection_photos;
CREATE POLICY "authenticated_all_inspection_photos" ON public.inspection_photos
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Criar bucket inspection-photos no Supabase Storage se não existir
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'inspection-photos',
  'inspection-photos',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg']::text[]
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de Storage para inspection-photos
DROP POLICY IF EXISTS "Allow authenticated read inspection-photos" ON storage.objects;
CREATE POLICY "Allow authenticated read inspection-photos" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'inspection-photos');

DROP POLICY IF EXISTS "Allow authenticated insert inspection-photos" ON storage.objects;
CREATE POLICY "Allow authenticated insert inspection-photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'inspection-photos');

DROP POLICY IF EXISTS "Allow authenticated update inspection-photos" ON storage.objects;
CREATE POLICY "Allow authenticated update inspection-photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'inspection-photos')
  WITH CHECK (bucket_id = 'inspection-photos');

DROP POLICY IF EXISTS "Allow authenticated delete inspection-photos" ON storage.objects;
CREATE POLICY "Allow authenticated delete inspection-photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'inspection-photos');

-- Também permitir leitura pública se necessário para tags <img>
DROP POLICY IF EXISTS "Allow public read inspection-photos" ON storage.objects;
CREATE POLICY "Allow public read inspection-photos" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'inspection-photos');

-- 4. Pré-cadastrar no sharepoint_configs as entradas para Vistoria de Entrada e Vistoria de Saída
-- Replicando o padrão de site/biblioteca/base_path das configurações existentes (locacoes / imoveis / ativos)
INSERT INTO public.sharepoint_configs (document_type, site_name, library_name, base_path)
VALUES 
  ('INSPECTION_MOVE_IN', 'locacoes', 'imoveis', 'ativos'),
  ('INSPECTION_MOVE_OUT', 'locacoes', 'imoveis', 'ativos')
ON CONFLICT (document_type) DO NOTHING;
