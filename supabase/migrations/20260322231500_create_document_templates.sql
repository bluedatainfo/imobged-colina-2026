CREATE TABLE IF NOT EXISTS public.document_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    property_type TEXT DEFAULT 'Todos',
    guarantee_type TEXT DEFAULT 'N/A',
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_all_document_templates" ON public.document_templates;
CREATE POLICY "authenticated_all_document_templates" ON public.document_templates
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.document_templates WHERE name = 'Contrato de Prestação de Serviço') THEN
        INSERT INTO public.document_templates (name, category, property_type, guarantee_type, content)
        VALUES ('Contrato de Prestação de Serviço', 'owner_onboarding', 'Todos', 'N/A', 'CLÁUSULA PRIMEIRA - DO OBJETO: Prestação de serviços de administração imobiliária...');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.document_templates WHERE name = 'Autorização para Visita') THEN
        INSERT INTO public.document_templates (name, category, property_type, guarantee_type, content)
        VALUES ('Autorização para Visita', 'owner_onboarding', 'Todos', 'N/A', 'Autorizo a imobiliária e seus corretores a realizarem visitas no imóvel...');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.document_templates WHERE name = 'Apartamento Padrão (Caução)') THEN
        INSERT INTO public.document_templates (name, category, property_type, guarantee_type, content)
        VALUES ('Apartamento Padrão (Caução)', 'tenant_contract', 'Residencial', 'Caução', 'Contrato de locação residencial com garantia em caução (3 meses)...');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.document_templates WHERE name = 'Apartamento (Seguro Fiança)') THEN
        INSERT INTO public.document_templates (name, category, property_type, guarantee_type, content)
        VALUES ('Apartamento (Seguro Fiança)', 'tenant_contract', 'Residencial', 'Seguro Fiança', 'Contrato de locação residencial com garantia em seguro fiança locatícia...');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.document_templates WHERE name = 'Comercial (Fiador)') THEN
        INSERT INTO public.document_templates (name, category, property_type, guarantee_type, content)
        VALUES ('Comercial (Fiador)', 'tenant_contract', 'Comercial', 'Fiador', 'Contrato de locação comercial com garantia fidejussória (Fiador)...');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.document_templates WHERE name = 'Residencial (Fiador)') THEN
        INSERT INTO public.document_templates (name, category, property_type, guarantee_type, content)
        VALUES ('Residencial (Fiador)', 'tenant_contract', 'Residencial', 'Fiador', 'Contrato de locação residencial padrão com fiador...');
    END IF;
END $$;
