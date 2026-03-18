CREATE TABLE sharepoint_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type TEXT NOT NULL UNIQUE,
  site_name TEXT NOT NULL,
  library_name TEXT NOT NULL,
  base_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.sharepoint_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_sharepoint_configs" 
  ON public.sharepoint_configs 
  FOR ALL TO authenticated 
  USING (true) WITH CHECK (true);

INSERT INTO sharepoint_configs (document_type, site_name, library_name, base_path) VALUES
('active_contract', 'locacao', 'Contratos Ativos', 'Contratos'),
('closed_contract', 'locacao', 'Arquivo Morto', 'Contratos/Encerrados'),
('entry_inspection', 'locacao', 'Vistorias', 'Entrada'),
('exit_inspection', 'locacao', 'Vistorias', 'Saida'),
('owner_doc', 'captacao', 'Doc Proprietarios', 'Documentos'),
('tenant_doc', 'locacao', 'Doc Inquilinos', 'Documentos')
ON CONFLICT (document_type) DO NOTHING;
