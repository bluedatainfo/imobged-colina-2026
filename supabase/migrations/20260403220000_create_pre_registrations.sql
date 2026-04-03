CREATE TABLE IF NOT EXISTS public.pre_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  cpf TEXT,
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'Novo',
  documents_link TEXT,
  form_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.pre_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_all_pre_registrations" ON public.pre_registrations;
CREATE POLICY "authenticated_all_pre_registrations" ON public.pre_registrations
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION set_pre_registrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pre_registrations_updated_at ON public.pre_registrations;
CREATE TRIGGER trg_pre_registrations_updated_at
BEFORE UPDATE ON public.pre_registrations
FOR EACH ROW
EXECUTE FUNCTION set_pre_registrations_updated_at();

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.pre_registrations WHERE cpf = '123.456.789-00') THEN
    INSERT INTO public.pre_registrations (full_name, cpf, email, phone, status, documents_link, form_data)
    VALUES ('João Carlos da Silva', '123.456.789-00', 'joao.carlos@email.com', '(11) 98765-4321', 'Novo', 'https://imobiliaria.sharepoint.com/sites/documentos/joao_carlos', '{"renda_mensal": 5000, "profissao": "Engenheiro", "estado_civil": "Casado"}'::jsonb);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.pre_registrations WHERE cpf = '987.654.321-11') THEN
    INSERT INTO public.pre_registrations (full_name, cpf, email, phone, status, documents_link, form_data)
    VALUES ('Maria Oliveira Mendes', '987.654.321-11', 'maria.mendes@email.com', '(11) 91234-5678', 'Em Análise da Gerência', 'https://imobiliaria.sharepoint.com/sites/documentos/maria_oliveira', '{"renda_mensal": 8000, "profissao": "Médica", "estado_civil": "Solteira"}'::jsonb);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.pre_registrations WHERE cpf = '456.789.123-22') THEN
    INSERT INTO public.pre_registrations (full_name, cpf, email, phone, status, documents_link, form_data)
    VALUES ('Pedro Souza Santos', '456.789.123-22', 'pedro.souza@email.com', '(11) 97777-8888', 'Aprovado', 'https://imobiliaria.sharepoint.com/sites/documentos/pedro_souza', '{"renda_mensal": 4500, "profissao": "Professor", "estado_civil": "Divorciado"}'::jsonb);
  END IF;
END $$;
