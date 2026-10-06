-- Migration: add retention policy and storage metrics for inspection photos
-- 1. Add size_bytes column to inspection_photos and property_documents if not present
ALTER TABLE public.inspection_photos
  ADD COLUMN IF NOT EXISTS size_bytes BIGINT DEFAULT 0;

ALTER TABLE public.property_documents
  ADD COLUMN IF NOT EXISTS size_bytes BIGINT DEFAULT 0;

-- Retroactive population of size_bytes in inspection_photos from storage.objects if available
DO $$
BEGIN
  UPDATE public.inspection_photos p
  SET size_bytes = COALESCE(
    (SELECT (o.metadata->>'size')::bigint 
     FROM storage.objects o 
     WHERE o.bucket_id = 'inspection-photos' AND o.name = p.storage_path
     LIMIT 1),
    0
  )
  WHERE p.size_bytes IS NULL OR p.size_bytes = 0;
EXCEPTION
  WHEN OTHERS THEN
    -- If storage.objects cannot be queried due to permissions, ignore
    NULL;
END $$;

-- 2. Create inspection_settings table for Retention Policy and Storage Warning Limit
CREATE TABLE IF NOT EXISTS public.inspection_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retention_days INTEGER NOT NULL DEFAULT 180,
  storage_limit_gb NUMERIC(10, 2) NOT NULL DEFAULT 10.00,
  last_cleanup_at TIMESTAMPTZ,
  last_cleanup_summary JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT
);

-- Enable RLS
ALTER TABLE public.inspection_settings ENABLE ROW LEVEL SECURITY;

-- Idempotent policies
DROP POLICY IF EXISTS "authenticated_select_inspection_settings" ON public.inspection_settings;
CREATE POLICY "authenticated_select_inspection_settings" ON public.inspection_settings
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_all_inspection_settings" ON public.inspection_settings;
CREATE POLICY "authenticated_all_inspection_settings" ON public.inspection_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed single row if empty
INSERT INTO public.inspection_settings (id, retention_days, storage_limit_gb, updated_at)
VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  180,
  10.00,
  NOW()
)
ON CONFLICT (id) DO NOTHING;
