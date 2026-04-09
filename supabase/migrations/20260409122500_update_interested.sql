DO $$
BEGIN
  ALTER TABLE public.pre_registrations 
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'PF';
  
  ALTER TABLE public.pre_registrations 
  ADD COLUMN IF NOT EXISTS cnpj TEXT;
  
  ALTER TABLE public.pre_registrations 
  ADD COLUMN IF NOT EXISTS address TEXT;
  
  ALTER TABLE public.pre_registrations 
  ADD COLUMN IF NOT EXISTS sp_list_id TEXT;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS pre_registrations_sp_list_id_idx 
ON public.pre_registrations(sp_list_id) 
WHERE sp_list_id IS NOT NULL;
