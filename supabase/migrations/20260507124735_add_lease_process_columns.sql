DO $$
BEGIN
  ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.pre_registrations(id) ON DELETE SET NULL;
  ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS guarantor_id UUID REFERENCES public.pre_registrations(id) ON DELETE SET NULL;
END $$;
