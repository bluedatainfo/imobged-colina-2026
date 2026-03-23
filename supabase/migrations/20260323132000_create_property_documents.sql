-- CREATE TABLE for property documents
CREATE TABLE IF NOT EXISTS public.property_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  entity_code TEXT,
  entity_name TEXT,
  file_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.property_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_all_property_documents" ON public.property_documents;
CREATE POLICY "authenticated_all_property_documents" ON public.property_documents 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed dummy data to show in ManagerApproval if possible
DO $BODY$
DECLARE
  v_property_id TEXT;
  v_tenant_code TEXT := 'INQ000001';
  v_owner_code TEXT := 'PROP000001';
BEGIN
  -- Insert dummy owner and tenant if they don't exist
  INSERT INTO public.owners (id, code, full_name, cpf, full_address)
  VALUES (gen_random_uuid(), v_owner_code, 'Carlos Eduardo', '111.222.333-44', 'Rua das Flores, 123')
  ON CONFLICT (code) DO NOTHING;

  INSERT INTO public.tenants (id, code, full_name, cpf, full_address)
  VALUES (gen_random_uuid(), v_tenant_code, 'João Pedro', '555.666.777-88', 'Av Paulista, 1000')
  ON CONFLICT (code) DO NOTHING;

  -- Select a property in 'Análise Gerencial'
  SELECT id INTO v_property_id FROM public.properties WHERE status = 'Análise Gerencial' LIMIT 1;
  
  IF v_property_id IS NULL THEN
    -- If none, select any property and set it to 'Análise Gerencial'
    SELECT id INTO v_property_id FROM public.properties LIMIT 1;
    IF v_property_id IS NOT NULL THEN
      UPDATE public.properties SET status = 'Análise Gerencial' WHERE id = v_property_id;
    END IF;
  END IF;

  IF v_property_id IS NOT NULL THEN
    -- Seed OWNER docs
    IF NOT EXISTS (SELECT 1 FROM public.property_documents WHERE property_id = v_property_id AND category = 'OWNER_DOCUMENT') THEN
      INSERT INTO public.property_documents (property_id, name, category, entity_code, entity_name)
      VALUES 
        (v_property_id, 'RG_Proprietario.pdf', 'OWNER_DOCUMENT', v_owner_code, 'Carlos Eduardo'),
        (v_property_id, 'Matricula_Imovel.pdf', 'OWNER_DOCUMENT', v_owner_code, 'Carlos Eduardo');
    END IF;

    -- Seed TENANT docs
    IF NOT EXISTS (SELECT 1 FROM public.property_documents WHERE property_id = v_property_id AND category = 'TENANT_DOCUMENT') THEN
      INSERT INTO public.property_documents (property_id, name, category, entity_code, entity_name)
      VALUES 
        (v_property_id, 'CNH_Inquilino.pdf', 'TENANT_DOCUMENT', v_tenant_code, 'João Pedro'),
        (v_property_id, 'Comprovante_Renda.pdf', 'TENANT_DOCUMENT', v_tenant_code, 'João Pedro');
    END IF;
  END IF;
END
$BODY$;
